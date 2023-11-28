type Project = {
  name: string
  full_name?: string
  start_year: number
  created_at: string
  status: 'Ongoing' | 'Completed' | 'Deployed'
  lang: string
  lang_class: string
  url?: string
  release_num?: number
  description: string
}

declare module '*.yaml' {
  const value: Project[]
  export default value
}
