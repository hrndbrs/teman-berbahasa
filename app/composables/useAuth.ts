export const refresh = async (): Promise<string | null> => {
  const token = useAuthToken();
  const refreshToken = token.get('REFRESH');
  const { apiBaseUrl } = useRuntimeConfig().public;

  if (!refreshToken) {
    return null;
  }

  try {
    const response = await $fetch<TokenPair>('/auth/refresh', {
      baseURL: apiBaseUrl,
      method: 'POST',
      body: { refresh_token: refreshToken },
    });

    token.set('ACCESS', response.access_token);
    token.set('REFRESH', response.refresh_token);

    return response.access_token;
  } catch {
    token.clear();
    return null;
  }
};

export const useAuth = () => {
  const state = useState<AuthState>('auth', () => ({ user: null }));
  const token = useAuthToken();
  const api = useApi();

  const user = computed(() => state.value.user);
  const isAuthenticated = computed(() => !!state.value.user);
  const role = computed(() => state.value.user?.role ?? null);

  const can = (roles: UserRole[]) =>
    computed(() => !!role.value && roles.includes(role.value));

  const clearAuth = () => {
    state.value = { user: null };
    token.clear();
  };

  const login = async (payload: LoginPayload) => {
    const response = await api<LoginResponse>('/auth/login', {
      method: 'POST',
      body: payload,
    });
    token.set('ACCESS', response.access_token);
    token.set('REFRESH', response.refresh_token);
    state.value = { user: response.user };
    return response;
  };

  const logout = async () => {
    const refreshToken = token.get('REFRESH');
    if (refreshToken) {
      await api('/auth/logout', {
        method: 'POST',
        body: { refresh_token: refreshToken },
      }).catch(() => {});
    }
    clearAuth();
  };

  const validateSession = async (): Promise<boolean> => {
    const accessToken = token.get('ACCESS');

    if (!accessToken) {
      throw new ApiError(401, ApiError.Code.UNAUTHORIZED, undefined);
    }

    try {
      const user = await api<UserInfo>('/auth/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      state.value = { user };

      return true;
    } catch {
      clearAuth();
      return false;
    }
  };

  const forgotPassword = async (email: string) => {
    await api('/auth/forgot-password', {
      method: 'POST',
      body: { email },
    });
  };

  const resetPassword = async (token: string, newPassword: string) => {
    await api('/auth/reset-password', {
      method: 'POST',
      body: { token, new_password: newPassword },
    });
  };

  const userInitials = computed(() => {
    const currentUser = user.value;
    if (!currentUser) return 'U';
    return (
      `${currentUser.first_name[0] ?? ''}${currentUser.last_name[0] ?? ''}`.toUpperCase() ||
      'U'
    );
  });

  return {
    user,
    isAuthenticated,
    role,
    can,
    userInitials,
    login,
    logout,
    refresh,
    validateSession,
    forgotPassword,
    resetPassword,
    clearAuth,
  };
};
