<script setup lang="ts">
const { whatsappUrl } = useContact();

useSchemaOrg([
  {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  },
]);

const sectionRef = useTemplateRef('sectionRef');
const headerRef = useTemplateRef('headerRef');
const activeValue = ref<string>();

const items = computed(() =>
  faqs.map((faq, index) => ({
    value: `item-${index}`,
    label: faq.question,
    content: faq.answer,
  }))
);

useGSAP(
  () => {
    if (!sectionRef.value || !headerRef.value) return;

    gsap.from(headerRef.value, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  },
  { scope: sectionRef }
);
</script>

<template>
  <section
    id="faq"
    ref="sectionRef"
    aria-labelledby="faq-heading"
    class="bg-gray-50 py-20"
  >
    <div class="container px-6">
      <div class="grid gap-12 lg:grid-cols-[1fr_2fr]">
        <div
          ref="headerRef"
          class="max-w-md"
        >
          <h2
            id="faq-heading"
            class="mb-6 text-3xl leading-tight font-bold text-gray-900 md:text-4xl"
          >
            Frequently Asked Questions
          </h2>
          <p class="text-sm leading-relaxed text-gray-600">
            Masih ragu atau punya pertanyaan seputar Teman Berbahasa? Temukan
            jawabannya di sini atau hubungi kami langsung.
          </p>

          <NuxtLink
            v-if="whatsappUrl"
            :to="whatsappUrl"
            target="_blank"
            class="bg-tb-blue-3 mt-8 inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-800"
          >
            <Icon
              name="lucide:message-circle"
              class="size-4"
              aria-hidden="true"
            />
            Hubungi Kami
          </NuxtLink>
        </div>

        <UAccordion
          v-model="activeValue"
          :items="items"
          :ui="{
            root: 'space-y-4',
            item: 'overflow-hidden rounded-xl border border-gray-200 bg-white',
            trigger:
              'w-full items-center justify-between gap-4 px-6 py-4 text-left text-base font-bold text-gray-900 transition hover:bg-gray-50',
            label: 'flex-1',
            content:
              'border-t border-gray-100 bg-gray-50/50 text-sm leading-relaxed text-gray-600',
            body: 'px-6 py-4',
            trailingIcon: 'hidden',
          }"
        >
          <template #trailing="{ open }">
            <Icon
              :name="open ? 'lucide:minus' : 'lucide:plus'"
              class="size-5 shrink-0 text-gray-500"
              aria-hidden="true"
            />
          </template>
        </UAccordion>
      </div>
    </div>
  </section>
</template>
