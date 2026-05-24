<script setup lang="ts">
import { parseDate } from '@internationalized/date';
import type { CalendarDate } from '@internationalized/date';

const modelValue = defineModel<string>({ default: '' });

defineProps<{
  disabled?: boolean;
}>();

const dateValue = computed({
  get: (): CalendarDate | undefined =>
    modelValue.value ? parseDate(modelValue.value) : undefined,
  set: (val: CalendarDate | undefined) => {
    modelValue.value = val?.toString() ?? '';
  },
});
</script>

<template>
  <UInputDate
    v-model="dateValue"
    :disabled="disabled"
  >
    <template #trailing>
      <UButton
        v-if="modelValue && !disabled"
        type="button"
        color="neutral"
        variant="link"
        size="sm"
        icon="i-lucide-x"
        aria-label="Hapus tanggal"
        class="px-0 mr-1"
        @click="modelValue = ''"
      />
      <UPopover>
        <UButton
          type="button"
          color="neutral"
          variant="link"
          size="sm"
          icon="i-lucide-calendar"
          aria-label="Pilih tanggal"
          class="px-0"
          :disabled="disabled"
        />
        <template #content>
          <UCalendar
            v-model="dateValue"
            class="p-2"
          />
        </template>
      </UPopover>
    </template>
  </UInputDate>
</template>
