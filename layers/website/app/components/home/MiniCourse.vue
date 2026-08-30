<script setup lang="ts">
const { items } = defineProps<{ items: MiniCourse[] }>();

const { whatsappUrl } = useContact();
</script>

<template>
  <section class="border-rule py-section shell:px-gutter border-t px-5">
    <div
      v-reveal
      class="border-rule-bright mb-8 flex flex-wrap items-baseline justify-between gap-6 border-b pb-4.5"
    >
      <h2
        v-words
        class="font-display text-headline m-0 font-normal"
      >
        Mini Course
      </h2>
      <p
        class="leading-copy text-paper/60 m-0 max-w-[42ch] text-sm text-pretty"
      >
        Belajar bahasa Jepang dengan cara yang menyenangkan dan praktis dalam
        waktu singkat.
      </p>
    </div>

    <div class="gap-flow shell:grid-cols-2 grid grid-cols-1 *:min-w-0">
      <article
        v-for="item in items"
        :key="item.id"
        v-reveal
        class="group"
      >
        <div class="relative mb-5 aspect-4/3 w-full overflow-hidden">
          <NuxtImg
            v-wipe
            :src="item.image"
            :alt="item.title"
            loading="lazy"
            class="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-103"
          />
        </div>
        <p class="text-eyebrow tracking-label text-muted mb-2.5 uppercase">
          {{ item.meta }}
        </p>
        <h3 class="font-display text-subhead mb-3.5 font-normal text-pretty">
          {{ item.title }}
        </h3>
        <p class="leading-copy text-paper/60 mb-4 text-sm text-pretty">
          {{ item.description }}
        </p>
        <SiteButton
          :to="whatsappUrl"
          target="_blank"
          rel="noopener"
          tone="link"
          class="border-lilac border-b pb-1!"
        >
          Tanya sesi berikutnya
        </SiteButton>
      </article>
    </div>
  </section>
</template>
