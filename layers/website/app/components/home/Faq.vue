<script setup lang="ts">
const { items } = defineProps<{ items: FaqItem[] }>();

const accordionItems = computed(() =>
  items.map((item) => ({
    label: item.question,
    content: item.answer,
  }))
);
</script>

<template>
  <section class="border-rule py-section shell:px-gutter border-t px-5">
    <div
      v-reveal
      class="gap-flow shell:grid-cols-minor grid grid-cols-1 items-start *:min-w-0"
    >
      <div>
        <h2
          v-words
          class="font-display text-headline mb-4 font-normal"
        >
          Tanya jawab
        </h2>
        <p
          class="leading-copy text-paper/60 m-0 max-w-[36ch] text-sm text-pretty"
        >
          Masih ragu atau punya pertanyaan seputar Teman Berbahasa? Temukan
          jawabannya di sini atau hubungi kami langsung.
        </p>
      </div>

      <UAccordion
        :items="accordionItems"
        trailing-icon="i-lucide-plus"
        :ui="{
          item: 'border-b border-rule-bright first:border-t',
          trigger:
            'group flex-1 flex items-center gap-5 py-4 text-sm font-medium text-paper transition-colors duration-150 ease-out hover:text-lilac',
          trailingIcon:
            'shrink-0 size-4 ms-auto text-lilac transition-transform duration-200 ease-out group-data-[state=open]:rotate-45',
          body: 'pb-4.5 pr-8 text-sm leading-copy text-pretty text-paper/65',
        }"
      />
    </div>
  </section>
</template>
