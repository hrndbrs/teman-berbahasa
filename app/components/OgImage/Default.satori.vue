<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <div
    class="relative flex h-full w-full overflow-hidden bg-stone-100 p-18 text-stone-900"
  >
    <div
      class="absolute -top-40 -right-40 size-160 rounded-full border border-blue-500/20"
    />

    <div
      class="absolute top-16 right-16 size-96 rounded-full border border-blue-400/10"
    />

    <div class="absolute top-32 right-32 size-64 rounded-full bg-blue-600/10" />

    <div class="absolute right-0 bottom-0 h-px w-2/3 bg-stone-700" />

    <div class="absolute right-0 bottom-0 h-2/3 w-px bg-stone-700" />

    <div class="absolute bottom-0 left-0 h-1.5 w-32 bg-blue-600" />

    <div class="relative flex size-full flex-col">
      <div class="flex flex-1 items-center">
        <div class="flex w-full items-center gap-16">
          <div class="flex min-w-0 flex-1 flex-col">
            <h1
              class="m-0 max-w-4xl font-sans text-6xl leading-tight font-bold tracking-tight text-stone-900"
            >
              {{ title }}
            </h1>

            <p
              v-if="description"
              class="mt-7 max-w-3xl font-sans text-lg leading-relaxed text-stone-600"
            >
              {{ description }}
            </p>
          </div>

          <div class="flex w-2/5 shrink-0 items-center justify-center">
            <div class="relative flex h-80 w-80 items-center justify-center">
              <div
                class="absolute inset-0 rounded-full border border-blue-500/20"
              />

              <div
                class="absolute inset-10 rounded-full border border-blue-400/15"
              />

              <div class="absolute inset-20 rounded-full bg-blue-600/10" />

              <img
                src="/assets/logo-horizontal.png"
                alt=""
                class="relative w-72"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end">
        <span class="font-sans text-sm tracking-widest text-blue-500 uppercase">
          Bahasa · Budaya · Cerita
        </span>
      </div>
    </div>
  </div>
</template>
