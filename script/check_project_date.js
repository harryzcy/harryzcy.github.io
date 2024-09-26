import fs from 'fs'
import YAML from 'yaml'

const run = async (github) => {
  const projects = YAML.parse(fs.readFileSync('src/projects.yaml', 'utf8'))
  let hasError = false
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
    console.log(`${project.name}: ${repoName} ✅`)
    const [owner, repo] = repoName.split('/')
    const { data } = await github.rest.repos.get({
      owner,
      repo
    })
    const createdAt = /[0-9]{4}-[0-9]{2}-[0-9]{2}/.exec(data.created_at)[0]
    if (project.created_at !== createdAt) {
      console.log(`Project ${project.name} has incorrect created_at date`)
      console.log(`Expected: ${project.created_at}`)
      console.log(`Actual: ${createdAt}`)
      hasError = true
    }
  }
  if (hasError) {
    throw new Error('Project date check failed')
  } else {
    console.log('\nProject date check passed ✅')
  }
}

// eslint-disable-next-line no-undef
module.exports = async ({ github }) => run(github)
