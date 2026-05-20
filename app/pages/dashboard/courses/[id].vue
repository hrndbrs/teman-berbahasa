<script setup lang="ts">
definePageMeta({ layout: 'dashboard' });
useSeoMeta({ title: 'Course Detail — Teman Berbahasa', robots: 'noindex' });

const {
  course,
  loading,
  error,
  isAdmin,
  editModalOpen,
  onEditSaved,
  onArchived,
} = useCourseDetailPage();

const LEVEL_LABELS: Record<ApiCourseLevel, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

const LEVEL_COLORS: Record<ApiCourseLevel, string> = {
  beginner: 'text-success-600 dark:text-success-400',
  intermediate: 'text-warning-600 dark:text-warning-400',
  advanced: 'text-error-600 dark:text-error-400',
};

function formatPrice(price: string | null): string {
  if (!price) return '—';
  const num = parseFloat(price);
  if (isNaN(num)) return price;
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(num);
}
</script>

<template>
  <div class="p-4 sm:p-6 space-y-6">
    <!-- Loading skeleton -->
    <template v-if="loading">
      <div class="flex items-center gap-3">
        <USkeleton class="size-9 rounded-lg" />
        <USkeleton class="h-7 w-48 rounded" />
      </div>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="i in 4"
          :key="i"
          class="bg-elevated border border-default rounded-xl p-5 space-y-3"
        >
          <USkeleton class="h-4 w-20 rounded" />
          <USkeleton class="h-8 w-16 rounded" />
        </div>
      </div>
      <div class="bg-elevated border border-default rounded-xl p-5 space-y-4">
        <USkeleton class="h-5 w-32 rounded" />
        <USkeleton class="h-4 w-full rounded" />
        <USkeleton class="h-4 w-3/4 rounded" />
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
      <!-- Back + header -->
      <div
        class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
      >
        <div class="flex items-start gap-3">
          <NuxtLink
            to="/dashboard/courses"
            class="mt-1 flex items-center justify-center size-9 rounded-lg border border-default bg-elevated hover:bg-accented text-muted hover:text-default transition-all shrink-0"
          >
            <UIcon
              name="i-lucide-arrow-left"
              class="size-4"
            />
          </NuxtLink>
          <div>
            <div class="flex items-center gap-2 flex-wrap mb-1">
              <span
                class="px-2 py-0.5 text-label font-mono tracking-wide uppercase rounded border border-default text-muted bg-muted"
              >
                {{ course.course_code }}
              </span>
              <span
                class="flex items-center gap-1 px-2 py-0.5 text-label font-mono tracking-wide uppercase rounded"
                :class="
                  course.status === 'active'
                    ? 'bg-success-50 text-success-600 dark:bg-success-950 dark:text-success-400'
                    : 'bg-muted text-dimmed'
                "
              >
                <span
                  class="size-1.5 rounded-full"
                  :class="
                    course.status === 'active' ? 'bg-success-500' : 'bg-dimmed'
                  "
                />
                {{ course.status === 'active' ? 'Active' : 'Archived' }}
              </span>
            </div>
            <h1
              class="text-2xl sm:text-3xl font-bold text-default leading-tight"
            >
              {{ course.course_name }}
            </h1>
          </div>
        </div>

        <div
          v-if="isAdmin"
          class="flex items-center gap-2 shrink-0"
        >
          <UButton
            color="neutral"
            variant="outline"
            size="sm"
            @click="editModalOpen = true"
          >
            <UIcon
              name="i-lucide-pencil"
              class="size-4"
            />
            Edit
          </UButton>
          <UButton
            v-if="course.status === 'active'"
            color="warning"
            variant="outline"
            size="sm"
            @click="onArchived"
          >
            <UIcon
              name="i-lucide-archive"
              class="size-4"
            />
            Arsipkan
          </UButton>
        </div>
      </div>

      <!-- Stat cards -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard title="Enrolled">
          <div class="px-5 py-4">
            <span class="text-3xl font-bold text-default">
              {{ course.enrolled_count }}
            </span>
            <span class="ml-1 text-sm text-muted">
              / {{ course.max_capacity ?? '∞' }}
            </span>
          </div>
        </DashboardCard>

        <DashboardCard title="Batches">
          <div class="px-5 py-4">
            <span class="text-3xl font-bold text-default">
              {{ course.batch_count }}
            </span>
          </div>
        </DashboardCard>

        <DashboardCard title="Ongoing">
          <div class="px-5 py-4">
            <span
              class="text-3xl font-bold text-success-600 dark:text-success-400"
            >
              {{ course.ongoing_batch_count }}
            </span>
          </div>
        </DashboardCard>

        <DashboardCard title="Sessions">
          <div class="px-5 py-4">
            <span class="text-3xl font-bold text-default">
              {{ course.session_count ?? '—' }}
            </span>
          </div>
        </DashboardCard>
      </div>

      <!-- Detail card -->
      <DashboardCard title="Course Details">
        <div class="px-5 py-4 space-y-5">
          <div v-if="course.description">
            <dt
              class="text-label font-mono tracking-loose uppercase text-dimmed mb-1"
            >
              Description
            </dt>
            <dd
              class="text-sm text-default leading-relaxed whitespace-pre-line"
            >
              {{ course.description }}
            </dd>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <dt
                class="text-label font-mono tracking-loose uppercase text-dimmed mb-1"
              >
                Subject
              </dt>
              <dd class="text-sm font-medium text-default">
                {{ course.subject ?? '—' }}
              </dd>
            </div>
            <div>
              <dt
                class="text-label font-mono tracking-loose uppercase text-dimmed mb-1"
              >
                Level
              </dt>
              <dd
                class="text-sm font-medium"
                :class="
                  course.level ? LEVEL_COLORS[course.level] : 'text-dimmed'
                "
              >
                {{ course.level ? LEVEL_LABELS[course.level] : '—' }}
              </dd>
            </div>
            <div>
              <dt
                class="text-label font-mono tracking-loose uppercase text-dimmed mb-1"
              >
                Price
              </dt>
              <dd class="text-sm font-semibold text-default">
                {{ formatPrice(course.price) }}
              </dd>
            </div>
            <div>
              <dt
                class="text-label font-mono tracking-loose uppercase text-dimmed mb-1"
              >
                Max Capacity
              </dt>
              <dd class="text-sm font-semibold text-default">
                {{ course.max_capacity ?? '—' }}
              </dd>
            </div>
          </div>
        </div>
      </DashboardCard>

      <!-- Metadata -->
      <div class="flex flex-wrap gap-x-6 gap-y-1 text-xs text-dimmed">
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
