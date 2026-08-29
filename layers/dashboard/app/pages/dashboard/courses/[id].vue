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
  <div class="space-y-6 p-4 sm:p-6">
    <!-- Loading skeleton -->
    <template v-if="loading">
      <USkeleton class="h-8 w-32 rounded-lg" />
      <USkeleton class="h-44 rounded-xl" />
      <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
        <USkeleton
          v-for="i in 4"
          :key="i"
          class="h-28 rounded-xl"
        />
      </div>
      <div class="bg-elevated border-default space-y-4 rounded-xl border p-5">
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
        class="text-muted hover:text-default inline-flex items-center gap-2 text-sm transition-colors"
      >
        <UIcon
          name="i-lucide-arrow-left"
          class="size-4"
        />
        Back to courses
      </NuxtLink>

      <CoursesHero
        :course
        :is-admin="isAdmin"
        @edit="editModalOpen = true"
        @archive="onArchived"
      />

      <CoursesStats
        :course
        :enrollment-pct="enrollmentPct"
      />

      <CoursesInfoCard :course />

      <div class="text-dimmed flex flex-wrap gap-x-6 gap-y-1 px-1 text-xs">
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

  <CoursesFormModal
    v-if="course"
    v-model:open="editModalOpen"
    :course="course"
    @saved="onEditSaved"
  />
</template>
