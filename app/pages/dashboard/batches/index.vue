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
  <div class="min-h-screen bg-default">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DashboardBatchesPageHeader
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
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8"
      >
        <div
          v-for="i in 6"
          :key="i"
          class="bg-elevated border border-default rounded-xl p-5 h-52 animate-pulse"
        />
      </div>

      <UAlert
        v-else-if="error"
        color="error"
        variant="subtle"
        :description="error"
        class="mt-8"
      />

      <template v-else-if="filteredBatches.length > 0">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          <DashboardBatchesBatchCard
            v-for="batch in filteredBatches"
            :key="batch.id"
            :batch="batch"
          />
        </div>

        <div class="mt-8">
          <DashboardBatchesBatchesTable :batches="filteredBatches" />
        </div>
      </template>

      <DashboardBatchesEmptyState
        v-else
        :filtered="!!(search || statusFilter !== 'all' || courseFilter)"
        :is-admin="isAdmin"
        @create="isCreateModalOpen = true"
      />

      <DashboardBatchesFormModal
        v-model:open="isCreateModalOpen"
        :batch="editingBatch"
        @saved="onSaved"
      />
    </div>
  </div>
</template>
