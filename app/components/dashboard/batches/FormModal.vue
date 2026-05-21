<script setup lang="ts">
const props = defineProps<{
  open: boolean;
  batch?: ApiBatch | null;
}>();

const emit = defineEmits<{
  'update:open': [value: boolean];
  saved: [];
}>();

const api = useApi();
const loading = ref(false);
const serverError = ref('');
const courses = ref<ApiCourse[]>([]);

const isEdit = computed(() => !!props.batch);
const title = computed(() => (isEdit.value ? 'Edit Batch' : 'Batch Baru'));

const schema = batchFormSchema;
type FormState = BatchFormSchema;

const state = reactive<FormState>({
  batch_name: '',
  batch_code: '',
  course_id: '',
  start_date: '',
  end_date: '',
  academic_year: '',
});

watch(
  () => props.batch,
  (b) => {
    if (b) {
      state.batch_name = b.batch_name;
      state.batch_code = b.batch_code;
      state.course_id = b.course_id;
      state.start_date = b.start_date ?? '';
      state.end_date = b.end_date ?? '';
      state.academic_year = b.academic_year ?? '';
    } else {
      state.batch_name = '';
      state.batch_code = '';
      state.course_id = '';
      state.start_date = '';
      state.end_date = '';
      state.academic_year = '';
    }
  },
  { immediate: true },
);

watch(
  () => props.open,
  async (open) => {
    if (open && courses.value.length === 0) {
      try {
        const res = await api<{ data: ApiCourse[] }>('/courses', {
          query: { per_page: 100, status: 'active' },
        });
        courses.value = res.data;
      } catch {
        // non-fatal — select will be empty
      }
    }
  },
);

const courseOptions = computed(() =>
  courses.value.map((c) => ({
    label: `${c.course_code} — ${c.course_name}`,
    value: c.id,
  })),
);

const onCodeInput = () => {
  state.batch_code = state.batch_code.toUpperCase();
};

const onSubmit = async () => {
  loading.value = true;
  serverError.value = '';
  try {
    const payload: CreateBatchPayload = {
      batch_name: state.batch_name,
      batch_code: state.batch_code,
      course_id: state.course_id,
      start_date: state.start_date || undefined,
      end_date: state.end_date || undefined,
      academic_year: state.academic_year || undefined,
    };

    if (isEdit.value && props.batch) {
      await api(`/batches/${props.batch.id}`, { method: 'PATCH', body: payload });
    } else {
      await api('/batches', { method: 'POST', body: payload });
    }
    emit('saved');
  } catch (err) {
    if (err instanceof ApiError && err.fields) {
      serverError.value = Object.values(err.fields)[0] ?? 'Terjadi kesalahan.';
    } else {
      serverError.value = 'Terjadi kesalahan. Coba lagi.';
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <UModal
    :open="open"
    :title="title"
    @update:open="$emit('update:open', $event)"
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
          name="course_id"
          label="Kursus"
          required
        >
          <USelect
            v-model="state.course_id"
            :items="courseOptions"
            value-key="value"
            label-key="label"
            placeholder="Pilih kursus"
            class="w-full"
          />
        </UFormField>

        <div class="grid grid-cols-2 gap-4">
          <UFormField
            name="batch_name"
            label="Nama Batch"
            required
            class="col-span-2"
          >
            <UInput
              v-model="state.batch_name"
              placeholder="N5 Spring Morning"
              class="w-full"
            />
          </UFormField>

          <UFormField
            name="batch_code"
            label="Kode Batch"
            required
          >
            <UInput
              v-model="state.batch_code"
              placeholder="SP26-A"
              class="w-full"
              @input="onCodeInput"
            />
          </UFormField>

          <UFormField
            name="academic_year"
            label="Tahun Akademik"
          >
            <UInput
              v-model="state.academic_year"
              placeholder="2026"
              class="w-full"
            />
          </UFormField>

          <UFormField
            name="start_date"
            label="Tanggal Mulai"
          >
            <UInput
              v-model="state.start_date"
              type="date"
              class="w-full"
            />
          </UFormField>

          <UFormField
            name="end_date"
            label="Tanggal Selesai"
          >
            <UInput
              v-model="state.end_date"
              type="date"
              class="w-full"
            />
          </UFormField>
        </div>

        <div class="flex justify-end gap-2 pt-2">
          <UButton
            label="Batal"
            color="neutral"
            variant="ghost"
            @click="$emit('update:open', false)"
          />
          <UButton
            type="submit"
            :label="isEdit ? 'Simpan Perubahan' : 'Buat Batch'"
            :loading="loading"
          />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
