<script setup lang="ts">
const config = useRuntimeConfig();

definePageMeta({
  layout: false,
});

const instagramUrl = computed(() =>
  config.public.instagramHandle
    ? `https://instagram.com/${config.public.instagramHandle}`
    : ''
);

const whatsappUrl = computed(() =>
  config.public.phoneNumber ? `https://wa.me/${config.public.phoneNumber}` : ''
);

const tiktokUrl = computed(() => {
  const raw = config.public.tiktokHandle || '';
  const handle = raw.startsWith('@') ? raw.slice(1) : raw;
  return handle ? `https://www.tiktok.com/@${handle}` : '';
});

useSeoMeta({
  title: 'Link - Teman Berbahasa',
  description:
    'Semua link resmi Teman Berbahasa: pendaftaran, WhatsApp, dan media sosial.',
  ogTitle: 'Link - Teman Berbahasa',
  ogDescription:
    'Semua link resmi Teman Berbahasa: pendaftaran, WhatsApp, dan media sosial.',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Link - Teman Berbahasa',
  twitterDescription:
    'Semua link resmi Teman Berbahasa: pendaftaran, WhatsApp, dan media sosial.',
});
</script>

<template>
  <section
    aria-label="Teman Berbahasa Link"
    class="flex min-h-dvh items-center justify-center bg-white py-24"
  >
    <div class="container px-6">
      <div class="mx-auto max-w-lg">
        <div class="mb-10 flex flex-col items-center text-center">
          <Icon
            name="svg:tb"
            class="mb-6 h-20 w-auto"
            aria-hidden="true"
          />
        </div>

        <div class="space-y-3">
          <a
            v-if="config.public.registrationUrl"
            :href="config.public.registrationUrl"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Buka formulir pendaftaran"
            class="flex w-full items-center justify-between gap-3 rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 text-left text-sm font-medium text-gray-900 transition hover:border-gray-300 hover:bg-white"
          >
            <span class="flex items-center gap-2">
              <Icon
                name="lucide:notebook-pen"
                class="size-4 text-gray-900"
                aria-hidden="true"
              />
              <span>Form Pendaftaran</span>
            </span>
            <Icon
              name="lucide:external-link"
              class="size-4 text-gray-500"
              aria-hidden="true"
            />
          </a>

          <a
            v-if="whatsappUrl"
            :href="whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat via WhatsApp"
            class="flex w-full items-center justify-between gap-3 rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 text-left text-sm font-medium text-gray-900 transition hover:border-gray-300 hover:bg-white"
          >
            <span class="flex items-center gap-2">
              <Icon
                name="bi:whatsapp"
                class="size-4 text-green-600"
                aria-hidden="true"
              />
              <span>WhatsApp</span>
            </span>
            <Icon
              name="lucide:external-link"
              class="size-4 text-gray-500"
              aria-hidden="true"
            />
          </a>

          <a
            v-if="instagramUrl"
            :href="instagramUrl"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Buka Instagram Teman Berbahasa"
            class="flex w-full items-center justify-between gap-3 rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 text-left text-sm font-medium text-gray-900 transition hover:border-gray-300 hover:bg-white"
          >
            <span class="flex items-center gap-2">
              <Icon
                name="bi:instagram"
                class="size-4 text-pink-600"
                aria-hidden="true"
              />
              <span>Instagram</span>
            </span>
            <Icon
              name="lucide:external-link"
              class="size-4 text-gray-500"
              aria-hidden="true"
            />
          </a>

          <a
            v-if="tiktokUrl"
            :href="tiktokUrl"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Buka TikTok Teman Berbahasa"
            class="flex w-full items-center justify-between gap-3 rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 text-left text-sm font-medium text-gray-900 transition hover:border-gray-300 hover:bg-white"
          >
            <span class="flex items-center gap-2">
              <Icon
                name="bi:tiktok"
                class="size-4 text-gray-900"
                aria-hidden="true"
              />
              <span>TikTok</span>
            </span>
            <Icon
              name="lucide:external-link"
              class="size-4 text-gray-500"
              aria-hidden="true"
            />
          </a>

          <NuxtLink
            to="/"
            aria-label="Buka halaman utama Teman Berbahasa"
            class="flex w-full items-center justify-between gap-3 rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 text-left text-sm font-medium text-gray-900 transition hover:border-gray-300 hover:bg-white"
          >
            <span class="flex items-center gap-2">
              <Icon
                name="lucide:house"
                class="size-4 text-gray-900"
                aria-hidden="true"
              />
              <span>Homepage Teman Berbahasa </span>
            </span>
            <Icon
              name="lucide:arrow-right"
              class="size-4 text-gray-500"
              aria-hidden="true"
            />
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
