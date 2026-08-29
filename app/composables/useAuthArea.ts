export const useAuthArea = (path?: string): AuthArea => {
  const resolved = path ?? useRoute().path;
  return resolved.startsWith('/lms') ? 'lms' : 'dashboard';
};
