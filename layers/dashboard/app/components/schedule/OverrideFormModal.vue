<script setup lang="ts">
const open = defineModel<boolean>('open', { required: true });

const props = defineProps<{
  scheduleId: string;
  originalDate: string;
  overrideId?: string | null;
}>();

const emit = defineEmits<{
  saved: [];
}>();

const api = useApi();
const saving = ref(false);
const serverError = ref('');
const instructors = ref<ApiUser[]>([]);

const isEdit = computed(() => !!props.overrideId);
const title = computed(() =>
  isEdit.value ? 'Edit Override' : 'Buat Override'
);

const schema = overrideFormSchema;
type FormState = OverrideFormSchema;

const state = reactive<FormState>({
  original_date: '',
  override_type: 'reschedule',
  new_date: '',
  new_start_time: '',
  new_end_time: '',
  new_room: '',
  new_instructor_user_id: '',
  reason: '',
});

watch(open, async (open) => {
  if (!open) return;
  serverError.value = '';
  state.original_date = props.originalDate;
  if (instructors.value.length === 0) {
    api<{ data: ApiUser[] }>('/users', {
      query: { role: 'teacher', status: 'active', per_page: 100 },
    })
      .then((r) => {
        instructors.value = r.data;
      })
      .catch(() => {});
  }
  try {
    if (isEdit.value && props.overrideId) {
      const o = await api<ApiScheduleOverride>(
        `/schedule-overrides/${props.overrideId}`
      );
      state.override_type = o.override_type;
      state.new_date = o.new_date ?? '';
      state.new_start_time = o.new_start_time ?? '';
      state.new_end_time = o.new_end_time ?? '';
      state.new_room = o.new_room ?? '';
      state.new_instructor_user_id = o.new_instructor?.id ?? '';
      state.reason = o.reason ?? '';
    } else {
      state.override_type = 'reschedule';
      state.new_date = '';
      state.new_start_time = '';
      state.new_end_time = '';
      state.new_room = '';
      state.new_instructor_user_id = '';
      state.reason = '';
    }
  } catch {
    serverError.value = 'Gagal memuat data.';
  }
});

const instructorOptions = computed(() =>
  instructors.value.map((u) => ({
    label: `${u.first_name} ${u.last_name}`,
    value: u.id,
  }))
);

const OVERRIDE_TYPE_OPTIONS = [
  { label: 'Jadwal ulang', value: 'reschedule' },
  { label: 'Ganti instruktur', value: 'instructor_change' },
];

const onSubmit = async () => {
  saving.value = true;
  serverError.value = '';
  try {
    if (isEdit.value && props.overrideId) {
      const payload: UpdateOverridePayload = {};
      if (state.new_date) payload.new_date = state.new_date;
      if (state.new_start_time) payload.new_start_time = state.new_start_time;
      if (state.new_end_time) payload.new_end_time = state.new_end_time;
      if (state.new_room) payload.new_room = state.new_room;
      if (state.new_instructor_user_id)
        payload.new_instructor_user_id = state.new_instructor_user_id;
      if (state.reason !== undefined) payload.reason = state.reason;
      await api(`/schedule-overrides/${props.overrideId}`, {
        method: 'PATCH',
        body: payload,
      });
    } else {
      const payload: CreateOverridePayload = {
        original_date: state.original_date,
        override_type: state.override_type,
      };
      if (state.override_type === 'reschedule') {
        if (state.new_date) payload.new_date = state.new_date;
        if (state.new_start_time) payload.new_start_time = state.new_start_time;
        if (state.new_end_time) payload.new_end_time = state.new_end_time;
      }
      if (state.new_room) payload.new_room = state.new_room;
      if (state.new_instructor_user_id)
        payload.new_instructor_user_id = state.new_instructor_user_id;
      if (state.reason) payload.reason = state.reason;
      await api(`/schedules/${props.scheduleId}/overrides`, {
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
        <div class="grid grid-cols-2 gap-4">
          <UFormField
            name="original_date"
            label="Tanggal Asli"
          >
            <FormDateInput
              v-model="state.original_date"
              disabled
              class="w-full"
            />
          </UFormField>

          <UFormField
            name="override_type"
            label="Tipe Override"
            required
          >
            <USelect
              v-model="state.override_type"
              :items="OVERRIDE_TYPE_OPTIONS"
              value-key="value"
              label-key="label"
              :disabled="isEdit"
              class="w-full"
            />
          </UFormField>
        </div>

        <template v-if="state.override_type === 'reschedule'">
          <UFormField
            name="new_date"
            label="Tanggal Baru"
          >
            <FormDateInput
              v-model="state.new_date"
              class="w-full"
            />
          </UFormField>

          <div class="grid grid-cols-2 gap-4">
            <UFormField
              name="new_start_time"
              label="Jam Mulai Baru"
            >
              <UInput
                v-model="state.new_start_time"
                placeholder="09:00:00"
                type="time"
                class="w-full"
              />
            </UFormField>

            <UFormField
              name="new_end_time"
              label="Jam Selesai Baru"
            >
              <UInput
                v-model="state.new_end_time"
                type="time"
                placeholder="11:00:00"
                class="w-full"
              />
            </UFormField>
          </div>
        </template>

        <UFormField
          name="new_instructor_user_id"
          label="Instruktur Baru"
        >
          <USelect
            v-model="state.new_instructor_user_id"
            :items="instructorOptions"
            value-key="value"
            label-key="label"
            placeholder="Pilih instruktur (opsional)"
            class="w-full"
          />
        </UFormField>

        <UFormField
          name="new_room"
          label="Ruangan Baru"
        >
          <UInput
            v-model="state.new_room"
            placeholder="Sakura 1"
            class="w-full"
          />
        </UFormField>

        <UFormField
          name="reason"
          label="Alasan"
        >
          <UInput
            v-model="state.reason"
            placeholder="Masukkan alasan (opsional)"
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
            :label="isEdit ? 'Simpan Perubahan' : 'Buat Override'"
            :loading="saving"
          />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
