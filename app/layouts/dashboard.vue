<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const { user, role, logout } = useAuth();

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
  return `${season} · ${year}`;
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
</script>

<template>
  <UDashboardGroup>
    <UDashboardSidebar
      collapsible
      resizable
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
            <span class="text-sm font-bold tracking-tight">tb.</span>
            <span
              class="text-2xs font-mono tracking-looser uppercase text-dimmed"
              >Tutor Center</span
            >
          </div>
        </div>
      </template>

      <template #default="{ collapsed }">
        <div class="flex flex-col gap-4 py-1">
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
        <div class="flex flex-col gap-2">
          <div
            v-if="!collapsed"
            class="flex items-center justify-between px-3"
          >
            <span
              class="text-2xs font-mono tracking-looser uppercase text-dimmed"
              >{{ semesterLabel }}</span
            >
            <UButton
              icon="i-lucide-settings"
              color="neutral"
              variant="ghost"
              size="xs"
            />
          </div>

          <div class="flex items-center gap-2 px-2 py-1">
            <UAvatar
              :alt="user?.name ?? 'User'"
              size="sm"
              class="shrink-0"
            />
            <div
              v-if="!collapsed"
              class="min-w-0 flex-1"
            >
              <p class="truncate text-sm font-medium">{{ user?.name }}</p>
              <p
                class="truncate text-xs font-mono tracking-widest uppercase text-dimmed"
              >
                {{ role }}
              </p>
            </div>
            <ClientOnly>
              <UColorModeButton
                v-if="!collapsed"
                size="xs"
                color="neutral"
                variant="ghost"
              />
            </ClientOnly>
          </div>

          <UButton
            :icon="collapsed ? 'i-lucide-log-out' : undefined"
            :label="collapsed ? undefined : 'Sign out'"
            color="neutral"
            variant="ghost"
            block
            size="sm"
            @click="handleLogout"
          />
        </div>
      </template>
    </UDashboardSidebar>

    <slot />
  </UDashboardGroup>
</template>
