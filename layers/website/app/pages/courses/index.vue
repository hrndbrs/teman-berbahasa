<script setup lang="ts">
definePageMeta({ pageTransition: { name: 'page', mode: 'out-in' } });

const { programs } = useCourseListPage();
const { whatsappUrl } = useContact();

const PER_PAGE = 4;
const query = ref('');
const page = ref(1);

const matched = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return programs;
  return programs.filter((program) =>
    `${program.title} ${program.kind}`.toLowerCase().includes(q)
  );
});

const totalPages = computed(() =>
  Math.max(1, Math.ceil(matched.value.length / PER_PAGE))
);

const visible = computed(() => {
  const start = (Math.min(page.value, totalPages.value) - 1) * PER_PAGE;
  return matched.value.slice(start, start + PER_PAGE);
});

const resultLabel = computed(() => {
  const n = matched.value.length;
  return query.value.trim()
    ? `${n} hasil untuk “${query.value.trim()}”`
    : `${n} program`;
});

watch(query, () => {
  page.value = 1;
});
</script>

<template>
  <main
    class="screen pb-section pt-page shell:px-gutter relative px-5"
    data-screen-label="Program Belajar"
  >
    <div
      class="mb-flow border-rule-bright text-eyebrow tracking-eyebrow flex items-baseline justify-between gap-5 border-b pb-3.5 uppercase"
    >
      <span class="text-lilac">Program belajar</span>
    </div>

    <h1
      v-words
      class="font-display text-title mb-6 max-w-[18ch] font-normal text-pretty"
    >
      Semua program.
    </h1>

    <div class="mb-flow flex flex-wrap items-end justify-between gap-6">
      <p class="text-lead text-paper/65 m-0 max-w-[44ch] text-pretty">
        Temukan cara belajar yang sesuai dengan langkahmu. Dari mulai mengenal
        bahasa hingga membawanya lebih jauh, pilih program yang ingin kamu
        jelajahi.
      </p>
      <UInput
        v-if="programs.length"
        v-model="query"
        icon="i-lucide-search"
        variant="none"
        placeholder="Cari nama program"
        aria-label="Cari nama program"
        :ui="{
          root: 'w-full sm:w-auto sm:min-w-75',
          base: 'py-2 text-sm text-paper placeholder:text-muted',
        }"
      />
    </div>

    <SiteEmpty v-if="!programs.length">
      <template #heading>
        Belum ada angkatan yang
        <em>dibuka</em>.
      </template>
      <template #body>
        Angkatan baru dibuka secara berkala. Hubungi admin supaya kamu tahu
        lebih dulu, atau ikuti mini course sambil menunggu.
      </template>
      <template #action>
        <SiteButton
          :to="whatsappUrl"
          target="_blank"
          rel="noopener"
          tone="outline"
        >
          Hubungi admin
        </SiteButton>
        <SiteButton
          to="/events"
          tone="link"
        >
          Lihat mini course
        </SiteButton>
      </template>
    </SiteEmpty>

    <div
      v-if="programs.length"
      class="border-rule-bright text-eyebrow tracking-eyebrow text-muted mb-2 flex items-baseline justify-between gap-5 border-t pt-3 uppercase"
    >
      <span>{{ resultLabel }}</span>
      <span>Halaman {{ Math.min(page, totalPages) }} / {{ totalPages }}</span>
    </div>

    <TransitionGroup
      appear
      tag="div"
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-2.5 opacity-0"
      appear-active-class="transition duration-200 ease-out"
      appear-from-class="translate-y-2.5 opacity-0"
      leave-active-class="absolute w-full transition-opacity duration-100 ease-out"
      leave-to-class="opacity-0"
    >
      <article
        v-for="program in visible"
        :key="program.id"
        class="border-rule-bright py-flow border-b"
      >
        <div
          class="gap-flow shell:grid-cols-major grid grid-cols-1 items-start *:min-w-0"
        >
          <div>
            <div class="mb-3 flex items-baseline justify-between gap-5">
              <span class="text-eyebrow tracking-label text-muted uppercase">
                {{ program.num }} · {{ program.kind }}
              </span>
              <span class="font-display text-lilac text-2xl whitespace-nowrap">
                {{ program.price }}
              </span>
            </div>
            <h2 class="font-display text-headline mb-4 font-normal text-pretty">
              {{ program.title }}
            </h2>
            <p
              class="leading-copy text-paper/65 mb-5 max-w-[60ch] text-sm text-pretty"
            >
              {{ program.desc }}
            </p>
            <div
              class="flex flex-wrap gap-2.5 max-sm:flex-col max-sm:items-stretch"
            >
              <SiteButton :to="`/courses/${program.slug}`"
                >Lihat detail</SiteButton
              >
              <SiteButton
                :to="whatsappUrl"
                target="_blank"
                rel="noopener"
                tone="outline"
              >
                Daftar
              </SiteButton>
            </div>
          </div>
          <div>
            <div class="relative mb-4 aspect-4/5 w-full overflow-hidden">
              <NuxtImg
                :src="program.image"
                :alt="program.imageAlt"
                width="640"
                height="800"
                sizes="sm:100vw lg:440px"
                loading="lazy"
                class="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div class="flex flex-col">
              <span
                v-for="fact in program.facts"
                :key="fact"
                class="border-rule text-eyebrow text-muted border-b py-2 tracking-widest uppercase"
              >
                {{ fact }}
              </span>
            </div>
          </div>
        </div>
      </article>
    </TransitionGroup>

    <p
      v-if="programs.length && matched.length === 0"
      class="mt-flow leading-copy text-muted text-sm"
    >
      Tidak ada program dengan nama itu. Coba kata kunci lain.
    </p>

    <UPagination
      v-if="totalPages > 1"
      v-model:page="page"
      :total="matched.length"
      :items-per-page="PER_PAGE"
      :sibling-count="1"
      color="neutral"
      variant="outline"
      active-color="neutral"
      active-variant="solid"
      :ui="{ list: 'flex flex-wrap items-center gap-1.5' }"
      class="border-rule-bright mt-8 border-t pt-4"
    />
  </main>
</template>
