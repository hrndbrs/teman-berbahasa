import { START_LOCATION } from 'vue-router';

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (!import.meta.client) return;
  if (from === START_LOCATION || to.path === from.path) return;

  await usePageCurtain().cover(to.path);
});
