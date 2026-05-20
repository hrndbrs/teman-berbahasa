type AuthTokenType = 'ACCESS' | 'REFRESH';

export const useAuthToken = () => {
  const storageKeys: Record<AuthTokenType, string> = {
    ACCESS: 'access_token',
    REFRESH: 'refresh_token',
  } as const;

  function get(type: AuthTokenType): string | null {
    return localStorage.getItem(storageKeys[type]);
  }

  function set(type: AuthTokenType, newToken: string): void {
    localStorage.setItem(storageKeys[type], newToken);
  }

  function clear(): void {
    localStorage.removeItem(storageKeys.ACCESS);
    localStorage.removeItem(storageKeys.REFRESH);
  }

  return { get, set, clear };
};
