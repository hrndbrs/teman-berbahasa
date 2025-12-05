<script setup lang="ts">
import { ref } from 'vue';

const isMenuOpen = ref(false);

const navLinks = [{ to: '/events', label: 'Mini Courses' }];

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function closeMenu() {
  isMenuOpen.value = false;
}
</script>

<template>
  <header class="fixed top-0 z-1000 w-full bg-white py-4">
    <nav class="container flex items-center justify-between px-6 md:gap-12">
      <!-- Logo -->
      <NuxtLink
        to="/"
        @click="closeMenu"
      >
        <Icon
          name="svg:tb"
          class="h-20 w-50 shrink-0"
        />
      </NuxtLink>

      <!-- Desktop Navigation Links -->
      <div class="hidden items-center space-x-8 text-sm md:flex">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="text-gray-600 transition hover:text-tb-blue-3"
        >
          {{ link.label }}
        </NuxtLink>
      </div>

      <!-- Mobile Menu Toggle -->
      <button
        type="button"
        class="flex items-center justify-center p-2 text-gray-600 transition hover:text-tb-blue-3 md:hidden"
        aria-label="Toggle menu"
        @click="toggleMenu"
      >
        <Icon
          :name="isMenuOpen ? 'lucide:x' : 'lucide:menu'"
          class="size-6"
        />
      </button>
    </nav>

    <!-- Mobile Dropdown Menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isMenuOpen"
        class="absolute top-full right-0 left-0 border-t border-gray-100 bg-white shadow-lg md:hidden"
      >
        <div class="container px-6 py-4">
          <div class="flex flex-col space-y-4">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              class="text-gray-600 transition hover:text-tb-blue-3"
              @click="closeMenu"
            >
              {{ link.label }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>
