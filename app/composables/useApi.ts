const RETRY_SENTINEL = Symbol('retry');

export const useApi = () => {
  const token = useAuthToken();
  const {
    public: { apiBaseUrl },
  } = useRuntimeConfig();

  const api = $fetch.create({
    baseURL: apiBaseUrl,
    onRequest({ options }) {
      const accessToken = token.get('ACCESS');
      if (accessToken) {
        options.headers.set('Authorization', `Bearer ${accessToken}`);
      }
    },

    async onResponseError({ response }) {
      const refreshToken = token.get('REFRESH');

      if (response.status === 401 && refreshToken) {
        await refresh();
        throw RETRY_SENTINEL;
      }
    },
  });

  return async <T>(request: string, options?: Parameters<typeof api>[1]) => {
    try {
      return await api<T>(request, options);
    } catch (e) {
      if (e === RETRY_SENTINEL) {
        return await api<T>(request, options);
      }
      throw e;
    }
  };
};
