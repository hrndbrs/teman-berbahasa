export default defineNuxtPlugin(async () => {
  const { isAuthenticated, refresh } = useAuth();

  if (!isAuthenticated.value) {
    await refresh();
  }
});
