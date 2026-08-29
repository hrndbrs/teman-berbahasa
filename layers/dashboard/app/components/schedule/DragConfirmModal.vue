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
            class="mt-0.5 shrink-0"
          />
          <span class="text-sm font-semibold">{{ session.course }}</span>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div class="bg-muted space-y-0.5 rounded-lg p-3">
            <p
              class="text-label text-dimmed tracking-loose font-mono uppercase"
            >
              Sebelum
            </p>
            <p class="text-default text-sm font-medium">
              {{ DAY_NAMES_FULL[session.day] }}
            </p>
            <p class="text-muted text-sm">{{ session.date }}</p>
            <p class="text-muted text-sm">
              {{ session.timeStart }} – {{ session.timeEnd }}
            </p>
          </div>

          <div
            class="bg-primary-50/50 dark:bg-primary-950/20 border-primary-200 dark:border-primary-800 space-y-0.5 rounded-lg border p-3"
          >
            <p
              class="text-label text-dimmed tracking-loose font-mono uppercase"
            >
              Setelah
            </p>
            <p class="text-default text-sm font-medium">
              {{ DAY_NAMES_FULL[targetDay] }}
            </p>
            <p class="text-muted text-sm">{{ targetDate }}</p>
            <p class="text-muted text-sm">
              {{ targetStart }} – {{ targetEnd }}
            </p>
          </div>
        </div>

        <p class="text-muted text-sm">
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
