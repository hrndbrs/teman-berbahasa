<script setup lang="ts">
import { DAY_NAMES_FULL } from '~/utils/schedule';

const open = defineModel<boolean>('open', { required: true });

defineProps<{
  session: ScheduleSession | null;
  rawSession: ApiSession | null;
}>();

defineEmits<{
  edit: [scheduleId: string];
  'add-override': [payload: { scheduleId: string; originalDate: string }];
  'edit-override': [
    payload: {
      overrideId: string;
      scheduleId: string;
      originalDate: string;
    },
  ];
  'delete-override': [overrideId: string];
  delete: [scheduleId: string];
}>();
</script>

<template>
  <UModal
    v-model:open="open"
    title="Session details"
  >
    <template #body>
      <div v-if="session">
        <!-- Course header -->
        <div class="mb-6 flex items-center gap-3">
          <UBadge
            :label="session.code"
            color="neutral"
            variant="subtle"
          />
          <h2 class="text-default text-xl font-semibold">
            {{ session.course }}
          </h2>
        </div>

        <!-- Detail rows -->
        <dl class="space-y-4">
          <div class="flex gap-4">
            <dt
              class="text-label tracking-loose text-dimmed w-28 shrink-0 font-mono uppercase"
            >
              Day
            </dt>
            <dd class="text-default text-sm font-medium">
              {{ DAY_NAMES_FULL[session.day] }}
            </dd>
          </div>
          <div class="flex gap-4">
            <dt
              class="text-label tracking-loose text-dimmed w-28 shrink-0 font-mono uppercase"
            >
              Time
            </dt>
            <dd class="text-default font-mono text-sm font-semibold">
              {{ session.timeStart }} – {{ session.timeEnd }}
            </dd>
          </div>
          <div class="flex gap-4">
            <dt
              class="text-label tracking-loose text-dimmed w-28 shrink-0 font-mono uppercase"
            >
              Room
            </dt>
            <dd class="text-default text-sm font-medium">{{ session.room }}</dd>
          </div>
          <div class="flex gap-4">
            <dt
              class="text-label tracking-loose text-dimmed w-28 shrink-0 font-mono uppercase"
            >
              Instructor
            </dt>
            <dd class="text-default text-sm font-medium">
              {{ session.instructor }}
            </dd>
          </div>
          <div class="flex gap-4">
            <dt
              class="text-label tracking-loose text-dimmed w-28 shrink-0 font-mono uppercase"
            >
              Recurrence
            </dt>
            <dd class="text-default text-sm font-medium">
              {{ session.recurrence }}
            </dd>
          </div>
          <div
            v-if="rawSession?.override"
            class="flex gap-4"
          >
            <dt
              class="text-label tracking-loose text-dimmed w-28 shrink-0 font-mono uppercase"
            >
              Override
            </dt>
            <dd class="text-default text-sm font-medium capitalize">
              {{ rawSession.override.override_type.replace('_', ' ') }}
              <template v-if="rawSession.override.reason">
                — {{ rawSession.override.reason }}
              </template>
            </dd>
          </div>
        </dl>
      </div>
    </template>

    <template #footer>
      <div class="flex w-full items-center justify-between gap-2">
        <div class="flex gap-2">
          <UButton
            v-if="rawSession?.override"
            label="Edit Override"
            icon="i-lucide-calendar-clock"
            color="neutral"
            variant="ghost"
            size="sm"
            @click="
              $emit('edit-override', {
                overrideId: rawSession!.override!.id,
                scheduleId: session!.id,
                originalDate: rawSession!.override!.original_date,
              })
            "
          />
          <UButton
            v-if="rawSession?.override"
            icon="i-lucide-x"
            color="error"
            variant="ghost"
            size="sm"
            @click="$emit('delete-override', rawSession!.override!.id)"
          />
        </div>
        <div class="flex gap-2">
          <UButton
            v-if="rawSession && !rawSession.override"
            label="Override"
            icon="i-lucide-calendar-clock"
            color="neutral"
            variant="outline"
            size="sm"
            @click="
              $emit('add-override', {
                scheduleId: session!.id,
                originalDate: rawSession!.date,
              })
            "
          />
          <UButton
            label="Edit"
            icon="i-lucide-pencil"
            color="neutral"
            variant="outline"
            size="sm"
            @click="$emit('edit', session!.id)"
          />
          <UButton
            label="Take attendance"
            icon="i-lucide-clipboard-list"
            color="primary"
            size="sm"
          />
        </div>
      </div>
    </template>
  </UModal>
</template>
