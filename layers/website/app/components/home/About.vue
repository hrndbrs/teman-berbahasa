<script setup lang="ts">
const { instagramHandle, instagramUrl } = useContact();
</script>

<template>
  <section class="border-rule border-t">
    <div
      v-reveal
      class="bg-cobalt-deep py-section text-paper shell:px-gutter relative overflow-hidden px-5"
    >
      <NuxtImg
        src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1400&auto=format&fit=crop"
        alt=""
        width="1400"
        height="900"
        sizes="sm:100vw md:100vw lg:100vw xl:100vw 2xl:100vw"
        loading="lazy"
        class="absolute inset-0 h-full w-full object-cover mix-blend-multiply brightness-106 contrast-122 grayscale"
      />
      <div
        aria-hidden="true"
        class="absolute inset-0 bg-[linear-gradient(102deg,#0a1078b8_0%,#0a107847_46%,#0a10780f_100%)]"
      />

      <div
        class="mb-flow border-paper/40 text-eyebrow tracking-eyebrow relative flex items-baseline justify-between gap-5 border-b pb-3 uppercase"
      >
        <span>Tentang Teman Berbahasa</span>
      </div>

      <div
        class="gap-flow shell:grid-cols-major relative grid grid-cols-1 items-end *:min-w-0"
      >
        <div>
          <p
            lang="ja"
            class="text-subhead relative mb-4 leading-snug font-medium text-shadow-[0_2px_30px_#060a3c80]"
          >
            言葉の数だけ、世界がある。
          </p>
          <p
            v-words
            class="font-display text-quote text-paper/80 m-0 font-normal italic"
          >
            Bahasa membawa kita<br />lebih dekat.
          </p>
        </div>
        <div>
          <p
            class="border-paper/35 leading-copy text-paper/90 mb-3.5 border-l pl-0 text-sm text-pretty sm:pl-5"
          >
            Teman Berbahasa berangkat dari satu hal sederhana: rasa ingin tahu.
          </p>
          <p
            class="border-paper/35 leading-copy text-paper/90 mb-3.5 border-l pl-0 text-sm text-pretty sm:pl-5"
          >
            Kami percaya bahasa bukan sekadar sesuatu untuk dipelajari. Bahasa
            adalah cara untuk memahami dunia, budaya, dan manusia yang berbeda
            dari kita.
          </p>
          <p
            class="border-paper/35 leading-copy text-paper/75 m-0 border-l pl-0 text-sm text-pretty sm:pl-5"
          >
            Kami hadir untuk menemani perjalanan itu, satu bahasa, satu cerita,
            satu percakapan pada satu waktu.
          </p>
        </div>
      </div>

      <div
        class="mt-flow border-paper/40 text-eyebrow tracking-label relative flex flex-wrap items-end justify-between gap-5 border-t pt-4 uppercase"
      >
        <a
          :href="instagramUrl"
          target="_blank"
          rel="noopener"
          class="group hover:text-lilac inline-flex items-baseline gap-2 transition-colors duration-200 ease-out"
        >
          <span
            class="inline-block transition-transform duration-200 ease-out group-hover:translate-x-2.5"
          >
            @{{ instagramHandle || 'teman.berbahasa' }}
          </span>
          <span aria-hidden="true">↗</span>
        </a>
        <span class="text-paper/70"> Bahasa, Budaya &amp; Cerita </span>
      </div>
    </div>
  </section>
</template>
