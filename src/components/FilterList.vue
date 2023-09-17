<template>
  <div class="flex items-center justify-between gap-4">
    <span>{{ menuText }}</span>
    <Listbox
      as="div"
      :model-value="modelValue"
      @update:modelValue="(value) => emit('update:modelValue', value)"
      :multiple="multiple"
      class="ml-20 w-56 cursor-pointer rounded-md border bg-white text-sm focus:outline-none dark:border-neutral-200/5 dark:bg-neutral-900"
    >
      <ListboxButton
        class="relative w-full cursor-pointer rounded-lg bg-white px-3 py-2 pr-8 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 dark:bg-neutral-200/5"
      >
        <span class="block text-sm">
          <span
            v-if="Array.isArray(modelValue) && modelValue.length === 0"
            class="italic dark:text-neutral-400"
            >No filter</span
          >
          <span v-else class="flex flex-wrap gap-2">
            {{ Array.isArray(modelValue) ? modelValue.join(', ') : modelValue }}
          </span>
        </span>
        <span
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <div class="relative">
        <transition
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute left-0 z-20 mt-2 min-w-full cursor-pointer rounded-md border bg-white text-sm focus:outline-none dark:border-neutral-200/5 dark:bg-neutral-900"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="option in options"
              :key="option"
              :value="option"
              as="template"
            >
              <li
                :class="[
                  active
                    ? 'bg-neutral-200/40 dark:bg-neutral-200/20 dark:text-neutral-300'
                    : 'bg-neutral-200/10',
                  'relative select-none px-7 py-2 first:rounded-t-md last:rounded-b-md'
                ]"
              >
                <span :class="[selected ? 'font-medium' : 'font-normal']">{{
                  option
                }}</span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-2"
                >
                  <CheckIcon class="h-3 w-3" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/24/solid'

interface Props {
  menuText: string
  options: string[]
  modelValue: string | string[]
  multiple?: boolean
}

withDefaults(defineProps<Props>(), {
  multiple: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string | string[]]
}>()
</script>
