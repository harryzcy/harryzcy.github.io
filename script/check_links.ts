import fs from 'node:fs'
import path from 'node:path'

const SITE_HOST = 'zcy.dev'

const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36'

// Directories holding anything that ends up on the site.
const SOURCE_DIRS = ['src', 'cloudflare']

// Extensions that can carry a link. Notably absent: the icons, and
// cloudflare/_headers, whose host patterns are not links.
const SOURCE_EXTENSIONS = new Set([
  '.html',
  '.vue',
  '.ts',
  '.yaml',
  '.xml',
  '.txt'
])

// Site paths that are served by a page rather than a file on disk.
const ROUTES = new Map([
  ['/', 'src/index.html'],
  ['/projects', 'src/projects.html']
])

interface Link {
  readonly url: string
  readonly file: string
}

type Status = { ok: true; status: number } | { ok: false; status: string }

const sourceFiles = (): string[] =>
  SOURCE_DIRS.flatMap((dir) =>
    fs
      .readdirSync(dir, { recursive: true, encoding: 'utf8' })
      .map((entry) => path.join(dir, entry))
      .filter(
        (file) =>
          SOURCE_EXTENSIONS.has(path.extname(file)) &&
          fs.statSync(file).isFile()
      )
  ).toSorted()

const collect = (): Link[] => {
  const links: Link[] = []
  for (const file of sourceFiles()) {
    let content = fs.readFileSync(file, 'utf8')
    // xmlns values are namespace identifiers, not links to fetch.
    content = content.replaceAll(/xmlns(:[a-zA-Z0-9-]+)?="[^"]*"/gu, '')
    // Commented-out YAML entries are not on the site.
    if (file.endsWith('.yaml')) {
      content = content.replaceAll(/^\s*#.*$/gmu, '')
    }

    for (const [match] of content.matchAll(/https?:\/\/[^\s"'<>()\][]+/gu)) {
      links.push({ url: match.replace(/[.,;:]+$/u, ''), file })
    }
    // Relative and site-root hrefs only appear in markup.
    for (const [, href] of content.matchAll(/\shref="(\.?\/[^"]*)"/gu)) {
      links.push({ url: href, file })
    }
  }
  return links
}

// Parsed, so the host is compared exactly
const asSiteUrl = (url: string): URL | undefined => {
  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    return undefined
  }
  return parsed.host === SITE_HOST ? parsed : undefined
}

const isInternal = (url: string): boolean =>
  url.startsWith('/') || url.startsWith('./') || asSiteUrl(url) !== undefined

// Map an internal link to the source file that has to exist for it to resolve.
const resolveInternal = (url: string, file: string): string => {
  const site = asSiteUrl(url)
  let pathname: string
  if (site !== undefined) {
    pathname = site.pathname
  } else if (url.startsWith('./')) {
    pathname = '/' + path.join(path.dirname(file).replace(/^src\/?/u, ''), url)
  } else {
    pathname = url
  }
  pathname = pathname.replaceAll(/\/{2,}/gu, '/')

  return ROUTES.get(pathname) ?? path.join('src', pathname)
}

const checkInternal = (links: readonly Link[]): string[] => {
  const failures: string[] = []
  for (const { url, file } of links) {
    const target = resolveInternal(url, file)
    if (fs.existsSync(target)) {
      console.log(`${url} -> ${target} ✅`)
    } else {
      console.log(`${url} -> ${target} ❌ (from ${file})`)
      failures.push(`${url} (${file}): no such file ${target}`)
    }
  }
  return failures
}

const attempt = async (url: string, method: string): Promise<Status> => {
  try {
    const response = await fetch(url, {
      method,
      redirect: 'follow',
      headers: {
        'user-agent': USER_AGENT,
        accept: '*/*'
      },
      signal: AbortSignal.timeout(20000)
    })
    return response.ok
      ? { ok: true, status: response.status }
      : { ok: false, status: String(response.status) }
  } catch (error) {
    return {
      ok: false,
      status: error instanceof Error ? error.message : String(error)
    }
  }
}

const fetchStatus = async (url: string): Promise<Status> => {
  const head = await attempt(url, 'HEAD')
  // Some hosts reject HEAD outright, so fall back to GET before failing.
  return head.ok ? head : attempt(url, 'GET')
}

const checkExternal = async (links: readonly Link[]): Promise<string[]> => {
  const sources = new Map<string, string>()
  for (const { url, file } of links) {
    sources.set(url, file)
  }

  const checkOne = async (url: string): Promise<Status> => {
    const first = await fetchStatus(url)
    // One retry, since a single timeout is usually the network, not the link.
    return first.ok ? first : fetchStatus(url)
  }

  const failures: string[] = []
  const queue = [...sources.keys()].toSorted()
  const worker = async (): Promise<void> => {
    let url: string | undefined
    while ((url = queue.shift()) !== undefined) {
      // Draining a shared queue is what bounds concurrency here, so these
      // awaits have to run one after another within each worker.
      // eslint-disable-next-line no-await-in-loop
      const result = await checkOne(url)

      if (result.ok) {
        console.log(`${url} ${result.status} ✅`)
      } else {
        console.log(`${url} ${result.status} ❌`)
        failures.push(`${url} (${sources.get(url)}): ${result.status}`)
      }
    }
  }
  await Promise.all(Array.from({ length: 8 }, worker))
  return failures
}

const run = async ({
  external = false
}: { readonly external?: boolean } = {}): Promise<void> => {
  const links = collect()
  const internalLinks = links.filter(({ url }) => isInternal(url))
  const externalLinks = links.filter(({ url }) => !isInternal(url))

  console.log(`Checking ${internalLinks.length} internal links`)
  const failures = checkInternal(internalLinks)

  if (external) {
    console.log(`\nChecking ${externalLinks.length} external links`)
    failures.push(...(await checkExternal(externalLinks)))
  } else {
    console.log(`\nSkipping ${externalLinks.length} external links`)
  }

  if (failures.length > 0) {
    console.log(`\n${failures.length} broken link(s):`)
    for (const failure of failures) {
      console.log(`  ${failure}`)
    }
    throw new Error('Link check failed')
  }
  console.log('\nLink check passed ✅')
}

if (import.meta.main) {
  await run({ external: process.argv.includes('--external') })
}

export default run
