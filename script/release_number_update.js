// eslint-disable-next-line no-undef
const YAML = require('yaml')
// eslint-disable-next-line no-undef
const fs = require('fs')

const getProjects = () => {
  const data = fs.readFileSync('src/projects.yaml', 'utf8')
  const projects = YAML.parse(data)
  return { data, projects }
}

const getReleases = async (github, owner, repo) => {
  let releases
  if (github === undefined) {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/releases`
    )
    releases = await response.json()
  } else {
    releases = await github.paginate('GET /repos/{owner}/{repo}/releases', {
      owner,
      repo
    })
  }
  return releases
}

const checkReleaseNumbers = async (github, projects) => {
  const toUpdate = []
  for (const project of projects) {
    if (
      project.url === undefined ||
      !project.url.startsWith('https://github.com/')
    ) {
      console.log(
        `${project.name}: ${
          project.url ? 'invalid url ' + project.url : 'missing url'
        } (skipped)`
      )
      continue
    }
    const repoName = project.url.replace('https://github.com/', '')
    const [owner, repo] = repoName.split('/')
    const releases = await getReleases(github, owner, repo)
    if (releases.length > 0 && releases.length !== project.release_num) {
      console.log(
        `${project.name}: release number changed from ${project.release_num} to ${releases.length}`
      )
      toUpdate.push([project.name, releases.length])
    } else {
      console.log(
        `${project.name}: release number unchanged: ${releases.length}`
      )
    }
  }
  return toUpdate
}

const findReleaseNumberLineIndex = (lines, projectName) => {
  const nameIndex = lines.findIndex((line) => line.includes(projectName))
  const descriptionIndex = lines.findIndex((line, index) => {
    return index > nameIndex && line.includes('description')
  })
  const index = descriptionIndex - 1
  return [index, lines[index].startsWith('  release_num:')]
}

const updateReleaseNumber = (data, toUpdate) => {
  const lines = data.split('\n')

  for (const update of toUpdate) {
    const [projectName, releaseNum] = update
    const [lineIndex, exist] = findReleaseNumberLineIndex(lines, projectName)
    console.log(`${projectName}: ${releaseNum}`, lineIndex, exist)
    console.log(`before: ${lines[lineIndex]}`)
    if (exist) {
      lines[lineIndex] = `  release_num: ${releaseNum}`
    } else {
      lines.splice(lineIndex + 1, 0, `  release_num: ${releaseNum}`)
    }
    console.log(`after: ${lines[lineIndex]}`)
  }

  const updatedData = lines.join('\n')
  fs.writeFileSync('src/projects.yaml', updatedData)
}

const run = async (github) => {
  const { data, projects } = getProjects()
  const toUpdate = await checkReleaseNumbers(github, projects)
  console.log(`Found ${toUpdate.length} projects to update`)
  console.log(toUpdate)
  updateReleaseNumber(data, toUpdate)
}

// eslint-disable-next-line no-undef
module.exports = async ({ github }) => run(github)
