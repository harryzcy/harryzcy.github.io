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

  <!-- <section
    id="projects-content-2022"
    class="max-w-[800px] px-4 m-auto text-slate-900 py-5"
  >
    <h2 class="text-2xl mb-4">2022</h2>

    <div class="mb-4">
      <div class="mb-2">
        <a
          class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
          href="https://github.com/harryzcy/notion-cli"
        >
          <span class="text-lg">notion-cli</span>
        </a>
        <span class="text-sm rounded-full ml-2 px-2 text-sky-700 bg-sky-100"
          >Ongoing</span
        >
        <span class="text-sm rounded-full ml-2 px-2 text-lang-go bg-gray-100"
          >Go</span
        >
      </div>
      <p>
        notion-cli is a command line interface for Notion app. It supports
        viewing and editing pages and database in Notion.
      </p>
    </div>

    <div class="mb-4">
      <div class="mb-2">
        <span class="text-lg">GBot</span>
        <span class="text-lg ml-1">(Bot for GitHub)</span>
        <span class="text-sm rounded-full ml-2 px-2 text-sky-700 bg-sky-100"
          >Ongoing</span
        >
        <span class="text-sm rounded-full ml-2 px-2 text-lang-ts bg-gray-100"
          >TypeScript</span
        >
      </div>
      <p>
        GBot is a Node.js application that runs GitHub-triggered automation
        using GitHub webhooks. It is registered as a GitHub app authenticated
        using OAuth. It listens to various events and performs actions
        accordingly. Currently, it syncs GitHub repositories with my local
        machine whenever there's a change to the repository.
      </p>
    </div>

    <div class="mb-4">
      <div class="mb-2">
        <a
          class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
          href="https://github.com/harryzcy/nodop"
        >
          <span class="text-lg">Nodop</span>
        </a>
        <span class="text-lg ml-1">(Notion Database Operator)</span>
        <span class="text-sm rounded-full ml-2 px-2 text-sky-700 bg-sky-100"
          >Ongoing</span
        >
        <span class="text-sm rounded-full ml-2 px-2 text-lang-ts bg-gray-100"
          >TypeScript</span
        >
      </div>
      <p>
        Nodap is a workflow runner for databases in Notion app. It takes
        workflow configuration files similar to GitHub Actions and performs them
        on database pages. The application features a builtin parser that
        evaluates functional expressions in the workflow configuration. The
        Notion API is used to access the database.
      </p>
    </div>

    <div class="mb-4">
      <div class="mb-2">
        <a
          class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
          href="https://github.com/harryzcy/noti"
        >
          <span class="text-lg">Noti</span>
        </a>
        <span class="text-lg ml-1">(Notion Todo Importer)</span>
        <span class="text-sm rounded-full ml-2 px-2 text-sky-700 bg-sky-100"
          >Ongoing</span
        >
        <span class="text-sm rounded-full ml-2 px-2 text-lang-ts bg-gray-100"
          >TypeScript</span
        >
      </div>
      <p>
        Noti (<strong>No</strong>tion <strong>t</strong>odo
        <strong>i</strong>mporter) is a web application that helps to import my
        todo list to a Notion database. It exposes a REST API for other programs
        to invoke. I use to as part of my personal automation tool.
      </p>
    </div>

    <div class="mb-4">
      <div class="mb-2">
        <a
          class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
          href="https://github.com/harryzcy/gmg"
          ><span class="text-lg">GmG</span>
        </a>
        <span class="text-sm rounded-full ml-2 px-2 text-sky-700 bg-sky-100"
          >Ongoing</span
        >
        <span class="text-sm rounded-full ml-2 px-2 text-lang-go bg-gray-100"
          >Go</span
        >
      </div>
      <p>
        GmG is a CLI tool that helps to set up mirrors between GitHub and Gitea.
        I use Gitea to host my private repositories, but from time to time, I
        need to sync many private repositories to GitHub. This tool helps to
        ease the workflow.
      </p>
    </div>

    <div class="mb-4">
      <div class="mb-2">
        <a
          class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
          href="https://github.com/harryzcy/mailbox"
          ><span class="text-lg">Mailbox</span>
        </a>
        <span class="text-sm rounded-full ml-2 px-2 text-green-700 bg-teal-100"
          >Completed</span
        >
        <span class="text-sm rounded-full ml-2 px-2 text-lang-go bg-gray-100"
          >Go</span
        >
      </div>
      <p>
        Mailbox is a serverless application runs on AWS services and handles
        email sending and receiving requests using custom email addresses. I
        built a set of APIs on top of AWS services to invoke email-related
        operations. This project services as an infrastructure that provides an
        alternative to commercial email services that use on one-user-one-email
        approach. It is initiated to integrate automated workflows in my
        personal life based on certain emails receiving events.
      </p>
    </div>

    <div class="mb-4">
      <div class="mb-2">
        <span class="text-lg">miniJava compiler</span>
        <span class="text-sm rounded-full ml-2 px-2 text-green-700 bg-teal-100"
          >Completed</span
        >
        <span class="text-sm rounded-full ml-2 px-2 text-lang-java bg-gray-100"
          >Java</span
        >
      </div>
      <p>
        miniJava compiler is an course project that implements a compiler for
        miniJava, a subset of Java. The program will read an input file
        containing miniJava source code, compile it, and prepare for execution
        on Java Virtual Machine.
      </p>
    </div>

    <div class="mb-4">
      <div class="mb-2">
        <a
          class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
          href="https://github.com/harryzcy/action-bark"
          ><span class="text-lg">action-bark</span></a
        >
        <span class="text-lg ml-1">(GitHub Workflow for Bark)</span>
        <span class="text-sm rounded-full ml-2 px-2 text-green-700 bg-teal-100"
          >Completed</span
        >
        <span class="text-sm rounded-full ml-2 px-2 text-lang-ts bg-gray-100"
          >TypeScript</span
        >
      </div>
      <p>
        It is a GitHub Action workflow program and allows GitHub Actions to push
        iOS notifications via
        <a
          class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
          href="https://github.com/Finb/bark-server"
          >Bark</a
        >, a self-hosted backend service that integrates with Apple Push
        Notification service. It will send a notification to the device when a
        workflow is completed successfully, failed, or canceled, based on custom
        configurations.
      </p>
    </div>

    <div class="mb-4">
      <div class="mb-2">
        <a
          class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
          href="https://github.com/harryzcy/canvas-file-syncer"
          ><span class="text-lg">canvas-file-syncer</span></a
        >
        <span class="text-sm rounded-full ml-2 px-2 text-green-700 bg-teal-100"
          >Completed</span
        >
        <span
          class="text-sm rounded-full ml-2 px-2 text-lang-python bg-gray-100"
          >Python</span
        >
      </div>
      <p>
        The canvas-file-syncer is a command line program that helps to sync
        files between Canvas, a learning management system (LMS) used by many
        colleges, and local file system. It handles the automatic login process
        and downloads all files from courses while keeping the directory
        structure. It takes a configuration files as input and syncs data to the
        right location.
      </p>
    </div>

    <div class="mb-4">
      <div class="mb-2">
        <a
          class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
          href="https://github.com/harryzcy/sakai-file-syncer"
          ><span class="text-lg">sakai-file-syncer</span></a
        >
        <span class="text-sm rounded-full ml-2 px-2 text-green-700 bg-teal-100"
          >Completed</span
        >
        <span
          class="text-sm rounded-full ml-2 px-2 text-lang-python bg-gray-100"
          >Python</span
        >
      </div>
      <p>
        It is a command line program that helps to sync files between Sakai and
        local file system. It handles the automatic login through Single Sign-On
        and downloads all files for all courses.
      </p>
    </div>
  </section>

  <section
    id="projects-content-2021"
    class="max-w-[800px] px-4 m-auto text-slate-900 py-5"
  >
    <h2 class="text-2xl mb-4">2021</h2>

    <div class="mb-4">
      <div class="mb-2">
        <a
          class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
          href="https://github.com/harryzcy/scheduler"
          ><span class="text-lg">Scheduler</span></a
        >
        <span class="text-sm rounded-full ml-2 px-2 text-green-700 bg-teal-100"
          >Completed</span
        >
        <span class="text-sm rounded-full ml-2 px-2 text-lang-go bg-gray-100"
          >Go</span
        >
      </div>
      <p>
        Schedular is a command line program that helps to schedule tasks and run
        them at a specific time. It is a toy project that I experimented with Go
        and gRPC. It is comprised of a daemon process that manages all the tasks
        and a client program that invokes APIs via gRPC. The entry point of the
        program is the same binary file, and the daemon and client processes are
        started based on the flags passed to the program.
      </p>
    </div>

    <div class="mb-4">
      <div class="mb-2">
        <a
          class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
          href="https://github.com/eric-unc/hacknc2021"
          ><span class="text-lg">The Calculator</span></a
        >
        <span class="text-sm rounded-full ml-2 px-2 text-green-700 bg-teal-100"
          >Completed</span
        >
        <span class="text-sm rounded-full ml-2 px-2 text-lang-rust bg-gray-100"
          >Rust</span
        >
      </div>
      <p>
        The Calculator is built for HackNC 2021 hackathon. It is a simple
        calculator made in Rust in collaboration with Eric Schneider. I made the
        "backend" (parser/evaluator) and the web interface using WASM. Eric made
        the GUI that runs as a native app. The simple CLI version is also
        supported. The web version can be viewed
        <a
          class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
          href="https://eric-unc.tech/hacknc2021/"
          >here</a
        >.
      </p>
    </div>

    <div class="mb-4">
      <div class="mb-2">
        <a
          class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
          href="https://github.com/eric-unc/limp"
          ><span class="text-lg">Limp</span></a
        >
        <span class="text-lg ml-1">(Lisp-like language)</span>
        <span class="text-sm rounded-full ml-2 px-2 text-green-700 bg-teal-100"
          >Completed</span
        >
        <span class="text-sm rounded-full ml-2 px-2 text-lang-rust bg-gray-100"
          >Rust</span
        >
      </div>
      <p>
        Limp is a Lisp-like programming language made in Rust. Together with
        Eric Schneider, the project is made for PackHacks 2021. The language
        supports arithmetic/bitwise operations, conditional statements, and
        builtin function invocations.
      </p>
    </div>

    <div class="mb-4">
      <div class="mb-2">
        <a
          class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
          href="https://github.com/harryzcy/ascheck"
          ><span class="text-lg">ascheck</span></a
        >
        <span class="text-sm rounded-full ml-2 px-2 text-green-700 bg-teal-100"
          >Completed</span
        >
        <span class="text-sm rounded-full ml-2 px-2 text-lang-go bg-gray-100"
          >Go</span
        >
      </div>
      <p>
        ascheck is a command line tool that bulk-checks your apps for their
        Apple Silicon support.
      </p>
    </div>
  </section> -->

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
          :class="[`text-lang-${project.language_class}`]"
        >
          {{ project.language }}
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
  language: string
  language_class: string
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
        return description.replace(
          /\[(.*?)\]\((.*?)\)/g,
          (_, text, url) => {
            return `<a class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" href="${url}">${text}</a>`
          }
        ).replace(/\*\*(.*?)\*\*/g, (_, text) => {
          return `<span class="font-bold">${text}</span>`
        })
      },
    }
  },
})
</script>