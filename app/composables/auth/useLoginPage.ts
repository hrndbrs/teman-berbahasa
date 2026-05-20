import type { FormSubmitEvent } from '@nuxt/ui';

export function useLoginPage() {
  const { login } = useAuth();
  const route = useRoute();

  const state = reactive<Partial<LoginSchema>>({ email: '', password: '' });
  const loading = ref(false);
  const serverError = ref('');

  async function onSubmit(event: FormSubmitEvent<LoginSchema>) {
    loading.value = true;
    serverError.value = '';

    try {
      await login({ email: event.data.email, password: event.data.password });
      const redirect = route.query.redirect as string | undefined;
      await navigateTo(redirect || '/dashboard');
    } catch (err: unknown) {
      if (err instanceof ApiError && err.status === 401) {
        serverError.value =
          err.code === ApiError.Code.ACCOUNT_LOCKED
            ? 'Akun dikunci karena terlalu banyak percobaan login'
            : 'Email atau password salah';
      } else {
        serverError.value = 'Terjadi kesalahan. Coba lagi.';
      }
    } finally {
      loading.value = false;
    }
  }

  return { state, loading, serverError, onSubmit };
}
