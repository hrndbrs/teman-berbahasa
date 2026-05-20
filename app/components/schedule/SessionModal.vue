<script setup lang="ts">
import type { ScheduleSession } from '#shared/types/schedule';
import { DAY_NAMES_FULL } from '~/utils/schedule';

defineProps<{
  session: ScheduleSession | null;
  open: boolean;
}>();

defineEmits<{
  'update:open': [value: boolean];
}>();
</script>

<template>
  <UModal
    :open
    title="Session details"
    @update:open="$emit('update:open', $event)"
  >
    <template #body>
      <div v-if="session">
        <!-- Course header -->
        <div class="flex items-center gap-3 mb-6">
          <UBadge
            :label="session.code"
            color="neutral"
            variant="subtle"
          />
          <h2 class="text-xl font-semibold text-default">
            {{ session.course }}
          </h2>
        </div>

        <!-- Detail rows -->
        <dl class="space-y-4">
          <div class="flex gap-4">
            <dt
              class="w-28 shrink-0 text-label font-mono tracking-loose uppercase text-dimmed"
            >
              Day
            </dt>
            <dd class="text-sm font-medium text-default">
              {{ DAY_NAMES_FULL[session.day] }}
            </dd>
          </div>
          <div class="flex gap-4">
            <dt
              class="w-28 shrink-0 text-label font-mono tracking-loose uppercase text-dimmed"
            >
              Time
            </dt>
            <dd class="text-sm font-semibold font-mono text-default">
              {{ session.timeStart }} – {{ session.timeEnd }}
            </dd>
          </div>
          <div class="flex gap-4">
            <dt
              class="w-28 shrink-0 text-label font-mono tracking-loose uppercase text-dimmed"
            >
              Room
            </dt>
            <dd class="text-sm font-medium text-default">{{ session.room }}</dd>
          </div>
          <div class="flex gap-4">
            <dt
              class="w-28 shrink-0 text-label font-mono tracking-loose uppercase text-dimmed"
            >
              Instructor
            </dt>
            <dd class="text-sm font-medium text-default">
              {{ session.instructor }}
            </dd>
          </div>
          <div class="flex gap-4">
            <dt
              class="w-28 shrink-0 text-label font-mono tracking-loose uppercase text-dimmed"
            >
              Recurrence
            </dt>
            <dd class="text-sm font-medium text-default">
              {{ session.recurrence }}
            </dd>
          </div>
        </dl>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-end gap-2">
        <UButton
          label="Edit"
          icon="i-lucide-pencil"
          color="neutral"
          variant="outline"
        />
        <UButton
          label="Take attendance"
          icon="i-lucide-clipboard-list"
          color="primary"
        />
      </div>
    </template>
  </UModal>
</template>
