export default defineNuxtPlugin(async () => {
  const token = useAuthToken();
  if (!token.get('ACCESS')) return;

  const { validateSession } = useAuth();

  try {
    await validateSession();
  } catch (err) {
    if (err instanceof ApiError && err.status === 401) {
      token.clear();
    }
  }
});
