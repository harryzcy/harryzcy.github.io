import fs from 'fs'

const run = () => {
  const data = fs.readFileSync('src/projects.yaml', 'utf8')
  const lines = data.split('\n')
  const perProjectLines = []
  for (const line of lines) {
    if (line.startsWith('- name:')) {
      perProjectLines.push([])
    }
    const fieldValue = line.replace('- ', '').trim()
    if (fieldValue.startsWith('#')) continue
    perProjectLines[perProjectLines.length - 1].push(fieldValue)
  }

  const expectedOrder = [
    'name',
    'full_name',
    'url',
    'start_year',
    'created_at',
    'status',
    'lang',
    'lang_class',
    'release_num',
    'description'
  ]

  let hasError = false
  for (const lines of perProjectLines) {
    const fields = []
    for (const line of lines) {
      const [field] = line.split(':')
      if (field === 'description') {
        break
      }
      fields.push(field.trim())
    }
    const orderFiltered = expectedOrder.filter((field) =>
      fields.includes(field)
    )
    const equal = fields.every((field, index) => field === orderFiltered[index])
    if (!equal) {
      console.log(`Project ${lines[0]} has incorrect field order`)
      console.log(`Expected: ${orderFiltered.join(', ')}`)
      console.log(`Actual: ${fields.join(', ')}`)
      hasError = true
    }
  }

  if (hasError) {
    throw new Error('Project YAML check failed')
  }
}

export default run
