<script setup lang="ts">
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from 'reka-ui';
import { courses } from '#shared/data/courses';

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

const registrationLinks = computed(() =>
  courses.flatMap((course) =>
    course.schedules
      .filter((schedule) => !!schedule.registrationUrl)
      .map((schedule) => ({
        id: schedule.id,
        title: course.title,
        label: `${schedule.days} • ${schedule.time}`,
        url: schedule.registrationUrl,
      }))
  )
);
</script>

<template>
  <section
    aria-label="Teman Berbahasa Link"
    class="relative flex min-h-dvh items-center justify-center overflow-hidden bg-gradient-to-b from-white via-white to-gray-50 py-5"
  >
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div class="tb-blob tb-blob--1" />
      <div class="tb-blob tb-blob--2" />
    </div>

    <div class="container px-6">
      <div class="mx-auto max-w-lg">
        <div
          class="relative rounded-3xl border border-gray-200/70 bg-white/80 px-6 py-14 shadow-sm backdrop-blur sm:px-8"
        >
          <div class="mb-5 flex flex-col items-center text-center">
            <div class="tb-logo-wrap mb-6">
              <Icon
                name="svg:tb"
                class="tb-logo h-20 w-auto"
                aria-hidden="true"
              />
              <div class="tb-logo-shadow" />
            </div>
          </div>

          <div class="space-y-3">
            <AccordionRoot
              v-if="registrationLinks.length"
              type="single"
              collapsible
              :unmount-on-hide="false"
              class="tb-enter"
              style="--delay: 80ms"
            >
              <AccordionItem value="registration">
                <AccordionHeader>
                  <AccordionTrigger
                    aria-label="Buka daftar formulir pendaftaran"
                    class="tb-accordion-trigger tb-link flex w-full items-center justify-between gap-3 rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 text-left text-sm font-medium text-gray-900 transition hover:-translate-y-0.5 hover:border-gray-300 hover:bg-white hover:shadow-lg hover:shadow-gray-200/60 active:scale-[0.99]"
                  >
                    <span class="flex items-center gap-2">
                      <Icon
                        name="lucide:notebook-pen"
                        class="size-4 text-gray-900"
                        aria-hidden="true"
                      />
                      <span>Daftar Kelas Bahasa Jepang</span>
                    </span>
                    <Icon
                      name="lucide:chevron-down"
                      class="tb-accordion-chevron size-4 text-gray-500"
                      aria-hidden="true"
                    />
                  </AccordionTrigger>
                </AccordionHeader>

                <AccordionContent
                  class="tb-accordion-content mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white"
                >
                  <div class="space-y-2 p-3">
                    <a
                      v-for="link in registrationLinks"
                      :key="link.id"
                      :href="link.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="group flex w-full items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-left text-sm font-medium text-gray-900 transition hover:border-gray-300 hover:bg-white hover:shadow-md hover:shadow-gray-200/60 active:scale-[0.99]"
                    >
                      <div class="space-y-2 pr-2">
                        <p class="font-semibold">
                          {{ link.title }}
                        </p>
                        <p>
                          {{ link.label }}
                        </p>
                      </div>
                      <Icon
                        name="lucide:external-link"
                        class="size-4 shrink-0 text-gray-500 transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </AccordionRoot>

            <NuxtLink
              to="/"
              aria-label="Buka halaman utama Teman Berbahasa"
              class="tb-link tb-enter group flex w-full items-center justify-between gap-3 rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 text-left text-sm font-medium text-gray-900 transition hover:-translate-y-0.5 hover:border-gray-300 hover:bg-white hover:shadow-lg hover:shadow-gray-200/60 active:scale-[0.99]"
              style="--delay: 400ms"
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
                class="size-4 text-gray-500 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </NuxtLink>

            <a
              v-if="whatsappUrl"
              :href="whatsappUrl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat via WhatsApp"
              class="tb-link tb-enter group flex w-full items-center justify-between gap-3 rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 text-left text-sm font-medium text-gray-900 transition hover:-translate-y-0.5 hover:border-gray-300 hover:bg-white hover:shadow-lg hover:shadow-gray-200/60 active:scale-[0.99]"
              style="--delay: 160ms"
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
                class="size-4 text-gray-500 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>

            <a
              v-if="instagramUrl"
              :href="instagramUrl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Buka Instagram Teman Berbahasa"
              class="tb-link tb-enter group flex w-full items-center justify-between gap-3 rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 text-left text-sm font-medium text-gray-900 transition hover:-translate-y-0.5 hover:border-gray-300 hover:bg-white hover:shadow-lg hover:shadow-gray-200/60 active:scale-[0.99]"
              style="--delay: 240ms"
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
                class="size-4 text-gray-500 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>

            <a
              v-if="tiktokUrl"
              :href="tiktokUrl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Buka TikTok Teman Berbahasa"
              class="tb-link tb-enter group flex w-full items-center justify-between gap-3 rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 text-left text-sm font-medium text-gray-900 transition hover:-translate-y-0.5 hover:border-gray-300 hover:bg-white hover:shadow-lg hover:shadow-gray-200/60 active:scale-[0.99]"
              style="--delay: 320ms"
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
                class="size-4 text-gray-500 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tb-logo-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.tb-logo {
  animation: tb-jump 1.05s cubic-bezier(0.22, 1, 0.36, 1) infinite;
  transform-origin: center;
  will-change: transform;
}

.tb-logo-shadow {
  position: absolute;
  left: 50%;
  top: calc(100% + 6px);
  width: 56px;
  height: 12px;
  transform: translateX(-50%);
  background: radial-gradient(
    closest-side,
    rgba(17, 24, 39, 0.28),
    rgba(17, 24, 39, 0)
  );
  filter: blur(1px);
  opacity: 0.6;
  animation: tb-shadow 1.05s cubic-bezier(0.22, 1, 0.36, 1) infinite;
  will-change: transform, opacity;
}

.tb-enter {
  animation: tb-enter 600ms cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--delay, 0ms);
  will-change: transform, opacity;
}

.tb-blob {
  position: absolute;
  width: 30rem;
  height: 30rem;
  border-radius: 9999px;
  filter: blur(60px);
  opacity: 0.35;
  animation: tb-float 10s ease-in-out infinite;
  will-change: transform;
}

.tb-blob--1 {
  top: -10rem;
  left: -12rem;
  background: rgb(186 230 253);
}

.tb-blob--2 {
  right: -14rem;
  bottom: -12rem;
  background: rgb(254 202 202);
  animation-duration: 12s;
  animation-direction: reverse;
}

@keyframes tb-jump {
  0% {
    transform: translateY(0) scaleX(1.02) scaleY(0.98);
  }

  12% {
    transform: translateY(0) scaleX(1.06) scaleY(0.92);
  }

  45% {
    transform: translateY(-20px) scaleX(0.98) scaleY(1.02);
  }

  70% {
    transform: translateY(0) scaleX(1.04) scaleY(0.96);
  }

  100% {
    transform: translateY(0) scaleX(1) scaleY(1);
  }
}

@keyframes tb-shadow {
  0% {
    transform: translateX(-50%) scale(1);
    opacity: 0.55;
  }

  45% {
    transform: translateX(-50%) scale(0.62);
    opacity: 0.25;
  }

  100% {
    transform: translateX(-50%) scale(1);
    opacity: 0.55;
  }
}

@keyframes tb-enter {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes tb-float {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }

  50% {
    transform: translate3d(16px, 18px, 0) scale(1.04);
  }
}

@media (prefers-reduced-motion: reduce) {
  .tb-logo,
  .tb-enter,
  .tb-blob,
  .tb-logo-shadow {
    animation: none !important;
  }

  :deep(.tb-accordion-content) {
    animation: none !important;
  }
}

:deep(.tb-accordion-trigger .tb-accordion-chevron) {
  transition: transform 0.2s ease;
}

:deep(.tb-accordion-trigger[data-state='open'] .tb-accordion-chevron) {
  transform: rotate(180deg);
}

:deep(.tb-accordion-content[data-state='open']) {
  animation: tb-accordion-down 0.2s ease-out;
}

:deep(.tb-accordion-content[data-state='closed']) {
  animation: tb-accordion-up 0.2s ease-out;
}

@keyframes tb-accordion-down {
  from {
    height: 0;
    opacity: 0;
  }

  to {
    height: var(--reka-accordion-content-height);
    opacity: 1;
  }
}

@keyframes tb-accordion-up {
  from {
    height: var(--reka-accordion-content-height);
    opacity: 1;
  }

  to {
    height: 0;
    opacity: 0;
  }
}
</style>
