<script setup lang="ts">
import '../assets/css/main.css';
import type { NavigationMenuItem, DropdownMenuItem } from '@nuxt/ui';

const { user, role, logout } = useAuth();
useIdleSession();

const seasonMap = {
  Spring: '春',
  Summer: '夏',
  Fall: '秋',
  Winter: '冬',
} as const;

const semesterLabel = computed(() => {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  const season =
    month >= 2 && month <= 4
      ? 'Spring'
      : month >= 5 && month <= 7
        ? 'Summer'
        : month >= 8 && month <= 10
          ? 'Fall'
          : 'Winter';
  return `${season} · ${year} ${seasonMap[season]}`;
});

const workspaceNav = computed<NavigationMenuItem[]>(() => [
  { label: 'Overview', icon: 'i-lucide-house', to: '/dashboard' },
  {
    label: 'Schedule',
    icon: 'i-lucide-calendar',
    to: '/dashboard/schedules',
    badge: '17',
  },
  {
    label: 'Events',
    icon: 'i-lucide-calendar-days',
    to: '/dashboard/events',
    badge: '8',
  },
]);

const academicNav = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Students',
    icon: 'i-lucide-users',
    to: '/dashboard/students',
    badge: '24',
  },
  {
    label: 'Courses',
    icon: 'i-lucide-book-open',
    to: '/dashboard/courses',
    badge: '8',
  },
  {
    label: 'Batches',
    icon: 'i-lucide-layers',
    to: '/dashboard/batches',
    badge: '11',
  },
  {
    label: 'Enrollments',
    icon: 'i-lucide-graduation-cap',
    to: '/dashboard/enrollments',
    badge: '36',
  },
]);

const engagementNav = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Forms',
    icon: 'i-lucide-file-text',
    to: '/dashboard/forms',
    badge: '4',
  },
]);

const handleLogout = async () => {
  await logout();
  await navigateTo('/dashboard/auth/login');
};

const userMenuItems = computed<DropdownMenuItem[][]>(() => [
  [
    {
      label: 'Logout',
      icon: 'i-lucide-log-out',
      color: 'error' as const,
      onSelect: handleLogout,
    },
  ],
]);
</script>

<template>
  <UDashboardGroup unit="rem">
    <UDashboardSidebar
      collapsible
      class="dark:bg-default bg-neutral-100"
    >
      <template #header="{ collapsed }">
        <div class="flex min-w-0 items-center gap-2.5">
          <Icon
            name="svg:tb-icon"
            class="size-8 shrink-0"
          />
          <div
            v-if="!collapsed"
            class="flex min-w-0 flex-col leading-none"
          >
            <span class="text-sm font-bold tracking-tight">
              Teman Berbahasa
            </span>
            <span
              class="text-2xs tracking-looser text-dimmed font-mono uppercase"
            >
              Dashboard
            </span>
          </div>
        </div>
      </template>

      <template #default="{ collapsed }">
        <div class="flex flex-1 flex-col gap-4 py-1">
          <LayoutNavSection
            label="Workspace"
            :items="workspaceNav"
            :collapsed
          />
          <LayoutNavSection
            label="Academic"
            :items="academicNav"
            :collapsed
          />
          <LayoutNavSection
            label="Engagement"
            :items="engagementNav"
            :collapsed
          />
        </div>
      </template>

      <template #footer="{ collapsed }">
        <div class="flex w-full flex-col gap-2 pb-2">
          <p
            v-if="!collapsed"
            class="text-2xs tracking-looser text-dimmed font-mono uppercase"
          >
            {{ semesterLabel }}
          </p>

          <ClientOnly>
            <UDropdownMenu
              :items="userMenuItems"
              :side="collapsed ? 'right' : 'top'"
              :ui="{ content: 'w-48' }"
            >
              <UButton
                :avatar="{
                  src: '',
                  alt: user ? `${user.first_name} ${user.last_name}` : 'User',
                  loading: 'lazy' as const,
                  size: 'sm',
                  ui: {
                    root: 'bg-primary-100 dark:bg-primary-900/30',
                    fallback:
                      'text-primary-700 dark:text-primary-300 font-semibold',
                  },
                }"
                color="neutral"
                variant="ghost"
                class="w-full justify-start gap-3 p-0"
                :square="collapsed"
                size="sm"
                block
              >
                <template v-if="!collapsed">
                  <span class="text-left">
                    <span class="line-clamp-1 block">
                      {{
                        user ? `${user.first_name} ${user.last_name}` : 'User'
                      }}
                    </span>
                    <span class="text-dimmed line-clamp-1 block">
                      {{ role || 'UNKNOWN' }}
                    </span>
                  </span>
                </template>
              </UButton>
            </UDropdownMenu>
          </ClientOnly>
        </div>
      </template>
    </UDashboardSidebar>

    <UDashboardPanel>
      <template #header>
        <UDashboardNavbar>
          <template #leading>
            <UDashboardSidebarCollapse />
            <span
              class="text-label tracking-loose text-dimmed ml-2 font-mono uppercase"
            >
              TB / Overview
            </span>
          </template>

          <template #default>
            <UInput
              placeholder="Search students, courses, batches…"
              icon="i-lucide-search"
              size="sm"
              class="w-72"
            >
              <template #trailing>
                <UKbd>⌘K</UKbd>
              </template>
            </UInput>
          </template>

          <template #right>
            <UButton
              icon="i-lucide-bell"
              color="neutral"
              variant="ghost"
              size="sm"
            />
          </template>
        </UDashboardNavbar>
      </template>

      <template #body>
        <slot />
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>
