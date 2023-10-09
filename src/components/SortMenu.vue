<template>
  <Menu as="div" class="relative inline-block select-none text-left">
    <MenuButton
      class="inline-flex cursor-pointer items-center rounded-md border px-3 py-1 hover:bg-neutral-200/40 dark:border-neutral-200/5 dark:bg-neutral-200/10 hover:dark:border-neutral-200/30 hover:dark:bg-neutral-200/20 hover:dark:text-neutral-100"
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
        <MenuItem
          v-for="option in options"
          :key="option"
          v-slot="{ active, close }"
        >
          <div
            class="first:rounded-t-md last:rounded-b-md dark:bg-neutral-200/10"
            :class="{
              'bg-neutral-200/40 dark:bg-neutral-200/20 dark:text-neutral-100':
                active
            }"
            @click="
              () => {
                emit('update:modelValue', option)
                scrollToTop()
                close()
              }
            "
          >
            <span class="flex w-full items-center px-5 py-1">
              <span class="-ml-3 mr-1">
                <CheckIcon
                  class="h-3 w-3"
                  :class="{
                    invisible: option !== modelValue
                  }"
                />
              </span>
              <span>{{ option }}</span>
            </span>
          </div>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { CheckIcon, ChevronDownIcon } from '@heroicons/vue/24/solid'

defineProps({
  options: {
    type: Array<string>,
    required: true
  },
  modelValue: {
    type: String,
    required: true
  },
  scrollToTop: {
    type: Function,
    required: true
  }
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
