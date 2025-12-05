<script setup lang="ts">
const config = useRuntimeConfig();
</script>

<template>
  <section
    class="container flex min-h-dvh flex-col-reverse justify-end gap-16 bg-white px-6 pt-24 pb-12 sm:flex-row sm:justify-between sm:gap-8"
  >
    <!-- Left Content -->
    <div class="flex flex-col justify-end sm:flex-1">
      <!-- Japanese Characters -->
      <h1
        class="text-[8.75rem] leading-none font-bold tracking-tight text-[#4D4D4D] md:text-[17.25rem]"
      >
        <span id="tomo"> 友 </span>
        <span id="dachi"> 達 </span>
      </h1>
    </div>

    <!-- Right Content -->
    <div class="flex flex-col items-end gap-8 self-end sm:gap-25 md:max-w-xs">
      <!-- Hero Image -->
      <div class="w-1/2 overflow-hidden sm:w-full">
        <NuxtImg
          src="https://images.unsplash.com/photo-1574236170880-fbbca132d83d?q=80&w=926&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Japanese temple with Mt. Fuji"
          class="w-full object-cover"
          loading="eager"
        />
      </div>
      <a
        :href="`https://instagram.com/${config.public.instagramHandle}`"
        target="_blank"
        class="text-sm text-gray-600 transition hover:text-tb-blue-3"
      >
        @{{ config.public.instagramHandle }}
      </a>
    </div>
  </section>
</template>
