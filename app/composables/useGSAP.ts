import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Ref } from 'vue';

// Register GSAP plugins
if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseGSAPOptions {
  scope?: Ref<HTMLElement | null>;
  dependencies?: Ref[];
}

interface UseGSAPReturn {
  context: Ref<gsap.Context | null>;
  contextSafe: <T extends (...args: unknown[]) => unknown>(fn: T) => T;
}

export function useGSAP(
  callback: (
    ctx: gsap.Context,
    contextSafe: <T extends (...args: unknown[]) => unknown>(fn: T) => T
  ) => void,
  options: UseGSAPOptions = {}
): UseGSAPReturn {
  const { scope, dependencies = [] } = options;
  const context = ref<gsap.Context | null>(null);

  const contextSafe = <T extends (...args: unknown[]) => unknown>(fn: T): T => {
    if (!context.value) return fn;
    return context.value.add(fn) as unknown as T;
  };

  const initGSAP = () => {
    // Clean up existing context
    if (context.value) {
      context.value.revert();
    }

    // Create new context
    context.value = gsap.context(() => {
      callback(context.value!, contextSafe);
    }, scope?.value || undefined);
  };

  onMounted(() => {
    if (import.meta.client) {
      initGSAP();
    }
  });

  // Watch for dependency changes
  if (dependencies.length > 0) {
    watch(dependencies, () => {
      if (import.meta.client) {
        initGSAP();
      }
    });
  }

  // Watch for scope changes
  if (scope) {
    watch(scope, (newScope) => {
      if (import.meta.client && newScope) {
        initGSAP();
      }
    });
  }

  onUnmounted(() => {
    if (context.value) {
      context.value.revert();
      context.value = null;
    }
  });

  // Also clean up when the effect scope is disposed (for SSR safety)
  if (getCurrentScope()) {
    onUnmounted(() => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    });
  }

  return {
    context,
    contextSafe,
  };
}

export { gsap, ScrollTrigger };
