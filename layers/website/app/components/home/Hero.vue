<script lang="ts" setup>
const banners = [
  'https://images.unsplash.com/photo-1574236170880-fbbca132d83d',
  'https://images.unsplash.com/photo-1774689220972-3e6a9f46195d',
  'https://images.unsplash.com/photo-1571822325911-c01620a65e86',
  'https://images.unsplash.com/photo-1729915342948-bf4dd5280ce7',
];
const activeBannerIndex = ref(0);
const intervalId = ref<undefined | ReturnType<typeof setInterval>>();
const activeBanner = computed(() => banners[activeBannerIndex.value]);

onMounted(() => {
  intervalId.value = setInterval(() => {
    activeBannerIndex.value = (activeBannerIndex.value + 1) % banners.length;
  }, 6000);
});

onBeforeUnmount(() => clearInterval(intervalId.value));
</script>

<template>
  <section
    class="relative flex min-h-svh flex-col justify-end overflow-hidden pt-22"
  >
    <div class="absolute inset-0">
      <Transition name="banner">
        <NuxtImg
          :key="`banner-${activeBannerIndex}`"
          v-parallax="70"
          :src="activeBanner"
          alt=""
          sizes="sm:100vw md:100vw lg:100vw xl:100vw 2xl:100vw"
          width="1600"
          height="900"
          :preload="activeBannerIndex === 0"
          :fetchpriority="activeBannerIndex === 0 ? 'high' : 'auto'"
          class="absolute inset-0 size-full object-cover"
        />
      </Transition>
      <div
        class="from-ink/65 via-ink/25 to-ink/40 absolute inset-0 bg-linear-to-b"
      />
    </div>

    <div
      class="via-ink/85 to-ink shell:px-gutter relative w-full bg-linear-to-b from-transparent px-5 pt-14 pb-16"
    >
      <p
        v-rise
        class="text-eyebrow tracking-eyebrow text-lilac-soft mb-6 uppercase"
      >
        Belajar bahasa · Temukan dunia
      </p>
      <h1
        v-rise="0.12"
        class="font-display text-title mb-6 max-w-[21ch] font-normal text-pretty"
      >
        Dunia lebih luas<br />
        ketika kita memahami<br />
        <em class="text-lilac italic">bahasanya</em>.
      </h1>
      <div
        v-rise="0.28"
        class="gap-flow shell:grid-cols-major grid grid-cols-1 items-end *:min-w-0"
      >
        <p class="text-lead text-paper/75 m-0 max-w-[52ch] text-pretty">
          Setiap bahasa membawa cara baru untuk melihat dunia.<br />
          Teman Berbahasa menemanimu mempelajari bahasa, memahami budaya, dan
          menemukan cerita yang mungkin sebelumnya terasa jauh.
        </p>
        <SiteButton
          to="/courses"
          size="lg"
          class="justify-self-start"
        >
          Jelajahi kelas
          <span aria-hidden="true">→</span>
        </SiteButton>
      </div>
    </div>
  </section>
</template>
