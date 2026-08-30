<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core';

const { whatsappUrl } = useContact();
const { sm } = useBreakpoints(breakpointsTailwind);

const links = [
  { to: '/courses', label: 'Program' },
  { to: '/events', label: 'Mini Course' },
];

const menuOpen = ref(false);

watch(sm, (isDesktop) => {
  if (isDesktop) menuOpen.value = false;
});
</script>

<template>
  <header
    class="from-ink/95 shell:left-rail shell:px-gutter fixed inset-x-0 top-0 z-40 flex items-center justify-between gap-5 bg-linear-to-b to-transparent px-5 py-4.5 max-sm:gap-2.5 max-sm:py-3"
  >
    <NuxtLink
      to="/"
      class="inline-flex items-center transition-transform duration-100 ease-out active:scale-98"
    >
      <Icon
        :name="sm ? 'svg:tb' : 'svg:tb-icon'"
        class="h-6 w-auto sm:h-8"
      />
      <span class="sr-only">Teman Berbahasa</span>
    </NuxtLink>

    <nav class="hidden items-center gap-1.5 sm:flex">
      <SiteButton
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        tone="link-muted"
        active-class="text-paper!"
        class="tracking-eyebrow px-3! py-2!"
      >
        {{ link.label }}
      </SiteButton>
      <SiteButton
        :to="whatsappUrl"
        target="_blank"
        rel="noopener"
        class="ml-2"
      >
        Daftar
      </SiteButton>
    </nav>

    <UButton
      variant="ghost"
      aria-label="Buka menu"
      aria-haspopup="dialog"
      :aria-expanded="menuOpen"
      class="text-dim hover:text-paper size-9 items-center justify-center duration-150 ease-out active:scale-95 sm:hidden"
      @click="menuOpen = true"
    >
      <span
        aria-hidden="true"
        class="flex w-5 flex-col gap-1.5"
      >
        <span class="h-0.5 w-full bg-current" />
        <span class="h-0.5 w-full bg-current" />
      </span>
    </UButton>
  </header>

  <ClientOnly>
    <UDrawer
      v-model:open="menuOpen"
      direction="left"
      :handle="false"
      title="Navigasi"
      description="Tautan halaman Teman Berbahasa"
      :ui="{
        overlay: 'bg-ink/80',
        content:
          'w-76 max-w-[82vw] rounded-none border-r border-rule-bright bg-ink ring-0',
        container: 'gap-0 p-0',
        title: 'sr-only',
        description: 'sr-only',
      }"
    >
      <template #body>
        <div class="flex h-full flex-col px-6 py-5">
          <div class="flex items-center justify-end">
            <UButton
              variant="ghost"
              aria-label="Tutup menu"
              class="text-dim hover:text-paper size-9 items-center justify-center duration-150 ease-out active:scale-95 sm:hidden"
              @click="menuOpen = false"
            >
              <span
                aria-hidden="true"
                class="relative block size-4"
              >
                <span
                  class="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 rotate-45 bg-current"
                />
                <span
                  class="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 -rotate-45 bg-current"
                />
              </span>
            </UButton>
          </div>

          <nav class="mt-14 flex flex-col gap-6">
            <NuxtLink
              v-for="(link, index) in links"
              :key="link.to"
              :to="link.to"
              active-class="text-paper"
              :class="['menu-item', `menu-item-${index + 1}`]"
              class="font-display text-quote text-dim hover:text-lilac font-normal transition duration-200 ease-out hover:translate-x-2"
              @click="menuOpen = false"
            >
              {{ link.label }}
            </NuxtLink>
          </nav>

          <SiteButton
            :to="whatsappUrl"
            target="_blank"
            rel="noopener"
            class="menu-item menu-item-3 mt-auto w-full"
          >
            Daftar
          </SiteButton>
        </div>
      </template>
    </UDrawer>
  </ClientOnly>
</template>

<style scoped>
@media (prefers-reduced-motion: no-preference) {
  .menu-item {
    animation: menu-item-in 240ms cubic-bezier(0.23, 1, 0.32, 1) backwards;
  }
  .menu-item-1 {
    animation-delay: 160ms;
  }
  .menu-item-2 {
    animation-delay: 215ms;
  }
  .menu-item-3 {
    animation-delay: 270ms;
  }
}

@keyframes menu-item-in {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
}
</style>
