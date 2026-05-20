import type { FormSubmitEvent } from '@nuxt/ui';

export function useResetPasswordPage() {
  const { resetPassword } = useAuth();
  const route = useRoute();

  const token = route.query.token as string | undefined;
  const state = reactive<Partial<ResetPasswordSchema>>({
    password: '',
    confirm: '',
  });
  const loading = ref(false);
  const serverError = ref('');
  const done = ref(false);

  async function onSubmit(event: FormSubmitEvent<ResetPasswordSchema>) {
    loading.value = true;
    serverError.value = '';

    try {
      await resetPassword(token!, event.data.password);
      done.value = true;
    } catch (err: unknown) {
      if (
        err instanceof ApiError &&
        (err.status === 400 || err.status === 422)
      ) {
        serverError.value = 'Link reset tidak valid atau sudah kedaluwarsa';
      } else {
        serverError.value = 'Terjadi kesalahan. Coba lagi.';
      }
    } finally {
      loading.value = false;
    }
  }

  return { token, state, loading, serverError, done, onSubmit };
}
