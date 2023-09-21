<template>
  <header
    class="sticky top-0 z-50 w-full border-b border-transparent bg-teal-700/80 font-mono text-white backdrop-blur-sm dark:border-neutral-700 dark:bg-neutral-900/90 dark:text-teal-500"
  >
    <nav
      class="m-auto flex max-w-[800px] items-center justify-between text-right"
    >
      <a href="/" class="px-4 py-2 md:py-4" aria-label="Go to about page">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
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
      <div class="flex space-x-2 px-4 py-2 md:py-4">
        <a href="/" aria-label="Read the about page">
          <span class="rounded-full p-2 hover:font-extrabold">about</span>
        </a>
        <a href="/projects" aria-label="Learn more about the projects">
          <span class="rounded-full p-2 font-extrabold">projects</span>
        </a>
      </div>
    </nav>
  </header>

  <div class="flex justify-center gap-2 text-slate-900 dark:text-neutral-400">
    <div>
      <section
        class="m-auto mt-3 flex max-w-[800px] flex-col px-4 md:flex-row md:pt-5"
      >
        <h1 class="mb-3 grow text-2xl font-bold dark:text-neutral-300">
          Projects
        </h1>

        <div class="mb-3">
          <div class="flex gap-4">
            <Menu
              v-if="!showSearchPanel"
              as="div"
              class="relative inline-block select-none text-left"
            >
              <MenuButton
                class="inline-flex cursor-pointer items-center rounded-md border px-3 py-1 hover:bg-neutral-200/40 dark:border-neutral-200/5 dark:bg-neutral-200/10 hover:dark:border-neutral-200/30 hover:dark:bg-neutral-200/20 hover:dark:text-neutral-300"
              >
                <span class="text-sm">Sort</span>
                <span class="-mr-1 ml-2 mt-0.5">
                  <ChevronDownIcon class="h-4 w-4" />
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
                  class="absolute left-0 mt-2 w-28 cursor-pointer rounded-md border bg-white text-sm focus:outline-none dark:border-neutral-200/5 dark:bg-neutral-900"
                >
                  <div
                    v-for="option in sortOptions"
                    :key="option"
                    class="first:rounded-t-md last:rounded-b-md hover:bg-neutral-200/40 dark:bg-neutral-200/10 hover:dark:bg-neutral-200/20 hover:dark:text-neutral-300"
                  >
                    <MenuItem>
                      <span
                        class="flex w-full items-center px-5 py-1"
                        @click="
                          () => {
                            activeSortOption = option
                          }
                        "
                      >
                        <span class="-ml-3 mr-1">
                          <CheckIcon
                            class="h-3 w-3"
                            :class="{
                              invisible: option !== activeSortOption
                            }"
                          />
                        </span>
                        <span>{{ option }}</span>
                      </span>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>

            <FilterMenu
              v-if="!showSearchPanel"
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
              v-if="!showSearchPanel"
              menu-text="Language"
              :selected="selectedLanguages"
              :options="allLanguages"
              @toggle="
                (language) => {
                  if (selectedLanguages.includes(language)) {
                    selectedLanguages.splice(
                      selectedLanguages.indexOf(language),
                      1
                    )
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

            <div
              class="relative inline-block hidden select-none text-left md:block"
            >
              <span
                class="inline-flex h-full cursor-pointer items-center rounded-md border px-2 py-1 hover:bg-neutral-200/40 dark:border-neutral-200/5 dark:bg-neutral-200/10 hover:dark:border-neutral-200/30 hover:dark:bg-neutral-200/20 hover:dark:text-neutral-300"
                @click="showSearchPanel = !showSearchPanel"
              >
                <span class="relative h-4 w-4">
                  <transition
                    enter-active-class="transition duration-50 ease-out"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="transition duration-50 ease-out"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                  >
                    <CubeTransparentIcon
                      v-if="showSearchPanel"
                      class="absolute top-0 h-4 w-4"
                    />
                  </transition>
                  <transition
                    enter-active-class="transition duration-50 ease-out"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="transition duration-50 ease-out"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                  >
                    <CubeIcon
                      v-if="!showSearchPanel"
                      class="absolute top-0 h-4 w-4"
                    />
                  </transition>
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section
        v-for="year in years"
        :key="year"
        class="m-auto mt-4 max-w-[800px] px-4 md:mt-7"
      >
        <h2 v-if="year !== 0" class="mb-2 text-2xl md:mb-4">{{ year }}</h2>
        <div
          v-for="project in projects[year]"
          :key="project.name"
          class="md:md-6 -mx-0.5 mb-4 rounded-lg border px-1.5 py-1 dark:border-gray-700 md:-ml-4 md:py-3 md:pl-4"
        >
          <div class="mb-1 flex flex-wrap items-center align-baseline">
            <span class="mb-0.5 mr-2">
              <a
                v-if="project.url"
                class="text-teal-900 underline decoration-teal-600/40 decoration-4 underline-offset-0 hover:text-teal-600 hover:decoration-teal-500/40 dark:text-teal-400 dark:decoration-teal-300/40 hover:dark:text-teal-300 hover:dark:decoration-teal-200/40"
                style="
                  text-decoration-skip-ink: none;
                  text-decoration-skip: none;
                "
                :href="project.url"
              >
                <span class="text:md lg:text-lg">{{ project.name }}</span>
              </a>
              <span v-else class="text:md dark:text-gray-300 lg:text-lg">
                {{ project.name }}
              </span>
              <span
                v-if="project.full_name"
                class="text:md dark:text-gray-300 lg:text-lg"
              >
                ({{ project.full_name }})
              </span>
            </span>

            <span class="mb-0.5 select-none space-x-2">
              <span
                class="cursor-pointer rounded px-1 text-sm md:px-2"
                :class="[
                  project.status === 'Ongoing'
                    ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-400'
                    : 'bg-teal-100 text-green-700 dark:bg-teal-900/40 dark:text-teal-500'
                ]"
                @click="
                  () => {
                    selectedStatuses = [project.status]
                  }
                "
                >{{ project.status }}
              </span>
              <span
                class="cursor-pointer rounded bg-slate-100 px-1 text-sm dark:bg-gray-800 md:px-2"
                :class="[
                  `text-lang-${project.lang_class}-light dark:text-lang-${project.lang_class}-dark`
                ]"
                @click="
                  () => {
                    selectedLanguages = [project.lang]
                  }
                "
                >{{ project.lang }}</span
              >
              <span
                v-if="project.release_num"
                class="rounded bg-slate-100 px-1 text-sm dark:bg-gray-800 md:px-2"
                >{{ project.release_num }} releases</span
              >
            </span>
          </div>

          <p v-html="renderDescription(project.description)"></p>
        </div>
      </section>
    </div>

    <div
      v-if="showSearchPanel"
      :class="[activeSortOption === sorts.startYear ? 'pt-36' : 'pt-24']"
    >
      <div class="mt-2 rounded-lg border p-2 dark:border-gray-700">
        <p>Advanced Query</p>

        <div class="mt-2 block">
          <FilterList
            menu-text="Sort"
            :options="sortOptions"
            v-model="activeSortOption"
          />
        </div>

        <div class="mt-2 block">
          <FilterList
            menu-text="Status"
            :options="allStatuses"
            v-model="selectedStatuses"
          />
        </div>

        <div class="mt-2 block">
          <FilterList
            menu-text="Languages"
            :options="allLanguages"
            v-model="selectedLanguages"
          />
        </div>
      </div>
    </div>
  </div>

  <footer
    class="relative mt-10 w-full border-t border-transparent bg-teal-900/20 font-mono text-slate-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-teal-500"
  >
    <div
      class="m-auto flex max-w-[800px] items-center justify-start py-2 text-right opacity-50 md:py-4"
    >
      <div class="flex px-4">
        <a href="https://github.com/harryzcy" class="h-6 w-6">
          <picture class="h-6 w-6">
            <source
              srcset="./icons/github-mark-white.svg"
              media="(prefers-color-scheme: dark)"
            />
            <img src="./icons/github-mark.svg" alt="github" />
          </picture>
        </a>
      </div>
    </div>
    <div class="absolute right-0 top-0 px-10 py-2 md:py-4">
      <span class="flex-initial text-sm">C Zheng</span>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { CubeIcon, CubeTransparentIcon } from '@heroicons/vue/24/outline'
import { CheckIcon, ChevronDownIcon } from '@heroicons/vue/24/solid'
import { computed, ref } from 'vue'

import FilterList from './components/FilterList.vue'
import FilterMenu from './components/FilterMenu.vue'
import allProjects from './projects.yaml'

const showSearchPanel = ref(false)

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

const allStatuses = getStatus(allProjects)
const selectedStatuses = ref<string[]>([])

const allLanguages = getLanguages(allProjects)
const selectedLanguages = ref<string[]>([])

const sorts = {
  startYear: 'Start Year',
  project_name: 'Name'
}

const sortOptions = [sorts.startYear, sorts.project_name]
const activeSortOption = ref(sortOptions[0])

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
  if (activeSortOption.value === sorts.startYear) {
    return getProjectsByYear(activeProjects.value)
  }

  let projects = activeProjects.value
  if (activeSortOption.value === sorts.project_name) {
    projects = projects.sort((a, b) => a.name.localeCompare(b.name))
  }

  return { 0: projects }
})

// years are the years of the project if the sort option is start_year,
// otherwise, years only contain one element, 0
const years = computed(() => {
  if (activeSortOption.value === sorts.startYear) {
    return getYears(activeProjects.value)
  }
  return [0]
})
</script>
