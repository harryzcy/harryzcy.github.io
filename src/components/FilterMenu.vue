<template>
  <Menu as="div" class="relative inline-block text-left">
    <MenuButton
      class="inline-flex items-center rounded-md border px-3 py-1 cursor-pointer dark:border-neutral-200/5 dark:bg-neutral-200/10 hover:bg-neutral-200/40 hover:dark:border-neutral-200/30 hover:dark:text-neutral-300 hover:dark:bg-neutral-200/20"
    >
      <span class="text-sm">{{ menuText }}</span>
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
        class="absolute right-0 mt-2 min-w-full origin-top-right rounded-md border text-sm cursor-pointer bg-white dark:bg-neutral-900 dark:border-neutral-200/5 focus:outline-none"
      >
        <div
          v-for="option in options"
          class="dark:bg-neutral-200/10 hover:bg-neutral-200/40 hover:dark:text-neutral-300 hover:dark:bg-neutral-200/20 first:rounded-t-md last:rounded-b-md"
        >
          <MenuItem>
            <span
              class="inline-flex items-center px-5 py-1 w-full"
              @click="
                (event) => {
                  event.preventDefault()
                  emit('toggle', option)
                }
              "
            >
              <span class="-ml-3 mr-1">
                <CheckIcon
                  class="w-3 h-3"
                  :class="{
                    invisible: !selected.includes(option)
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
</template>

<script setup lang="ts">
import { CheckIcon, ChevronDownIcon } from '@heroicons/vue/24/solid'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

defineProps({
  menuText: {
    type: String,
    required: true
  },
  selected: {
    type: Array,
    required: true
  },
  options: {
    type: Array<string>,
    required: true
  }
})

const emit = defineEmits<{
  toggle: [option: string]
}>()
</script>
