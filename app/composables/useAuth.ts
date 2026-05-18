import type {
  AuthState,
  LoginPayload,
  AuthResponse,
  UserRole,
} from '#shared/types/auth';

const initialState = (): AuthState => ({ user: null, accessToken: null });

export const useAuth = () => {
  const state = useState<AuthState>('auth', initialState);
  const config = useRuntimeConfig();

  const user = computed(() => state.value.user);
  const accessToken = computed(() => state.value.accessToken);
  const isAuthenticated = computed(() => !!state.value.accessToken);
  const role = computed(() => state.value.user?.role ?? null);

  const can = (roles: UserRole[]) =>
    computed(() => !!role.value && roles.includes(role.value));

  const setAuth = (response: AuthResponse) => {
    state.value = { user: response.user, accessToken: response.accessToken };
  };

  const clearAuth = () => {
    state.value = initialState();
  };

  const login = async (payload: LoginPayload) => {
    const response = await $fetch<AuthResponse>('/auth/login', {
      baseURL: config.public.apiBaseUrl,
      method: 'POST',
      body: payload,
      credentials: 'include',
    });
    setAuth(response);
    return response;
  };

  const logout = async () => {
    await $fetch('/auth/logout', {
      baseURL: config.public.apiBaseUrl,
      method: 'POST',
      credentials: 'include',
      headers: accessToken.value
        ? { Authorization: `Bearer ${accessToken.value}` }
        : {},
    }).catch(() => {});
    clearAuth();
  };

  const refresh = async (): Promise<string | null> => {
    try {
      const response = await $fetch<AuthResponse>('/auth/refresh', {
        baseURL: config.public.apiBaseUrl,
        method: 'POST',
        credentials: 'include',
      });
      setAuth(response);
      return response.accessToken;
    } catch {
      clearAuth();
      return null;
    }
  };

  const userInitials = computed(() => {
    if (!user.value?.name) return 'U';
    return user.value.name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  });

  return {
    user,
    accessToken,
    isAuthenticated,
    role,
    can,
    userInitials,
    login,
    logout,
    refresh,
    setAuth,
    clearAuth,
  };
};
