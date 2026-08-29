type ApiFetchOptions = Parameters<typeof $fetch>[1] & {
  skipAuthRefresh?: boolean;
};

const RETRY_SENTINEL = Symbol('retry');

export const useApi = (area?: AuthArea) => {
  const scope = area ?? useAuthArea();
  const token = useAuthToken(scope);
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

    async onResponseError({ response, options }) {
      const refreshToken = token.get('REFRESH');
      const skipAuthRefresh =
        (options as ApiFetchOptions)?.skipAuthRefresh || false;

      if (!skipAuthRefresh && response.status === 401 && refreshToken) {
        await refresh(scope);
        throw RETRY_SENTINEL;
      }

      const body = response._data as Partial<ApiErrorResponse> | undefined;
      throw new ApiError(
        response.status,
        body?.error?.code as
          (typeof ApiError.Code)[keyof typeof ApiError.Code] | undefined,
        body?.error?.message,
        body?.error?.fields
      );
    },
  });

  return async <T>(request: string, options?: ApiFetchOptions) => {
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
