export default defineNuxtPlugin(async () => {
  const token = useAuthToken('dashboard');
  if (!token.get('ACCESS')) return;

  const { validateSession } = useAuth('dashboard');

  try {
    await validateSession();
  } catch (err) {
    if (err instanceof ApiError && err.status === 401) {
      token.clear();
    }
  }
});
