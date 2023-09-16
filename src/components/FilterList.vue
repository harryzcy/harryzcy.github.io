<template>
  <div class="flex justify-between gap-4 items-center">
    <span>{{ menuText }}</span>
    <Listbox
      as="div"
      :model-value="modelValue"
      @update:modelValue="(value) => emit('update:modelValue', value)"
      multiple
      class="w-56 ml-20 rounded-md border text-sm cursor-pointer bg-white dark:bg-neutral-900 dark:border-neutral-200/5 focus:outline-none"
    >
      <ListboxButton
        class="relative w-full cursor-pointer rounded-lg bg-white bg-neutral-200/5 py-2 px-3 pr-8 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300"
      >
        <span class="block text-sm">
          <span
            v-if="modelValue.length === 0"
            class="dark:text-neutral-400 italic"
            >No filter</span
          >
          <span v-else class="flex flex-wrap gap-2">
            {{ modelValue.join(', ') }}
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
            class="absolute left-0 mt-2 min-w-full rounded-md border text-sm cursor-pointer bg-white dark:bg-neutral-900 dark:border-neutral-200/5 focus:outline-none"
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
                  'relative select-none py-2 pl-10 pr-4 first:rounded-t-md last:rounded-b-md'
                ]"
              >
                <span :class="[selected ? 'font-medium' : 'font-normal']">{{
                  option
                }}</span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
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

defineProps({
  menuText: {
    type: String,
    required: true
  },
  options: {
    type: Array<string>,
    required: true
  },
  modelValue: {
    type: Array<string>,
    required: true
  }
})

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
}>()
</script>
