import fs from 'node:fs'
import path from 'node:path'

const SITE_ORIGIN = 'https://zcy.dev'

// Directories holding anything that ends up on the site.
const SOURCE_DIRS = ['src', 'cloudflare']

// Extensions that can carry a link. Notably absent: the icons, and
// cloudflare/_headers, whose host patterns are not links.
const SOURCE_EXTENSIONS = ['.html', '.vue', '.ts', '.yaml', '.xml', '.txt']

// Site paths that are served by a page rather than a file on disk.
const ROUTES = new Map([
  ['/', 'src/index.html'],
  ['/projects', 'src/projects.html']
])

interface Link {
  url: string
  file: string
}

type Status = { ok: true; status: number } | { ok: false; status: string }

const sourceFiles = (): string[] =>
  SOURCE_DIRS.flatMap((dir) =>
    fs
      .readdirSync(dir, { recursive: true, encoding: 'utf8' })
      .map((entry) => path.join(dir, entry))
      .filter(
        (file) =>
          SOURCE_EXTENSIONS.includes(path.extname(file)) &&
          fs.statSync(file).isFile()
      )
  ).sort()

const collect = (): Link[] => {
  const links: Link[] = []
  for (const file of sourceFiles()) {
    let content = fs.readFileSync(file, 'utf8')
    // xmlns values are namespace identifiers, not links to fetch.
    content = content.replace(/xmlns(:[a-zA-Z0-9-]+)?="[^"]*"/g, '')
    // Commented-out YAML entries are not on the site.
    if (file.endsWith('.yaml')) {
      content = content.replace(/^\s*#.*$/gm, '')
    }

    for (const [match] of content.matchAll(/https?:\/\/[^\s"'<>()\][]+/g)) {
      links.push({ url: match.replace(/[.,;:]+$/, ''), file })
    }
    // Relative and site-root hrefs only appear in markup.
    for (const [, href] of content.matchAll(/\shref="(\.?\/[^"]*)"/g)) {
      links.push({ url: href, file })
    }
  }
  return links
}

const isInternal = (url: string): boolean =>
  url.startsWith('/') || url.startsWith('./') || url.startsWith(SITE_ORIGIN)

// Map an internal link to the source file that has to exist for it to resolve.
const resolveInternal = (url: string, file: string): string => {
  let pathname: string
  if (url.startsWith(SITE_ORIGIN)) {
    pathname = new URL(url).pathname
  } else if (url.startsWith('./')) {
    pathname = '/' + path.join(path.dirname(file).replace(/^src\/?/, ''), url)
  } else {
    pathname = url
  }
  pathname = pathname.replace(/\/{2,}/g, '/')

  return ROUTES.get(pathname) ?? path.join('src', pathname)
}

const checkInternal = (links: Link[]): string[] => {
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

const fetchStatus = async (url: string): Promise<Status> => {
  let last: Status = { ok: false, status: 'no response' }
  // Some hosts reject HEAD outright, so fall back to GET before failing.
  for (const method of ['HEAD', 'GET']) {
    try {
      const response = await fetch(url, {
        method,
        redirect: 'follow',
        headers: {
          'user-agent':
            'Mozilla/5.0 (compatible; zcy.dev-link-check/1.0; +https://zcy.dev/)',
          accept: '*/*'
        },
        signal: AbortSignal.timeout(20000)
      })
      if (response.ok) return { ok: true, status: response.status }
      last = { ok: false, status: String(response.status) }
    } catch (error) {
      last = { ok: false, status: (error as Error).message }
    }
  }
  return last
}

const checkExternal = async (links: Link[]): Promise<string[]> => {
  const sources = new Map<string, string>()
  for (const { url, file } of links) {
    sources.set(url, file)
  }

  const failures: string[] = []
  const queue = [...sources.keys()].sort()
  const worker = async (): Promise<void> => {
    let url: string | undefined
    while ((url = queue.shift()) !== undefined) {
      // One retry, since a single timeout is usually the network, not the link.
      let result = await fetchStatus(url)
      if (!result.ok) result = await fetchStatus(url)

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

const run = async ({ external = false } = {}): Promise<void> => {
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
