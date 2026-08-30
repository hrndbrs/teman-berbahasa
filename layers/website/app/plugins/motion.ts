import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type MotionEl = HTMLElement & { _motionKill?: () => void };

export default defineNuxtPlugin((nuxtApp) => {
  const app = nuxtApp.vueApp;

  if (!import.meta.client) {
    for (const name of ['reveal', 'words', 'wipe', 'parallax', 'rise']) {
      app.directive(name, {});
    }
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ONCE = 'play none none none';

  const track = (el: MotionEl, kill: () => void) => {
    el._motionKill = kill;
  };

  const unmounted = (el: MotionEl) => {
    el._motionKill?.();
    el._motionKill = undefined;
    gsap.killTweensOf(el);
  };

  const killTween = (
    el: MotionEl,
    tween: gsap.core.Tween,
    targets: unknown
  ) => {
    track(el, () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.killTweensOf(targets as gsap.TweenTarget);
    });
  };

  app.directive('reveal', {
    mounted(el: MotionEl) {
      if (reduce) return;
      const tween = gsap.from(el, {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 92%', toggleActions: ONCE },
      });
      killTween(el, tween, el);
    },
    unmounted,
  });

  app.directive('words', {
    mounted(el: MotionEl) {
      const words = (el.textContent ?? '').trim().split(/\s+/);
      el.textContent = '';
      const spans = words.map((word, i) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.setAttribute('data-word', '');
        span.style.display = 'inline-block';
        el.appendChild(span);
        if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
        return span;
      });
      if (reduce) return;
      const tween = gsap.from(spans, {
        opacity: 0.06,
        yPercent: 55,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.055,
        scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: ONCE },
      });
      killTween(el, tween, spans);
    },
    unmounted,
  });

  app.directive('wipe', {
    mounted(el: MotionEl) {
      if (reduce) return;
      const tween = gsap.from(el, {
        clipPath: 'inset(0 0 100% 0)',
        scale: 1.08,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 94%', toggleActions: ONCE },
      });
      killTween(el, tween, el);
    },
    unmounted,
  });

  app.directive('parallax', {
    mounted(el: MotionEl, binding) {
      if (reduce) return;
      const amount = typeof binding.value === 'number' ? binding.value : 90;
      const tween = gsap.to(el, {
        y: amount,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement ?? el,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
      killTween(el, tween, el);
    },
    unmounted,
  });

  app.directive('rise', {
    mounted(el: MotionEl, binding) {
      if (reduce) return;
      const delay = typeof binding.value === 'number' ? binding.value : 0;
      gsap.fromTo(
        el,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay }
      );
    },
    unmounted,
  });

  const refresh = () => {
    requestAnimationFrame(() => ScrollTrigger.refresh());
  };
  nuxtApp.hook('page:finish', refresh);
  nuxtApp.hook('page:transition:finish', refresh);
});
