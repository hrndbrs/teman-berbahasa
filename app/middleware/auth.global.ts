const dashboardPattern = /^\/dashboard/;
const authPages = ['/login', '/forgot-password', '/reset-password'];
const adminOnlyRoutes = ['/dashboard/users'];

export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated, role } = useAuth();

  const isDashboard = dashboardPattern.test(to.path);
  const isAuthPage = authPages.includes(to.path);

  if (isDashboard && !isAuthenticated.value) {
    return navigateTo({ path: '/login', query: { redirect: to.fullPath } });
  }

  if (isAuthPage && isAuthenticated.value) {
    return navigateTo('/dashboard');
  }

  if (adminOnlyRoutes.includes(to.path) && role.value !== 'admin') {
    return navigateTo('/dashboard');
  }
});
