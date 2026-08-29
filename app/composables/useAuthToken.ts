type AuthTokenType = 'ACCESS' | 'REFRESH';

export const useAuthToken = (area?: AuthArea) => {
  const scope = area ?? useAuthArea();
  const storageKeys: Record<AuthTokenType, string> = {
    ACCESS: `tb:${scope}:access_token`,
    REFRESH: `tb:${scope}:refresh_token`,
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
