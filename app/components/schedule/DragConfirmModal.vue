<script setup lang="ts">
import { DAY_NAMES_FULL } from '~/utils/schedule';

const open = defineModel<boolean>('open', { required: true });

defineProps<{
  session: ScheduleSession | null;
  targetDay: DayOfWeek;
  targetDate: string;
  targetStart: string;
  targetEnd: string;
  saving: boolean;
}>();

const emit = defineEmits<{
  confirm: [];
}>();
</script>

<template>
  <UModal
    v-model:open="open"
    title="Pindahkan sesi?"
  >
    <template #body>
      <div
        v-if="session"
        class="space-y-4"
      >
        <div class="flex items-start gap-2">
          <UBadge
            :label="session.code"
            size="sm"
            variant="subtle"
            color="neutral"
            class="shrink-0 mt-0.5"
          />
          <span class="text-sm font-semibold">{{ session.course }}</span>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div class="rounded-lg bg-muted p-3 space-y-0.5">
            <p
              class="text-label text-dimmed uppercase font-mono tracking-loose"
            >
              Sebelum
            </p>
            <p class="text-sm font-medium text-default">
              {{ DAY_NAMES_FULL[session.day] }}
            </p>
            <p class="text-sm text-muted">{{ session.date }}</p>
            <p class="text-sm text-muted">
              {{ session.timeStart }} – {{ session.timeEnd }}
            </p>
          </div>

          <div
            class="rounded-lg bg-primary-50/50 dark:bg-primary-950/20 border border-primary-200 dark:border-primary-800 p-3 space-y-0.5"
          >
            <p
              class="text-label text-dimmed uppercase font-mono tracking-loose"
            >
              Setelah
            </p>
            <p class="text-sm font-medium text-default">
              {{ DAY_NAMES_FULL[targetDay] }}
            </p>
            <p class="text-sm text-muted">{{ targetDate }}</p>
            <p class="text-sm text-muted">
              {{ targetStart }} – {{ targetEnd }}
            </p>
          </div>
        </div>

        <p class="text-sm text-muted">
          Hanya berlaku untuk jadwal ini. Jadwal mingguan tidak berubah.
        </p>

        <div class="flex justify-end gap-2 pt-1">
          <UButton
            label="Batal"
            color="neutral"
            variant="ghost"
            :disabled="saving"
            @click="open = false"
          />
          <UButton
            label="Pindahkan"
            icon="i-lucide-move"
            :loading="saving"
            @click="emit('confirm')"
          />
        </div>
      </div>
    </template>
  </UModal>
</template>
