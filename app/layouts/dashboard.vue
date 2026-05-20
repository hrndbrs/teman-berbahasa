<script setup lang="ts">
import type { NavigationMenuItem, DropdownMenuItem } from '@nuxt/ui';

const { user, role, logout } = useAuth();
useIdleSession();

const colorMode = useColorMode();

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

const engagementNav = computed<NavigationMenuItem[]>(() => {
  const items: NavigationMenuItem[] = [
    {
      label: 'Forms',
      icon: 'i-lucide-file-text',
      to: '/dashboard/forms',
      badge: '4',
    },
  ];
  if (role.value === 'admin') {
    items.push({
      label: 'Users',
      icon: 'i-lucide-shield',
      to: '/dashboard/users',
    });
  }
  return items;
});

const handleLogout = async () => {
  await logout();
  await navigateTo('/login');
};

const userMenuItems = computed<DropdownMenuItem[][]>(() => [
  [
    {
      label: colorMode.value === 'dark' ? 'Light mode' : 'Dark mode',
      icon: colorMode.value === 'dark' ? 'i-lucide-sun' : 'i-lucide-moon',
      onSelect: () => {
        colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
      },
    },
  ],
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
      class="bg-neutral-100 dark:bg-default"
    >
      <template #header="{ collapsed }">
        <div class="flex items-center gap-2.5 min-w-0">
          <Icon
            name="svg:tb-icon"
            class="size-8 shrink-0"
          />
          <div
            v-if="!collapsed"
            class="flex flex-col leading-none min-w-0"
          >
            <span class="text-sm font-bold tracking-tight">
              Teman Berbahasa
            </span>
            <span
              class="text-2xs font-mono tracking-looser uppercase text-dimmed"
            >
              Dashboard
            </span>
          </div>
        </div>
      </template>

      <template #default="{ collapsed }">
        <div class="flex flex-col gap-4 py-1 flex-1">
          <DashboardNavSection
            label="Workspace"
            :items="workspaceNav"
            :collapsed
          />
          <DashboardNavSection
            label="Academic"
            :items="academicNav"
            :collapsed
          />
          <DashboardNavSection
            label="Engagement"
            :items="engagementNav"
            :collapsed
          />
        </div>
      </template>

      <template #footer="{ collapsed }">
        <div class="flex flex-col gap-2 pb-2 w-full">
          <p
            v-if="!collapsed"
            class="text-2xs font-mono tracking-looser uppercase text-dimmed"
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
                class="w-full p-0 gap-3 justify-start"
                :square="collapsed"
                size="sm"
                block
              >
                <template v-if="!collapsed">
                  <span class="text-left">
                    <span class="block line-clamp-1">
                      {{
                        user ? `${user.first_name} ${user.last_name}` : 'User'
                      }}
                    </span>
                    <span class="block text-dimmed line-clamp-1">
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
              class="ml-2 text-label font-mono tracking-loose uppercase text-dimmed"
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
