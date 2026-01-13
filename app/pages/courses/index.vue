<script setup lang="ts">
import { courses } from '#shared/data/courses';

useSeoMeta({
  title: 'Program Belajar - Teman Berbahasa',
  description:
    'Temukan program belajar bahasa Jepang yang sesuai dengan kebutuhanmu, mulai dari kelas dasar hingga persiapan ujian JLPT.',
});
</script>

<template>
  <main class="pb-20 pt-40">
    <div class="container px-6">
      <div class="mb-12 max-w-2xl">
        <h1 class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
          Program Belajar
        </h1>
        <p class="text-lg text-gray-600">
          Tingkatkan kemampuan bahasa Jepangmu bersama tutor berpengalaman dan
          metode belajar yang interaktif.
        </p>
      </div>

      <div
        v-if="courses.length > 0"
        class="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        <article
          v-for="course in courses"
          :key="course.id"
          class="flex flex-col overflow-hidden rounded-xl border border-gray-200 transition hover:shadow-lg"
        >
          <div class="flex flex-1 flex-col p-6">
            <span
              class="mb-4 inline-block w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-tb-blue-3"
            >
              {{ course.category }}
            </span>
            <h2 class="mb-3 text-xl font-bold text-gray-900">
              {{ course.title }}
            </h2>
            <p class="mb-6 line-clamp-3 text-sm leading-relaxed text-gray-600">
              {{ course.description }}
            </p>

            <ul class="mb-8 space-y-3 text-sm text-gray-600">
              <li class="flex items-center gap-2">
                <Icon
                  name="lucide:users"
                  class="size-4 text-gray-400"
                />
                <span>Maks. {{ course.maxStudents }} orang</span>
              </li>
              <li class="flex items-center gap-2">
                <Icon
                  name="lucide:banknote"
                  class="size-4 text-gray-400"
                />
                <span class="font-semibold text-gray-900">
                  {{ formatCurrency(course.price) }}
                </span>
              </li>
            </ul>

            <div class="mt-auto">
              <NuxtLink
                :to="`/courses/${course.slug}`"
                class="inline-flex w-full items-center justify-center gap-2 rounded-md bg-tb-blue-3 px-4 py-2.5 text-center text-sm font-medium text-white transition hover:bg-blue-800"
              >
                Lihat Detail
                <Icon
                  name="lucide:arrow-right"
                  class="size-4"
                />
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>

      <div
        v-else
        class="flex min-h-[40vh] flex-col items-center justify-center text-center"
      >
        <div
          class="mb-6 flex size-20 items-center justify-center rounded-full bg-gray-50"
        >
          <Icon
            name="lucide:book-x"
            class="size-10 text-gray-400"
          />
        </div>
        <h3 class="mb-2 text-xl font-bold text-gray-900">
          Belum Ada Program Aktif
        </h3>
        <p class="max-w-md text-gray-600">
          Saat ini belum ada program belajar yang tersedia. Silakan cek kembali
          nanti atau hubungi kami untuk informasi lebih lanjut.
        </p>
      </div>
    </div>
  </main>
</template>
