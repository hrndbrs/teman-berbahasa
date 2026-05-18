import type { FetchOptions } from 'ofetch';

let refreshPromise: Promise<string | null> | null = null;

export const useApi = () => {
  const config = useRuntimeConfig();
  const { accessToken, refresh, clearAuth } = useAuth();
  const router = useRouter();

  const apiFetch = $fetch.create({
    baseURL: config.public.apiBaseUrl,
    credentials: 'include',
    onRequest({ options }) {
      const token = accessToken.value;
      if (token) {
        (options.headers as Record<string, string>).Authorization =
          `Bearer ${token}`;
      }
    },
    async onResponseError({ response, options, request }) {
      if (response.status !== 401) return;

      if (!refreshPromise) {
        refreshPromise = refresh().finally(() => {
          refreshPromise = null;
        });
      }

      const newToken = await refreshPromise;

      if (!newToken) {
        clearAuth();
        await router.push('/login');
        return;
      }

      (options.headers as Record<string, string>).Authorization =
        `Bearer ${newToken}`;
      return $fetch(request as string, options as FetchOptions);
    },
  });

  return { apiFetch };
};
