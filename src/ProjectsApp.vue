<template>
  <header
    class="sticky top-0 w-full bg-teal-700/90 backdrop-blur-sm text-white font-mono"
  >
    <nav class="max-w-[800px] px-4 m-auto flex justify-between text-right">
      <div class="flex-none py-4 pr-4 flex items-center">
        <a href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
            />
          </svg>
        </a>
      </div>
      <div class="flex-1 py-4">
        <a class="max-w-[100px] py-4" href="/">
          <span class="p-2 rounded-full text-white hover:font-bold">about</span>
        </a>
        <a class="max-w-[100px] py-4" href="/projects">
          <span class="p-2 rounded-full text-white font-bold">projects</span>
        </a>
      </div>
    </nav>
  </header>

  <section id="projects-title" class="max-w-[800px] px-4 m-auto pt-5">
    <h1 class="text-3xl font-bold mt-5 mb-3 text-slate-900">Projects</h1>
  </section>

  <section
    v-for="year in years"
    class="max-w-[800px] px-4 m-auto text-slate-900 py-5"
  >
    <h2 class="text-2xl mb-4">{{ year }}</h2>
    <div v-for="project in projects[year]" class="mb-4">
      <div class="mb-2">
        <a
          v-if="project.url"
          class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
          :href="project.url"
        >
          <span class="text-lg">{{ project.name }}</span>
        </a>
        <span v-else class="text-lg">{{ project.name }}</span>
        <span v-if="project.full_name" class="text-lg ml-1 whitespace-nowrap"
          >({{ project.full_name }})</span
        >

        <span
          class="text-sm rounded-full ml-2 px-2"
          :class="[
            project.status === 'Ongoing'
              ? 'text-sky-700 bg-sky-100'
              : 'text-green-700 bg-teal-100',
          ]"
        >
          {{ project.status }}
        </span>
        <span
          class="text-sm rounded-full ml-2 px-2 bg-gray-100"
          :class="[`text-lang-${project.lang_class}`]"
        >
          {{ project.lang }}
        </span>
      </div>

      <p v-html="renderDescription(project.description)"></p>
    </div>
  </section>

  <footer class="w-full bg-teal-900/20 font-mono text-slate-900">
    <div class="w-full px-10 py-4 flex justify-end items-center">
      <span class="flex-initial">C Zheng</span>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import projects from './projects.json'

type Project = {
  name: string
  full_name?: string
  year: number
  status: 'Ongoing' | 'Completed'
  lang: string
  lang_class: string
  url?: string
  description: string
}

const typedProjects = projects as Project[]

const getYears = (projects: Project[]) => {
  return Array.from(new Set(projects.map((project) => project.year))).sort(
    (a, b) => b - a
  )
}

const getProjectsByYear = (projects: Project[]) => {
  const years = getYears(projects)
  const projectsByYear: Record<number, Project[]> = {}
  years.forEach((year) => {
    projectsByYear[year] = projects.filter((project) => project.year === year)
  })
  return projectsByYear
}

export default defineComponent({
  data() {
    return {
      projects: getProjectsByYear(typedProjects),
      years: getYears(typedProjects),
      renderDescription(description: string) {
        return description
          .replace(/\[(.*?)\]\((.*?)\)/g, (_, text, url) => {
            return `<a class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" href="${url}">${text}</a>`
          })
          .replace(/\*\*(.*?)\*\*/g, (_, text) => {
            return `<span class="font-bold">${text}</span>`
          })
      },
    }
  },
})
</script>
