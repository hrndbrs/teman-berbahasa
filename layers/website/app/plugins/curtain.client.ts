export default defineNuxtPlugin((nuxtApp) => {
  const { reveal } = usePageCurtain();

  nuxtApp.hook('page:finish', () => {
    requestAnimationFrame(() => requestAnimationFrame(reveal));
  });
});
