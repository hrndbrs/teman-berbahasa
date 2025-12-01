<script setup lang="ts">
import {
  PopoverRoot,
  PopoverTrigger,
  PopoverPortal,
  PopoverContent,
  PopoverClose,
} from 'reka-ui';

interface Event {
  id: number;
  title: string;
}

defineProps<{
  events: Event[];
}>();

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<template>
  <header class="bg-white py-4 fixed top-0 z-1000 w-full">
    <nav
      class="container mx-auto px-6 flex items-center justify-between md:gap-12"
    >
      <!-- Logo - Stylized "t" -->
      <a
        href="#"
        @click.prevent="scrollToTop"
      >
        <Icon
          name="svg:tb"
          class="h-20 w-22.5 shrink-0"
        />
      </a>

      <!-- Navigation Links -->
      <div class="hidden md:flex items-center space-x-8 text-sm">
        <!-- Mini Courses Dropdown -->
        <PopoverRoot>
          <PopoverTrigger
            class="flex items-center gap-1 text-gray-600 hover:text-tb-blue-3 transition cursor-pointer"
          >
            Mini Courses
            <Icon
              name="lucide:chevron-down"
              class="size-4"
            />
          </PopoverTrigger>
          <PopoverPortal>
            <PopoverContent
              side="bottom"
              align="start"
              :side-offset="8"
              class="bg-white rounded-lg shadow-lg border border-gray-100 p-2 min-w-48 z-[1001]"
            >
              <div class="flex flex-col">
                <PopoverClose
                  v-for="event in events"
                  :key="event.id"
                  as-child
                >
                  <a
                    :href="`#event-${event.id}`"
                    class="px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-tb-blue-3 rounded-md transition text-left"
                  >
                    {{ event.title }}
                  </a>
                </PopoverClose>
              </div>
            </PopoverContent>
          </PopoverPortal>
        </PopoverRoot>

        <a
          href="#cta"
          class="text-gray-600 hover:text-tb-blue-3 transition"
        >
          Register
        </a>
        <a
          href="#contact"
          class="text-gray-600 hover:text-tb-blue-3 transition"
        >
          Contact
        </a>
      </div>
    </nav>
  </header>
</template>
