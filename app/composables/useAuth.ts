
const initialState = (): AuthState => ({ user: null, accessToken: null });

export const useAuth = () => {
  const state = useState<AuthState>('auth', initialState);
  const fetch = usePublicApi();

  const user = computed(() => state.value.user);
  const accessToken = computed(() => state.value.accessToken);
  const isAuthenticated = computed(() => !!state.value.accessToken);
  const role = computed(() => state.value.user?.role ?? null);

  const can = (roles: UserRole[]) =>
    computed(() => !!role.value && roles.includes(role.value));

  const clearAuth = () => {
    state.value = initialState();
  };

  const login = async (payload: LoginPayload) => {
    const response = await fetch<LoginResponse>('/auth/login', {
      method: 'POST',
      body: payload,
    });
    state.value = { user: response.user, accessToken: response.access_token };
    return response;
  };

  const logout = async () => {
    await fetch('/auth/logout', { method: 'POST' }).catch(() => {});
    clearAuth();
  };

  const refresh = async (): Promise<string | null> => {
    try {
      const response = await fetch<TokenPair>('/auth/refresh', { method: 'POST' });
      state.value = { ...state.value, accessToken: response.access_token };
      return response.access_token;
    } catch {
      clearAuth();
      return null;
    }
  };

  const forgotPassword = async (email: string) => {
    await fetch('/auth/forgot-password', {
      method: 'POST',
      body: { email },
    });
  };

  const resetPassword = async (token: string, newPassword: string) => {
    await fetch('/auth/reset-password', {
      method: 'POST',
      body: { token, new_password: newPassword },
    });
  };

  const userInitials = computed(() => {
    const u = user.value;
    if (!u) return 'U';
    return `${u.first_name[0] ?? ''}${u.last_name[0] ?? ''}`.toUpperCase() || 'U';
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
    forgotPassword,
    resetPassword,
    clearAuth,
  };
};
