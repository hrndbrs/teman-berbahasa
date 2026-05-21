<script setup lang="ts">
definePageMeta({ layout: 'dashboard' });
useSeoMeta({ title: 'Course Detail — Teman Berbahasa', robots: 'noindex' });

const {
  course,
  loading,
  error,
  isAdmin,
  editModalOpen,
  enrollmentPct,
  onEditSaved,
  onArchived,
} = useCourseDetailPage();
</script>

<template>
  <div class="p-4 sm:p-6 space-y-6">
    <!-- Loading skeleton -->
    <template v-if="loading">
      <USkeleton class="h-8 w-32 rounded-lg" />
      <USkeleton class="h-44 rounded-xl" />
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <USkeleton
          v-for="i in 4"
          :key="i"
          class="h-28 rounded-xl"
        />
      </div>
      <div class="bg-elevated border border-default rounded-xl p-5 space-y-4">
        <USkeleton class="h-4 w-24 rounded" />
        <div class="grid grid-cols-2 gap-4">
          <USkeleton
            v-for="i in 4"
            :key="i"
            class="h-8 rounded"
          />
        </div>
      </div>
    </template>

    <!-- Error state -->
    <UAlert
      v-else-if="error"
      color="error"
      variant="subtle"
      :description="error"
    />

    <!-- Course detail -->
    <template v-else-if="course">
      <NuxtLink
        to="/dashboard/courses"
        class="inline-flex items-center gap-2 text-sm text-muted hover:text-default transition-colors"
      >
        <UIcon
          name="i-lucide-arrow-left"
          class="size-4"
        />
        Back to courses
      </NuxtLink>

      <DashboardCoursesHero
        :course
        :is-admin="isAdmin"
        @edit="editModalOpen = true"
        @archive="onArchived"
      />

      <DashboardCoursesStats
        :course
        :enrollment-pct="enrollmentPct"
      />

      <DashboardCoursesInfoCard :course />

      <div class="flex flex-wrap gap-x-6 gap-y-1 text-xs text-dimmed px-1">
        <span>
          Created
          <time
            :datetime="course.created_at"
            class="text-muted"
          >
            {{ formatDateTime(course.created_at) }}
          </time>
        </span>
        <span>
          Updated
          <time
            :datetime="course.updated_at"
            class="text-muted"
          >
            {{ formatDateTime(course.updated_at) }}
          </time>
        </span>
      </div>
    </template>
  </div>

  <DashboardCoursesFormModal
    v-if="course"
    :open="editModalOpen"
    :course="course"
    @saved="onEditSaved"
    @update:open="editModalOpen = $event"
  />
</template>
