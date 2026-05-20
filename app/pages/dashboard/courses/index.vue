<script setup lang="ts">
definePageMeta({ layout: 'dashboard' });
useSeoMeta({ title: 'Courses — Teman Berbahasa', robots: 'noindex' });

const {
  filteredCourses,
  loading,
  error,
  totalCount,
  activeCount,
  archivedCount,
  statusFilter,
  isAdmin,
  isCreateModalOpen,
  editingCourse,
  openCreate,
  openEdit,
  closeEdit,
  onSaved,
  onArchived,
} = useCoursesPage();
</script>

<template>
  <div class="flex flex-col h-full overflow-hidden">
    <DashboardCoursesPageHeader
      v-model:status-filter="statusFilter"
      :total-count="totalCount"
      :active-count="activeCount"
      :archived-count="archivedCount"
      :is-admin="isAdmin"
      @create="openCreate"
    />

    <div class="flex-1 overflow-y-auto p-6">
      <!-- Loading skeleton -->
      <div
        v-if="loading"
        class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
      >
        <div
          v-for="i in 6"
          :key="i"
          class="bg-elevated border border-default rounded-xl p-5 space-y-3"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <USkeleton class="h-5 w-14 rounded" />
              <USkeleton class="h-5 w-16 rounded" />
            </div>
            <USkeleton class="size-10 rounded-full" />
          </div>
          <USkeleton class="h-6 w-3/4 rounded" />
          <USkeleton class="h-4 w-full rounded" />
          <div class="space-y-2 pt-2">
            <USkeleton v-for="j in 4" :key="j" class="h-4 w-full rounded" />
          </div>
        </div>
      </div>

      <!-- Error state -->
      <UAlert
        v-else-if="error"
        color="error"
        variant="subtle"
        :description="error"
      />

      <!-- Empty state -->
      <DashboardCoursesEmptyState
        v-else-if="filteredCourses.length === 0"
        :filtered="statusFilter !== 'all'"
        :is-admin="isAdmin"
        @create="openCreate"
      />

      <!-- Course grid -->
      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
      >
        <DashboardCoursesCourseCard
          v-for="course in filteredCourses"
          :key="course.id"
          :course="course"
          :is-admin="isAdmin"
          @edit="openEdit(course)"
          @archive="onArchived(course)"
        />
      </div>
    </div>
  </div>

  <DashboardCoursesFormModal
    v-model:open="isCreateModalOpen"
    @saved="onSaved"
  />

  <DashboardCoursesFormModal
    v-if="editingCourse"
    :open="!!editingCourse"
    :course="editingCourse"
    @saved="onSaved"
    @update:open="closeEdit"
  />
</template>
