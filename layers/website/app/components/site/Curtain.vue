<script setup lang="ts">
const { phase, meta } = usePageCurtain();
</script>

<template>
  <div
    class="curtain"
    :data-phase="phase"
    aria-hidden="true"
  >
    <div class="curtain__panel">
      <span class="curtain__ghost">{{ meta.index }}</span>
      <div class="curtain__inner">
        <div class="curtain__rule">
          <span class="curtain__label">{{ meta.label }}</span>
          <span class="curtain__index">{{ meta.index }}</span>
        </div>
        <span class="curtain__line" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.curtain {
  position: fixed;
  inset: 0;
  z-index: 100;
  overflow: hidden;
  pointer-events: none;
}

.curtain__panel {
  position: absolute;
  inset: 0;
  display: grid;
  align-content: center;
  padding: 0 clamp(1.25rem, 8vw, 8rem);
  background: var(--color-ink);
  border-top: 1px solid var(--color-cobalt);
  transform: translateY(101%);
  will-change: transform;
}
.curtain[data-phase='covering'] .curtain__panel,
.curtain[data-phase='covered'] .curtain__panel {
  transform: translateY(0);
  transition: transform 760ms var(--ease-out);
}
.curtain[data-phase='revealing'] .curtain__panel {
  transform: translateY(-101%);
  transition: transform 800ms var(--ease-out);
}

.curtain__ghost {
  position: absolute;
  height: 100%;
  inset: 0 clamp(1.25rem, 8vw, 8rem) 0 auto;
  display: flex;
  justify-items: center;
  font-family: var(--font-sans);
  font-weight: 900;
  font-size: clamp(8rem, 35vw, 12rem);
  line-height: 1;
  letter-spacing: 0.28em;
  white-space: nowrap;
  color: color-mix(in srgb, var(--color-paper) 5%, transparent);
  writing-mode: vertical-rl;
  opacity: 0;
  transform: translateY(-100%);
}
.curtain[data-phase='covering'] .curtain__ghost,
.curtain[data-phase='covered'] .curtain__ghost {
  opacity: 1;
  transform: translateY(25vh);
  transition:
    opacity 1200ms var(--ease-out) 200ms,
    transform 2000ms var(--ease-out) 200ms;
}

.curtain__inner {
  position: relative;
}

.curtain__rule {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1.25rem;
  font-family: var(--font-sans);
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}
.curtain__label {
  color: var(--color-lilac);
}
.curtain__index {
  color: var(--color-faint);
}
.curtain__label,
.curtain__index {
  display: inline-block;
  opacity: 0;
  transform: translateY(0.7em);
}
.curtain[data-phase='covering'] .curtain__label,
.curtain[data-phase='covered'] .curtain__label,
.curtain[data-phase='covering'] .curtain__index,
.curtain[data-phase='covered'] .curtain__index {
  opacity: 1;
  transform: translateY(0);
  transition:
    opacity 560ms var(--ease-out) 300ms,
    transform 560ms var(--ease-out) 300ms;
}
.curtain[data-phase='covering'] .curtain__index,
.curtain[data-phase='covered'] .curtain__index {
  transition-delay: 460ms;
}

.curtain__line {
  display: block;
  height: 1px;
  margin-top: 0.85rem;
  background: var(--color-cobalt);
  transform: scaleX(0);
  transform-origin: left;
}
.curtain[data-phase='covering'] .curtain__line,
.curtain[data-phase='covered'] .curtain__line {
  transform: scaleX(1);
  transition: transform 900ms var(--ease-out) 380ms;
}

@media (prefers-reduced-motion: reduce) {
  .curtain__panel {
    transform: none;
    opacity: 0;
  }
  .curtain[data-phase='covering'] .curtain__panel,
  .curtain[data-phase='covered'] .curtain__panel {
    opacity: 1;
    transition: opacity 180ms var(--ease-out);
  }
  .curtain[data-phase='revealing'] .curtain__panel {
    opacity: 0;
    transition: opacity 180ms var(--ease-out);
  }
  .curtain__ghost {
    display: none;
  }
  .curtain__label,
  .curtain__index,
  .curtain__line {
    opacity: 1;
    transform: none;
  }
}
</style>
