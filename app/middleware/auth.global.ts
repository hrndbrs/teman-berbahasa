type AreaConfig = {
  prefix: RegExp;
  authPrefix: RegExp;
  home: string;
  login: string;
};

const AREAS: Record<AuthArea, AreaConfig> = {
  dashboard: {
    prefix: /^\/dashboard(\/|$)/,
    authPrefix: /^\/dashboard\/auth(\/|$)/,
    home: '/dashboard',
    login: '/dashboard/auth/login',
  },
  lms: {
    prefix: /^\/lms(\/|$)/,
    authPrefix: /^\/lms\/auth(\/|$)/,
    home: '/lms',
    login: '/lms/auth/login',
  },
};

export default defineNuxtRouteMiddleware((to) => {
  if (!import.meta.client) return;

  const entry = (Object.entries(AREAS) as [AuthArea, AreaConfig][]).find(
    ([, cfg]) => cfg.prefix.test(to.path)
  );
  if (!entry) return;

  const [area, cfg] = entry;
  const { isAuthenticated } = useAuth(area);
  const isAuthPage = cfg.authPrefix.test(to.path);

  if (!isAuthPage && !isAuthenticated.value) {
    return navigateTo({ path: cfg.login, query: { redirect: to.fullPath } });
  }

  if (isAuthPage && isAuthenticated.value) {
    return navigateTo(cfg.home);
  }
});
