<script setup lang="ts">
defineOptions({ inheritAttrs: false });

type Tone =
  'paper' | 'cobalt' | 'outline' | 'outline-lilac' | 'link' | 'link-muted';

const { tone = 'paper', size = 'md' } = defineProps<{
  tone?: Tone;
  size?: 'md' | 'lg';
}>();

const BASE =
  'rounded-none! font-medium uppercase inline-flex items-center justify-center gap-2 tracking-label text-xs active:scale-98 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt disabled:opacity-50 disabled:pointer-events-none motion-reduce:transition-none';
const SWEEP =
  'bg-[length:220%_100%] bg-right hover:bg-left transition-[background-position,color] duration-300 ease-out';
const FADE = 'transition-colors duration-150 ease-out';

const TONE: Record<Tone, string> = {
  paper: `text-ink hover:text-paper bg-[linear-gradient(90deg,var(--color-cobalt)_50%,var(--color-paper)_50%)] ${SWEEP}`,
  cobalt: `text-paper hover:text-ink bg-[linear-gradient(90deg,var(--color-paper)_50%,var(--color-cobalt)_50%)] ${SWEEP}`,
  'outline-lilac': `ring-1 ring-inset ring-lilac text-paper bg-[linear-gradient(90deg,var(--color-cobalt)_50%,transparent_50%)] ${SWEEP}`,
  outline: `ring-1 ring-inset ring-rule-strong text-paper bg-transparent hover:ring-paper ${FADE}`,
  link: `text-lilac hover:text-lilac/80 ${FADE}`,
  'link-muted': `text-dim hover:text-paper ${FADE}`,
};

const isLink = computed(() => tone === 'link' || tone === 'link-muted');

const SIZE = computed(() => {
  if (isLink.value) return 'p-0';
  return size === 'lg' ? 'px-8 py-4.5' : 'px-5 py-3';
});
</script>

<template>
  <UButton
    v-bind="$attrs"
    color="neutral"
    variant="link"
    :class="[BASE, TONE[tone], SIZE]"
  >
    <slot />
  </UButton>
</template>
