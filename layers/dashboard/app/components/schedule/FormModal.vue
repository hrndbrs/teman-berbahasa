<script setup lang="ts">
const open = defineModel<boolean>('open', { required: true });

const props = defineProps<{
  scheduleId?: string | null;
  batchId?: string;
}>();

const emit = defineEmits<{
  saved: [];
}>();

const api = useApi();
const saving = ref(false);
const serverError = ref('');
const batches = ref<ApiBatch[]>([]);
const instructors = ref<ApiUser[]>([]);

const isEdit = computed(() => !!props.scheduleId);
const title = computed(() => (isEdit.value ? 'Edit Jadwal' : 'Jadwal Baru'));

const schema = scheduleFormSchema;
type FormState = ScheduleFormSchema;

const state = reactive<FormState>({
  batch_id: '',
  instructor_user_id: '',
  day_of_week: 'monday',
  start_time: '',
  end_time: '',
  room: '',
  recurrence: 'weekly',
  effective_from: '',
  effective_until: '',
});

const initial = ref<UpdateSchedulePayload | null>(null);

async function loadRefs() {
  const tasks: Promise<void>[] = [];
  if (batches.value.length === 0) {
    tasks.push(
      api<{ data: ApiBatch[]; pagination: PaginationMeta }>('/batches', {
        query: { per_page: 100 },
      }).then((r) => {
        batches.value = r.data;
      })
    );
  }
  if (instructors.value.length === 0) {
    tasks.push(
      api<{ data: ApiUser[] }>('/users', {
        query: { role: 'teacher', status: 'active', per_page: 100 },
      }).then((r) => {
        instructors.value = r.data;
      })
    );
  }
  await Promise.allSettled(tasks);
}

watch(open, async (open) => {
  if (!open) return;
  serverError.value = '';
  loadRefs();
  try {
    if (isEdit.value && props.scheduleId) {
      const s = await api<ApiSchedule>(`/schedules/${props.scheduleId}`);
      state.batch_id = s.batch_id;
      state.instructor_user_id = s.instructor?.id ?? '';
      state.day_of_week = s.day_of_week;
      state.start_time = s.start_time;
      state.end_time = s.end_time;
      state.room = s.room ?? '';
      state.recurrence = s.recurrence;
      state.effective_from = s.effective_from;
      state.effective_until = s.effective_until ?? '';
      initial.value = {
        instructor_user_id: s.instructor?.id ?? null,
        day_of_week: s.day_of_week,
        start_time: s.start_time,
        end_time: s.end_time,
        room: s.room,
        recurrence: s.recurrence,
        effective_from: s.effective_from,
        effective_until: s.effective_until,
      };
    } else {
      state.batch_id = props.batchId ?? '';
      state.instructor_user_id = '';
      state.day_of_week = 'monday';
      state.start_time = '';
      state.end_time = '';
      state.room = '';
      state.recurrence = 'weekly';
      state.effective_from = '';
      state.effective_until = '';
      initial.value = null;
    }
  } catch {
    serverError.value = 'Gagal memuat data.';
  }
});

const batchOptions = computed(() =>
  batches.value.map((b) => ({
    label: `${b.batch_code} — ${b.batch_name}`,
    value: b.id,
  }))
);

const instructorOptions = computed(() =>
  instructors.value.map((u) => ({
    label: `${u.first_name} ${u.last_name}`,
    value: u.id,
  }))
);

const DAY_OPTIONS = [
  { label: 'Senin', value: 'monday' },
  { label: 'Selasa', value: 'tuesday' },
  { label: 'Rabu', value: 'wednesday' },
  { label: 'Kamis', value: 'thursday' },
  { label: 'Jumat', value: 'friday' },
  { label: 'Sabtu', value: 'saturday' },
  { label: 'Minggu', value: 'sunday' },
];

const RECURRENCE_OPTIONS = [
  { label: 'Mingguan', value: 'weekly' },
  { label: 'Satu kali', value: 'one-time' },
];

const onSubmit = async () => {
  saving.value = true;
  serverError.value = '';
  try {
    if (isEdit.value && props.scheduleId) {
      const i = initial.value;
      const payload: UpdateSchedulePayload = {};
      if (i) {
        const curInstructor = state.instructor_user_id || null;
        if (curInstructor !== (i.instructor_user_id ?? null))
          payload.instructor_user_id = curInstructor;
        if (state.day_of_week !== i.day_of_week)
          payload.day_of_week = state.day_of_week;
        if (state.start_time !== i.start_time)
          payload.start_time = state.start_time;
        if (state.end_time !== i.end_time) payload.end_time = state.end_time;
        const curRoom = state.room || null;
        if (curRoom !== i.room) payload.room = curRoom;
        if (state.recurrence !== i.recurrence)
          payload.recurrence = state.recurrence;
        if (state.effective_from !== i.effective_from)
          payload.effective_from = state.effective_from;
        const curUntil = state.effective_until || null;
        if (curUntil !== (i.effective_until ?? null))
          payload.effective_until = curUntil;
      }
      await api(`/schedules/${props.scheduleId}`, {
        method: 'PATCH',
        body: payload,
      });
    } else {
      const payload: CreateSchedulePayload = {
        day_of_week: state.day_of_week,
        start_time: state.start_time,
        end_time: state.end_time,
        recurrence: state.recurrence,
        effective_from: state.effective_from,
      };
      if (state.instructor_user_id)
        payload.instructor_user_id = state.instructor_user_id;
      if (state.room) payload.room = state.room;
      if (state.effective_until)
        payload.effective_until = state.effective_until;
      await api(`/batches/${state.batch_id}/schedules`, {
        method: 'POST',
        body: payload,
      });
    }
    emit('saved');
  } catch (err) {
    if (isApiError(err) && err.fields) {
      serverError.value = Object.values(err.fields)[0] ?? 'Terjadi kesalahan.';
    } else {
      serverError.value = isApiError(err)
        ? err.message
        : 'Terjadi kesalahan. Coba lagi.';
    }
  } finally {
    saving.value = false;
  }
};
</script>

<template>
  <UModal
    v-model:open="open"
    :title="title"
  >
    <template #body>
      <UAlert
        v-if="serverError"
        color="error"
        variant="subtle"
        :description="serverError"
        class="mb-4"
      />

      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField
          name="batch_id"
          label="Batch"
          required
        >
          <USelect
            v-model="state.batch_id"
            :items="batchOptions"
            value-key="value"
            label-key="label"
            placeholder="Pilih batch"
            :disabled="isEdit"
            class="w-full"
          />
        </UFormField>

        <div class="grid grid-cols-2 gap-4">
          <UFormField
            name="day_of_week"
            label="Hari"
            required
          >
            <USelect
              v-model="state.day_of_week"
              :items="DAY_OPTIONS"
              value-key="value"
              label-key="label"
              class="w-full"
            />
          </UFormField>

          <UFormField
            name="recurrence"
            label="Recurrence"
            required
          >
            <USelect
              v-model="state.recurrence"
              :items="RECURRENCE_OPTIONS"
              value-key="value"
              label-key="label"
              class="w-full"
            />
          </UFormField>

          <UFormField
            name="start_time"
            label="Jam Mulai"
            required
          >
            <UInput
              v-model="state.start_time"
              type="time"
              placeholder="09:00:00"
              class="w-full"
            />
          </UFormField>

          <UFormField
            name="end_time"
            label="Jam Selesai"
            required
          >
            <UInput
              v-model="state.end_time"
              type="time"
              placeholder="11:00:00"
              class="w-full"
            />
          </UFormField>

          <UFormField
            name="effective_from"
            label="Berlaku Mulai"
            required
          >
            <FormDateInput
              v-model="state.effective_from"
              class="w-full"
            />
          </UFormField>

          <UFormField
            name="effective_until"
            label="Berlaku Sampai"
          >
            <FormDateInput
              v-model="state.effective_until"
              class="w-full"
            />
          </UFormField>
        </div>

        <UFormField
          name="instructor_user_id"
          label="Instruktur"
        >
          <USelect
            v-model="state.instructor_user_id"
            :items="instructorOptions"
            value-key="value"
            label-key="label"
            placeholder="Pilih instruktur (opsional)"
            class="w-full"
          />
        </UFormField>

        <UFormField
          name="room"
          label="Ruangan"
        >
          <UInput
            v-model="state.room"
            placeholder="Sakura 1"
            class="w-full"
          />
        </UFormField>

        <div class="flex justify-end gap-2 pt-2">
          <UButton
            type="button"
            label="Batal"
            color="neutral"
            variant="ghost"
            @click="open = false"
          />
          <UButton
            type="submit"
            :label="isEdit ? 'Simpan Perubahan' : 'Buat Jadwal'"
            :loading="saving"
          />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
