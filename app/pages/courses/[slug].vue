<script setup lang="ts">
import { courses } from '#shared/data/courses';

const route = useRoute();
const course = computed(() =>
  courses.find((c) => c.slug === route.params.slug)
);

if (!course.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Program tidak ditemukan',
    fatal: true,
  });
}

useSeoMeta({
  title: () => `${course.value?.title} - Teman Berbahasa`,
  description: () => course.value?.description,
});

const config = useRuntimeConfig();
</script>

<template>
  <main
    v-if="course"
    class="relative min-h-dvh pt-40 pb-20"
  >
    <!-- Background Decor -->
    <div
      class="absolute inset-0 -z-10 overflow-hidden bg-gradient-to-b from-blue-50/50 to-white"
    >
      <div
        class="absolute top-20 -left-20 h-96 w-96 rounded-full bg-blue-100 opacity-50 blur-3xl"
      />
      <div
        class="bg-tb-red-1 absolute top-0 right-0 h-96 w-96 rounded-full opacity-10 blur-3xl"
      />
    </div>

    <div class="container px-6">
      <NuxtLink
        to="/courses"
        class="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900"
      >
        <Icon
          name="lucide:arrow-left"
          class="size-4"
        />
        Kembali ke Daftar Program
      </NuxtLink>

      <div class="grid gap-12 lg:grid-cols-[2fr_1fr]">
        <!-- Main Content -->
        <div>
          <span
            class="mb-4 inline-block rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-tb-blue-3"
          >
            {{ course.category }}
          </span>
          <h1 class="mb-6 text-3xl font-bold text-gray-900 md:text-5xl">
            {{ course.title }}
          </h1>
          <div class="prose max-w-none text-gray-600">
            <p class="text-lg leading-relaxed">
              {{ course.description }}
            </p>
          </div>

          <!-- Schedule Section -->
          <div class="mt-12">
            <h2 class="mb-6 text-2xl font-bold text-gray-900">
              Jadwal Tersedia
            </h2>
            <div class="@container space-y-4">
              <div
                v-for="schedule in course.schedules"
                :key="schedule.id"
                class="flex flex-col gap-6 rounded-xl border border-gray-200 bg-white p-6 transition hover:shadow-md"
              >
                <div class="grid gap-4 @md:grid-cols-2 @3xl:grid-cols-3">
                  <div class="flex items-center gap-3">
                    <div
                      class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-tb-blue-3"
                    >
                      <Icon
                        name="lucide:calendar"
                        class="size-5"
                      />
                    </div>
                    <div>
                      <p class="text-xs font-medium text-gray-500">Hari</p>
                      <p class="font-semibold text-gray-900">
                        {{ schedule.days }}
                      </p>
                    </div>
                  </div>

                  <div class="flex items-center gap-3">
                    <div
                      class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-600"
                    >
                      <Icon
                        name="lucide:clock"
                        class="size-5"
                      />
                    </div>
                    <div>
                      <p class="text-xs font-medium text-gray-500">Waktu</p>
                      <p class="font-semibold text-gray-900">
                        {{ schedule.time }}
                      </p>
                    </div>
                  </div>

                  <div class="flex items-center gap-3">
                    <div
                      class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600"
                    >
                      <Icon
                        name="lucide:play-circle"
                        class="size-5"
                      />
                    </div>
                    <div>
                      <p class="text-xs font-medium text-gray-500">Mulai</p>
                      <NuxtTime
                        :datetime="schedule.startDate"
                        date-style="medium"
                        locale="id-ID"
                        class="font-semibold text-gray-900"
                      />
                    </div>
                  </div>
                </div>

                <div
                  v-if="new Date() > new Date(schedule.startDate)"
                  class="flex shrink-0 cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-gray-100 px-6 py-3 text-sm font-semibold text-gray-400"
                >
                  Pendaftaran Tutup
                  <Icon
                    name="lucide:lock"
                    class="size-4"
                  />
                </div>
                <a
                  v-else
                  :href="schedule.registrationUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-tb-blue-3 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
                >
                  Daftar
                  <Icon
                    name="lucide:external-link"
                    class="size-4"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <aside class="relative">
          <div class="sticky top-40 space-y-6">
            <div
              class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <h3 class="mb-4 text-lg font-bold text-gray-900">
                Detail Program
              </h3>
              <ul class="space-y-4">
                <li
                  class="flex items-start justify-between gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                >
                  <span class="text-sm text-gray-500">Biaya Program</span>
                  <span class="text-lg font-bold text-tb-blue-3">
                    {{ formatCurrency(course.price) }}
                  </span>
                </li>
                <li
                  class="flex items-start justify-between gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                >
                  <span class="text-sm text-gray-500">Kuota Peserta</span>
                  <span class="text-right font-medium text-gray-900">
                    Maks. {{ course.maxStudents }} orang
                  </span>
                </li>
                <li
                  class="flex items-start justify-between gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                >
                  <span class="text-sm text-gray-500">Platform</span>
                  <div
                    class="flex items-center gap-2 text-right font-medium text-gray-900"
                  >
                    <Icon
                      name="logos:zoom-icon"
                      class="size-4"
                    />
                    Zoom Meeting
                  </div>
                </li>
              </ul>
            </div>

            <div class="rounded-2xl bg-gray-50 p-6">
              <h3 class="mb-2 font-bold text-gray-900">Butuh Bantuan?</h3>
              <p class="mb-4 text-sm text-gray-600">
                Jika kamu memiliki pertanyaan seputar program ini, jangan ragu
                untuk menghubungi kami.
              </p>
              <NuxtLink
                :href="`https://wa.me/${config.public.phoneNumber}`"
                target="_blank"
                class="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                <Icon
                  name="logos:whatsapp-icon"
                  class="size-4"
                />
                Hubungi Admin
              </NuxtLink>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </main>
</template>
