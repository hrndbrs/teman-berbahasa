<script setup lang="ts">
const { phoneNumber, whatsappUrl, instagramUrl, tiktokUrl } = useContact();

const siteLinks = [
  { label: 'Beranda', to: '/' },
  { label: 'Program Belajar', to: '/courses' },
  { label: 'Mini Course', to: '/events' },
];

const links = computed(() =>
  [
    phoneNumber && {
      label: formatPhoneNumber(phoneNumber),
      to: whatsappUrl.value,
    },
    instagramUrl.value && { label: 'Instagram', to: instagramUrl.value },
    tiktokUrl.value && { label: 'TikTok', to: tiktokUrl.value },
  ].filter((v): v is { label: string; to: string } => Boolean(v))
);
</script>

<template>
  <footer class="border-rule pt-section shell:px-gutter border-t px-5 pb-10">
    <NuxtLink
      :href="whatsappUrl"
      target="_blank"
      class="group block"
    >
      <p
        v-words
        v-reveal
        class="mb-flow font-display text-display group-hover:text-lilac inline-block font-normal text-pretty transition duration-200 ease-out group-hover:translate-x-2.5"
      >
        Mulai perjalananmu.
      </p>
    </NuxtLink>

    <nav
      aria-label="Tautan situs"
      class="mb-8 flex flex-wrap gap-x-6 gap-y-2"
    >
      <SiteButton
        v-for="link in siteLinks"
        :key="link.to"
        :to="link.to"
        tone="link-muted"
        class="tracking-wide! normal-case!"
      >
        {{ link.label }}
      </SiteButton>
    </nav>

    <div
      class="border-rule flex flex-wrap items-end justify-between gap-8 border-t pt-5"
    >
      <div class="flex flex-wrap gap-6">
        <SiteButton
          v-for="link in links"
          :key="link.label"
          :to="link.to"
          target="_blank"
          rel="noopener"
          tone="link-muted"
          class="tracking-wide! normal-case!"
        >
          {{ link.label }}
        </SiteButton>
      </div>
      <span class="text-eyebrow tracking-eyebrow text-muted uppercase">
        Teman Berbahasa · Zoom Meeting
      </span>
    </div>
  </footer>
</template>
