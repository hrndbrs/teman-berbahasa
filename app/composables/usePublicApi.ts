
export const usePublicApi = () => {
  const { public: { apiBaseUrl } } = useRuntimeConfig();
  return $fetch.create({
    baseURL: apiBaseUrl,
    credentials: 'include',
    onResponseError({ response }) {
      const data = response._data as ApiErrorResponse | undefined;
      throw new ApiError(response.status, data?.error?.code as ApiError['code'], data?.error?.fields);
    },
  });
};
