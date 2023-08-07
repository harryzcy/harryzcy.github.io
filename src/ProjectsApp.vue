<template>
  <header
    class="font-mono sticky top-0 w-full z-50 bg-teal-700/80 dark:bg-neutral-900/90 backdrop-blur-sm text-white dark:text-teal-500 border-b border-transparent dark:border-neutral-700"
  >
    <nav
      class="max-w-[800px] m-auto flex justify-between items-center text-right"
    >
      <a href="/" class="px-4 py-2 md:py-4" aria-label="Go to about page">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
            clip-rule="evenodd"
          />
        </svg>
      </a>
      <div class="px-4 py-2 md:py-4 flex space-x-2">
        <a href="/" aria-label="Read the about page">
          <span class="p-2 rounded-full hover:font-extrabold">about</span>
        </a>
        <a href="/projects" aria-label="Learn more about the projects">
          <span class="p-2 rounded-full font-extrabold">projects</span>
        </a>
      </div>
    </nav>
  </header>

  <section
    class="flex items-center max-w-[800px] px-4 m-auto mt-3 md:pt-5 text-slate-900 dark:text-neutral-400"
  >
    <h1 class="flex-none text-2xl font-bold mb-3 dark:text-neutral-300">
      Projects
    </h1>

    <div class="grow mb-3">
      <div class="flex justify-end gap-4">
        <Menu as="div" class="relative inline-block text-left select-none">
          <MenuButton
            class="inline-flex items-center rounded-md border px-3 py-1 cursor-pointer dark:border-neutral-200/5 dark:bg-neutral-200/10 hover:bg-neutral-200/40 hover:dark:border-neutral-200/30 hover:dark:text-neutral-300 hover:dark:bg-neutral-200/20"
          >
            <span class="text-sm">Sort</span>
            <span class="ml-2 -mr-1 mt-0.5">
              <ChevronDownIcon class="w-4 h-4" />
            </span>
          </MenuButton>
          <transition
            enter-active-class="transition duration-50 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-25 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <MenuItems
              class="absolute right-0 mt-2 w-28 origin-top-right rounded-md border text-sm cursor-pointer bg-white dark:bg-neutral-900 dark:border-neutral-200/5 focus:outline-none"
            >
              <div
                v-for="option in sortOptions"
                class="dark:bg-neutral-200/10 hover:bg-neutral-200/40 hover:dark:text-neutral-300 hover:dark:bg-neutral-200/20 first:rounded-t-md last:rounded-b-md"
              >
                <MenuItem>
                  <span
                    class="flex items-center px-5 py-1 w-full"
                    @click="
                      () => {
                        activeSortOption = option.value
                      }
                    "
                  >
                    <span class="-ml-3 mr-1">
                      <CheckIcon
                        class="w-3 h-3"
                        :class="{
                          invisible: option.value !== activeSortOption
                        }"
                      />
                    </span>
                    <span>{{ option.label }}</span>
                  </span>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>

        <FilterMenu
          menu-text="Status"
          :selected="selectedStatuses"
          :options="allStatuses"
          @toggle="
            (status) => {
              if (selectedStatuses.includes(status)) {
                selectedStatuses.splice(selectedStatuses.indexOf(status), 1)
              } else {
                selectedStatuses.push(status)
              }
            }
          "
          @select-all="
            () => {
              selectedStatuses.splice(0, selectedStatuses.length)
            }
          "
        />

        <FilterMenu
          menu-text="Language"
          :selected="selectedLanguages"
          :options="allLanguages"
          @toggle="
            (language) => {
              if (selectedLanguages.includes(language)) {
                selectedLanguages.splice(selectedLanguages.indexOf(language), 1)
              } else {
                selectedLanguages.push(language)
              }
            }
          "
          @select-all="
            () => {
              selectedLanguages.splice(0, selectedLanguages.length)
            }
          "
        />
      </div>
    </div>
  </section>

  <section
    v-for="year in years"
    class="max-w-[800px] px-4 m-auto text-slate-900 dark:text-neutral-400 mt-4 md:mt-7"
  >
    <h2 v-if="year !== 0" class="text-2xl mb-1 md:mb-2">{{ year }}</h2>
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
          <span v-else class="text:md lg:text-lg dark:text-gray-300">
            {{ project.name }}
          </span>
          <span
            v-if="project.full_name"
            class="text:md lg:text-lg dark:text-gray-300"
          >
            ({{ project.full_name }})
          </span>
        </span>

        <span class="mb-0.5 space-x-2 select-none">
          <span
            class="text-sm rounded px-1 md:px-2"
            :class="[
              project.status === 'Ongoing'
                ? 'text-sky-700 bg-sky-100 dark:text-sky-400 dark:bg-sky-900/40'
                : 'text-green-700 bg-teal-100 dark:text-teal-500 dark:bg-teal-900/40'
            ]"
          >
            {{ project.status }}
          </span>
          <span
            class="text-sm rounded px-1 md:px-2 bg-slate-100 dark:bg-gray-800"
            :class="[
              `text-lang-${project.lang_class}-light dark:text-lang-${project.lang_class}-dark`
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

<script setup lang="ts">
import { computed, ref } from 'vue'
import { CheckIcon, ChevronDownIcon } from '@heroicons/vue/24/solid'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import FilterMenu from './components/FilterMenu.vue'
import projectJson from './projects.json'

type Project = {
  name: string
  full_name?: string
  start_year: number
  created_at: string
  status: 'Ongoing' | 'Completed'
  lang: string
  lang_class: string
  url?: string
  description: string
}

const sortByCreatedAt = (projects: Project[]) => {
  return projects.sort((a, b) => {
    return a.created_at > b.created_at ? -1 : 1
  })
}

const getYears = (projects: Project[]) => {
  return Array.from(
    new Set(projects.map((project) => project.start_year))
  ).sort((a, b) => b - a)
}

const getStatus = (projects: Project[]) => {
  return Array.from(new Set(projects.map((project) => project.status))).sort()
}

const getLanguages = (projects: Project[]) => {
  return Array.from(new Set(projects.map((project) => project.lang))).sort()
}

const getProjectsByYear = (projects: Project[]) => {
  const years = getYears(projects)
  const projectsByYear: Record<number, Project[]> = {}
  years.forEach((year) => {
    projectsByYear[year] = sortByCreatedAt(
      projects.filter((project) => project.start_year === year)
    )
  })
  return projectsByYear
}

const renderDescription = (description: string) => {
  return description
    .replace(/\[(.*?)\]\((.*?)\)/g, (_, text, url) => {
      return `<a class="underline decoration-4 underline-offset-0 decoration-teal-600/40 hover:decoration-teal-500/40 text-teal-900 hover:text-teal-600 dark:decoration-teal-300/40 hover:dark:decoration-teal-200/40 dark:text-teal-400 hover:dark:text-teal-300"
              style="text-decoration-skip-ink: none; text-decoration-skip: none;"
              href="${url}">${text}</a>`
    })
    .replace(/\*\*(.*?)\*\*/g, (_, text) => {
      return `<span class="font-bold">${text}</span>`
    })
}

const allProjects = projectJson as Project[]

const allStatuses = getStatus(allProjects)
const selectedStatuses = ref<string[]>([])

const allLanguages = getLanguages(allProjects)
const selectedLanguages = ref<string[]>([])

const sortOptions = [
  { label: 'Start Year', value: 'start_year' },
  { label: 'Name', value: 'project_name' }
]
const activeSortOption = ref(sortOptions[0].value)

// projects with the filters and sorts applied
const activeProjects = computed(() => {
  let projects = allProjects
  if (selectedStatuses.value.length > 0) {
    projects = projects.filter((project) =>
      selectedStatuses.value.includes(project.status)
    )
  }
  if (selectedLanguages.value.length > 0) {
    projects = projects.filter((project) =>
      selectedLanguages.value.includes(project.lang)
    )
  }
  return projects
})

// projects are mapped from year number to the list of projects in that year.
// e.g. { 2023: [project1, project2], 2022: [project3] }
// if the sort option is not start_year, projects only contain one key, 0,
// and the value is the list of all projects
const projects = computed(() => {
  if (activeSortOption.value === 'start_year') {
    return getProjectsByYear(activeProjects.value)
  }

  let projects = activeProjects.value
  if (activeSortOption.value === 'project_name') {
    projects = projects.sort((a, b) => a.name.localeCompare(b.name))
  }

  return { 0: projects }
})

// years are the years of the project if the sort option is start_year,
// otherwise, years only contain one element, 0
const years = computed(() => {
  if (activeSortOption.value === 'start_year') {
    return getYears(activeProjects.value)
  }
  return [0]
})
</script>
