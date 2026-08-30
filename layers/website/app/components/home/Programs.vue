<script setup lang="ts">
defineProps<{
  programs: Program[];
}>();

const { whatsappUrl } = useContact();
const activeShot = ref(0);
</script>

<template>
  <section class="border-rule py-section shell:px-gutter border-t px-5">
    <div
      v-reveal
      class="mb-flow border-rule-bright text-eyebrow tracking-eyebrow flex items-baseline justify-between gap-5 border-b pb-3.5 uppercase"
    >
      <span class="text-lilac">Program Belajar</span>
    </div>

    <SiteEmpty v-if="!programs.length">
      <template #heading>
        Belum ada angkatan yang
        <em>dibuka</em>.
      </template>
      <template #body>
        Angkatan baru dibuka secara berkala. Hubungi admin supaya kamu tahu
        saat pendaftaran berikutnya dibuka.
      </template>
      <template #action>
        <SiteButton
          :to="whatsappUrl"
          target="_blank"
          rel="noopener"
          tone="outline"
        >
          Hubungi admin
        </SiteButton>
      </template>
    </SiteEmpty>

    <div
      v-else
      class="gap-flow shell:grid-cols-major grid grid-cols-1 items-start *:min-w-0"
    >
      <div
        data-cursorzone="Lihat detail"
        class="border-rule-bright border-t"
      >
        <NuxtLink
          v-for="(program, i) in programs"
          :key="program.id"
          v-reveal
          :to="`/courses/${program.slug}`"
          class="group border-rule-bright hover:text-lilac relative block border-b py-8 transition-colors duration-200 ease-out"
          @mouseenter="activeShot = i"
        >
          <span class="marker" />
          <div class="mb-3 flex items-baseline justify-between gap-5">
            <span class="text-eyebrow tracking-label text-muted uppercase">
              {{ program.num }} · {{ program.kind }}
            </span>
            <span class="font-display text-lilac text-xl whitespace-nowrap">
              {{ program.price }}
            </span>
          </div>
          <h2
            class="font-display text-headline mb-4 inline-block font-normal text-pretty transition-transform duration-200 ease-out group-hover:translate-x-2.5"
          >
            {{ program.title }}
          </h2>
          <p
            class="leading-copy text-paper/60 mb-4 max-w-[60ch] text-sm text-pretty"
          >
            {{ program.desc }}
          </p>
          <div
            class="text-eyebrow text-muted flex flex-wrap gap-x-6 gap-y-2 tracking-widest uppercase"
          >
            <span
              v-for="fact in program.facts"
              :key="fact"
            >
              {{ fact }}
            </span>
          </div>
        </NuxtLink>
      </div>

      <div class="shell:sticky shell:top-24 hidden lg:block">
        <div class="relative aspect-3/4 w-full overflow-hidden">
          <NuxtImg
            v-for="(program, i) in programs"
            :key="program.id"
            :src="program.image"
            :alt="program.imageAlt"
            width="600"
            height="800"
            sizes="sm:100vw lg:520px"
            loading="lazy"
            class="absolute inset-0 size-full object-cover transition-opacity duration-300 ease-out"
            :style="{ opacity: activeShot === i ? 1 : 0 }"
          />
        </div>
        <p class="text-eyebrow tracking-label text-muted mt-3.5 uppercase">
          Maks. 10 orang · Kelas daring via Zoom
        </p>
      </div>
    </div>
  </section>
</template>
