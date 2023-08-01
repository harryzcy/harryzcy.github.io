<template>
  <header
    class="font-mono sticky top-0 w-full bg-teal-700/80 dark:bg-neutral-900/90 backdrop-blur-sm text-white dark:text-teal-500 border-b border-transparent dark:border-neutral-700"
  >
    <nav
      class="max-w-[800px] m-auto flex justify-between items-center text-right"
    >
      <a href="/" class="px-4 py-2 md:py-4">
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
      <div class="px-4 py-2 md:py-4 flex space-x-2">
        <a href="/">
          <span class="p-2 rounded-full hover:font-extrabold">about</span>
        </a>
        <a href="/projects">
          <span class="p-2 rounded-full font-extrabold">projects</span>
        </a>
      </div>
    </nav>
  </header>

  <section class="max-w-[800px] px-4 m-auto mt-3 md:pt-5">
    <h1 class="text-2xl font-bold mb-3 text-slate-900 dark:text-neutral-400">
      Projects
    </h1>
  </section>

  <section
    v-for="year in years"
    class="max-w-[800px] px-4 m-auto text-slate-900 dark:text-neutral-400 mt-4 md:mt-7"
  >
    <h2 class="text-2xl mb-1 md:mb-2">{{ year }}</h2>
    <div v-for="project in projects[year]" class="mb-4 md:mb-6">
      <div class="mb-1 flex flex-wrap items-center align-baseline">
        <span class="mb-0.5 mr-2">
          <a
            v-if="project.url"
            class="underline decoration-4 underline-offset-0 decoration-teal-600/40 hover:decoration-teal-500/40 text-teal-900 hover:text-teal-600 dark:decoration-teal-300/40 hover:dark:decoration-teal-200/40 dark:text-teal-400 hover:dark:text-teal-300"
            style="text-decoration-skip-ink: none; text-decoration-skip: none"
            :href="project.url"
          >
            <span class="text:md lg:text-lg">{{ project.name }}</span>
          </a>
          <span v-else class="text:md lg:text-lg dark:text-gray-300">{{
            project.name
          }}</span>
          <span
            v-if="project.full_name"
            class="text:md lg:text-lg ml-1 dark:text-gray-300"
            >({{ project.full_name }})</span
          >
        </span>

        <span class="mb-0.5 space-x-2 select-none">
          <span
            class="text-sm rounded px-1 md:px-2"
            :class="[
              project.status === 'Ongoing'
                ? 'text-sky-700 bg-sky-100 dark:text-sky-400 dark:bg-sky-900/40'
                : 'text-green-700 bg-teal-100 dark:text-teal-500 dark:bg-teal-900/40',
            ]"
          >
            {{ project.status }}
          </span>
          <span
            class="text-sm rounded px-1 md:px-2 bg-slate-100 dark:bg-gray-800"
            :class="[
              `text-lang-${project.lang_class}-light dark:text-lang-${project.lang_class}-dark`,
            ]"
          >
            {{ project.lang }}
          </span>
        </span>
      </div>

      <p v-html="renderDescription(project.description)"></p>
    </div>
  </section>

  <footer
    class="w-full bg-teal-900/20 dark:bg-neutral-900 font-mono text-slate-900 dark:text-teal-500 mt-10 border-t border-transparent dark:border-neutral-700"
  >
    <div class="w-full px-10 py-2 md:py-4 flex justify-end items-center">
      <span class="flex-initial text-sm">C Zheng</span>
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
    (a, b) => b - a,
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
            return `<a 
              class="underline decoration-4 underline-offset-0 decoration-teal-600/40 hover:decoration-teal-500/40 text-teal-900 hover:text-teal-600 dark:decoration-teal-300/40 hover:dark:decoration-teal-200/40 dark:text-teal-400 hover:dark:text-teal-300"
              style="text-decoration-skip-ink: none; text-decoration-skip: none;"
              href="${url}">${text}</a>`
          })
          .replace(/\*\*(.*?)\*\*/g, (_, text) => {
            return `<span class="font-bold">${text}</span>`
          })
      },
    }
  },
})
</script>
