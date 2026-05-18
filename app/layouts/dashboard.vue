<script setup lang="ts">
const { user, role, logout } = useAuth();

const navItems = computed(() => {
  const items = [
    { label: 'Dashboard', icon: 'lucide:layout-dashboard', to: '/dashboard' },
    { label: 'Siswa', icon: 'lucide:users', to: '/dashboard/students' },
    { label: 'Kursus', icon: 'lucide:book-open', to: '/dashboard/courses' },
    { label: 'Batch', icon: 'lucide:layers', to: '/dashboard/batches' },
    { label: 'Enrollment', icon: 'lucide:user-check', to: '/dashboard/enrollments' },
    { label: 'Jadwal', icon: 'lucide:calendar', to: '/dashboard/schedules' },
    { label: 'Event', icon: 'lucide:calendar-days', to: '/dashboard/events' },
    { label: 'Form', icon: 'lucide:file-text', to: '/dashboard/forms' },
  ];

  if (role.value === 'admin') {
    items.push({ label: 'Pengguna', icon: 'lucide:shield-user', to: '/dashboard/users' });
  }

  return items;
});

const handleLogout = async () => {
  await logout();
  await navigateTo('/login');
};
</script>

<template>
  <div class="flex min-h-dvh bg-gray-50">
    <!-- Sidebar -->
    <aside class="flex w-60 shrink-0 flex-col border-r border-gray-200 bg-white">
      <div class="flex h-16 items-center border-b border-gray-200 px-4">
        <Icon
          name="svg:tb"
          class="h-8 w-auto"
          aria-hidden="true"
        />
      </div>

      <nav
        aria-label="Dashboard navigation"
        class="flex-1 overflow-y-auto p-3"
      >
        <ul class="space-y-1">
          <li
            v-for="item in navItems"
            :key="item.to"
          >
            <NuxtLink
              :to="item.to"
              class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-gray-900"
              active-class="bg-blue-50 text-tb-blue-3 hover:bg-blue-50 hover:text-tb-blue-3"
            >
              <Icon
                :name="item.icon"
                class="size-4 shrink-0"
                aria-hidden="true"
              />
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="border-t border-gray-200 p-3">
        <div class="mb-2 px-3 py-2">
          <p class="text-sm font-medium text-gray-900 truncate">{{ user?.name }}</p>
          <p class="text-xs text-gray-500 truncate">{{ user?.email }}</p>
        </div>
        <button
          class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-gray-900"
          @click="handleLogout"
        >
          <Icon
            name="lucide:log-out"
            class="size-4 shrink-0"
            aria-hidden="true"
          />
          Keluar
        </button>
      </div>
    </aside>

    <!-- Main -->
    <div class="flex flex-1 flex-col overflow-hidden">
      <header class="flex h-16 items-center border-b border-gray-200 bg-white px-6">
        <slot name="header" />
      </header>
      <main class="flex-1 overflow-y-auto p-6">
        <slot />
      </main>
    </div>
  </div>
</template>
