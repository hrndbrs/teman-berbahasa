<script setup lang="ts">
definePageMeta({ pageTransition: { name: 'page', mode: 'out-in' } });

const { program, whatsappUrl } = useCoursePage();
</script>

<template>
  <main
    class="screen pb-section pt-page shell:px-gutter px-5"
    data-screen-label="Detail Program"
  >
    <SiteButton
      to="/courses"
      tone="link"
      class="mb-flow"
    >
      ← Semua program
    </SiteButton>

    <p class="text-eyebrow tracking-eyebrow text-muted mb-4 uppercase">
      {{ program.num }} · {{ program.kind }}
    </p>
    <h1
      v-words
      class="font-display text-title mb-8 max-w-[16ch] font-normal text-pretty"
    >
      {{ program.title }}
    </h1>

    <div
      v-reveal
      class="gap-flow shell:grid-cols-major grid grid-cols-1 items-start *:min-w-0"
    >
      <div>
        <p class="mb-flow text-lead text-paper/75 max-w-[60ch] text-pretty">
          {{ program.desc }}
        </p>

        <h2 class="font-display text-subhead mb-5 font-normal">
          Jadwal tersedia
        </h2>
        <div class="border-rule-bright max-w-2xl border-t">
          <div
            v-for="schedule in program.schedules"
            :key="schedule.id"
            class="border-rule-bright border-b py-6"
          >
            <div
              class="text-eyebrow tracking-eyebrow mb-4 flex items-baseline justify-between gap-5 uppercase"
            >
              <span>{{ schedule.label }}</span>
              <span :class="schedule.open ? 'text-lilac' : 'text-faint'">
                {{ schedule.open ? 'Buka' : 'Tutup' }}
              </span>
            </div>
            <dl
              class="mb-5 grid grid-cols-3 gap-x-5 gap-y-3.5 max-sm:grid-cols-1"
            >
              <div>
                <dt
                  class="text-eyebrow tracking-label text-muted mb-1.5 uppercase"
                >
                  Hari
                </dt>
                <dd class="m-0 text-sm font-medium">{{ schedule.days }}</dd>
              </div>
              <div>
                <dt
                  class="text-eyebrow tracking-label text-muted mb-1.5 uppercase"
                >
                  Waktu
                </dt>
                <dd class="m-0 text-sm font-medium">{{ schedule.time }}</dd>
              </div>
              <div>
                <dt
                  class="text-eyebrow tracking-label text-muted mb-1.5 uppercase"
                >
                  Mulai
                </dt>
                <dd class="m-0 text-sm font-medium">{{ schedule.start }}</dd>
              </div>
            </dl>
            <SiteButton
              v-if="schedule.open"
              :to="schedule.registrationUrl"
              target="_blank"
              rel="noopener"
              tone="outline-lilac"
              block
              trailing-icon="i-lucide-arrow-right"
              class="w-full justify-between!"
            >
              Daftar {{ schedule.label }}
            </SiteButton>
            <div
              v-else
              class="border-rule tracking-label text-faint flex items-center justify-between gap-4 border px-5 py-3.5 text-xs uppercase"
            >
              <span>Pendaftaran tutup</span>
              <span aria-hidden="true">·</span>
            </div>
          </div>
        </div>
      </div>

      <aside>
        <div class="relative mb-6 aspect-3/4 w-full overflow-hidden">
          <NuxtImg
            :src="program.image"
            :alt="program.imageAlt"
            width="600"
            height="800"
            sizes="sm:100vw lg:400px"
            loading="lazy"
            class="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <p class="font-display text-subhead text-lilac mb-1.5">
          {{ program.price }}
        </p>
        <p class="text-eyebrow tracking-label text-muted mb-5 uppercase">
          Biaya program · Zoom Meeting
        </p>
        <SiteButton
          :to="whatsappUrl"
          target="_blank"
          rel="noopener"
          tone="cobalt"
          block
          class="w-full"
        >
          Hubungi admin
        </SiteButton>
      </aside>
    </div>
  </main>
</template>
