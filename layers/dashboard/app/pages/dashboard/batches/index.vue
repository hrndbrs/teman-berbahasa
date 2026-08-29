<script setup lang="ts">
definePageMeta({ layout: 'dashboard' });
useSeoMeta({ title: 'Batches — Teman Berbahasa', robots: 'noindex' });

const {
  filteredBatches,
  loading,
  error,
  search,
  statusFilter,
  courseFilter,
  statusCounts,
  courseTabs,
  isAdmin,
  isCreateModalOpen,
  editingBatch,
  onSaved,
} = useBatchesPage();
</script>

<template>
  <div class="bg-default min-h-screen">
    <div class="@container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <BatchesPageHeader
        v-model:search="search"
        v-model:status-filter="statusFilter"
        v-model:course-filter="courseFilter"
        :status-counts="statusCounts"
        :course-tabs="courseTabs"
        :shown-count="filteredBatches.length"
        :is-admin="isAdmin"
        @create="isCreateModalOpen = true"
      />

      <div
        v-if="loading"
        class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <div
          v-for="i in 6"
          :key="i"
          class="bg-elevated border-default space-y-3 rounded-xl border p-5"
        >
          <div class="flex items-center justify-between">
            <USkeleton class="h-5 w-20 rounded" />
            <USkeleton class="h-5 w-16 rounded" />
          </div>
          <USkeleton class="h-6 w-3/4 rounded" />
          <USkeleton class="h-4 w-1/2 rounded" />
          <div class="space-y-2 pt-2">
            <USkeleton
              v-for="j in 3"
              :key="j"
              class="h-4 w-full rounded"
            />
          </div>
        </div>
      </div>

      <UAlert
        v-else-if="error"
        color="error"
        variant="subtle"
        :description="error"
        class="mt-8"
      />

      <template v-else-if="filteredBatches.length > 0">
        <div class="mt-8 grid gap-4 @2xl:grid-cols-2 @5xl:grid-cols-3">
          <BatchesBatchCard
            v-for="batch in filteredBatches"
            :key="batch.id"
            :batch="batch"
          />
        </div>

        <div class="mt-8">
          <BatchesBatchesTable :batches="filteredBatches" />
        </div>
      </template>

      <BatchesEmptyState
        v-else
        :filtered="!!(search || statusFilter !== 'all' || courseFilter)"
        :is-admin="isAdmin"
        @create="isCreateModalOpen = true"
      />

      <BatchesFormModal
        v-model:open="isCreateModalOpen"
        :batch="editingBatch"
        @saved="onSaved"
      />
    </div>
  </div>
</template>
