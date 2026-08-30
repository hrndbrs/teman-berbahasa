<script setup lang="ts">
definePageMeta({ pageTransition: { name: 'page', mode: 'out-in' } });

const { miniCourses } = useEventsPage();
const { whatsappUrl } = useContact();
</script>

<template>
  <main
    class="screen pb-section pt-page shell:px-gutter px-5"
    data-screen-label="Mini Course"
  >
    <div
      class="mb-flow border-rule-bright text-eyebrow tracking-eyebrow flex items-baseline justify-between gap-5 border-b pb-3.5 uppercase"
    >
      <span class="text-lilac">Arsip</span>
      <span class="text-faint">04</span>
    </div>

    <h1 class="font-display text-title mb-6 font-normal text-pretty">
      Mini Course
    </h1>
    <p class="mb-flow text-lead text-paper/65 max-w-[52ch] text-pretty">
      Ikuti mini course kami untuk belajar bahasa Jepang dengan cara yang
      menyenangkan dan praktis dalam waktu singkat.
    </p>

    <div class="border-rule-bright border-t">
      <article
        v-for="item in miniCourses"
        :key="item.id"
        v-reveal
        class="group gap-flow border-rule-bright py-flow shell:grid-cols-minor grid grid-cols-1 items-start border-b *:min-w-0"
      >
        <div class="relative aspect-square w-full overflow-hidden">
          <NuxtImg
            v-wipe
            :src="item.image"
            :alt="item.title"
            width="600"
            height="600"
            sizes="sm:100vw lg:360px"
            loading="lazy"
            class="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-103"
          />
        </div>
        <div>
          <p class="text-eyebrow tracking-label text-muted mb-3 uppercase">
            {{ item.meta }}
          </p>
          <h2 class="font-display text-headline mb-4 font-normal text-pretty">
            {{ item.title }}
          </h2>
          <div class="text-muted mb-5 flex flex-wrap gap-x-5 gap-y-2 text-xs">
            <span
              v-for="date in item.dates"
              :key="date"
            >
              {{ date }}
            </span>
          </div>
          <p
            class="leading-copy text-paper/65 mb-5 max-w-[60ch] text-sm text-pretty"
          >
            {{ item.description }}
          </p>
          <div
            class="flex flex-wrap items-center gap-4 max-sm:flex-col max-sm:items-stretch"
          >
            <SiteButton
              :to="whatsappUrl"
              target="_blank"
              rel="noopener"
              tone="outline"
            >
              Tanya sesi berikutnya
            </SiteButton>
            <span class="text-eyebrow text-muted tracking-widest uppercase">
              {{ item.past ? 'Sudah berakhir' : 'Akan datang' }} ·
              {{ item.speaker }}
            </span>
          </div>
        </div>
      </article>
    </div>
  </main>
</template>
