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
          <div
            v-if="rawSession?.override"
            class="flex gap-4"
          >
            <dt
              class="w-28 shrink-0 text-label font-mono tracking-loose uppercase text-dimmed"
            >
              Override
            </dt>
            <dd class="text-sm font-medium text-default capitalize">
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
      <div class="flex items-center justify-between w-full gap-2">
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
