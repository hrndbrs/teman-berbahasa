<script setup lang="ts">
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from 'reka-ui';
import { faqs } from '#shared/data/faq';

const config = useRuntimeConfig();
const sectionRef = useTemplateRef('sectionRef');
const headerRef = useTemplateRef('headerRef');
const activeValue = ref<string | undefined>(undefined);

const whatsappUrl = computed(() =>
  config.public.phoneNumber ? `https://wa.me/${config.public.phoneNumber}` : ''
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
        <!-- Header -->
        <div
          ref="headerRef"
          class="max-w-md"
        >
          <h2
            id="faq-heading"
            class="mb-6 text-3xl font-bold leading-tight text-gray-900 md:text-4xl"
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
            class="mt-8 inline-flex items-center gap-2 rounded-md bg-tb-blue-3 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-800"
          >
            <Icon
              name="lucide:message-circle"
              class="size-4"
              aria-hidden="true"
            />
            Hubungi Kami
          </NuxtLink>
        </div>

        <!-- Accordion -->
        <AccordionRoot
          v-model="activeValue"
          type="single"
          collapsible
          class="space-y-4"
        >
          <AccordionItem
            v-for="(faq, index) in faqs"
            :key="index"
            :value="`item-${index}`"
            class="overflow-hidden rounded-xl border border-gray-200 bg-white"
          >
            <AccordionHeader>
              <AccordionTrigger
                class="tb-accordion-trigger group flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition hover:bg-gray-50"
              >
                <span class="font-bold text-gray-900">{{ faq.question }}</span>
                <Icon
                  :name="
                    activeValue === `item-${index}` ? 'lucide:minus' : 'lucide:plus'
                  "
                  class="size-5 shrink-0 text-gray-500 transition-transform duration-300"
                  :class="{ 'rotate-180': activeValue === `item-${index}` }"
                  aria-hidden="true"
                />
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent
              class="tb-accordion-content overflow-hidden border-t border-gray-100 bg-gray-50/50 text-sm leading-relaxed text-gray-600"
            >
              <div class="px-6 py-4">
                {{ faq.answer }}
              </div>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>
      </div>
    </div>
  </section>
</template>

<style scoped>
@media (prefers-reduced-motion: reduce) {
  :deep(.tb-accordion-content) {
    animation: none !important;
  }
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
