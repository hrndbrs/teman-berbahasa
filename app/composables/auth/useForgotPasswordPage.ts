import type { FormSubmitEvent } from '@nuxt/ui';

export function useForgotPasswordPage() {
  const { forgotPassword } = useAuth();

  const state = reactive<Partial<ForgotPasswordSchema>>({ email: '' });
  const loading = ref(false);
  const serverError = ref('');
  const sent = ref(false);

  async function onSubmit(event: FormSubmitEvent<ForgotPasswordSchema>) {
    loading.value = true;
    serverError.value = '';

    try {
      await forgotPassword(event.data.email);
      sent.value = true;
    } catch {
      serverError.value = 'Terjadi kesalahan. Coba lagi.';
    } finally {
      loading.value = false;
    }
  }

  return { state, loading, serverError, sent, onSubmit };
}
