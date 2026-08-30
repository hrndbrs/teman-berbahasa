import type { RouterConfig } from '@nuxt/schema';
import { START_LOCATION } from 'vue-router';

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) return { el: to.hash, top: 96, behavior: 'smooth' };
    if (to.path === from.path) return false;
    if (from === START_LOCATION) return { top: 0, left: 0 };
    return { top: 0, left: 0, behavior: 'instant' };
  },
};
