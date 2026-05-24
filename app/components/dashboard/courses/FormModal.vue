<script setup lang="ts">
const open = defineModel<boolean>('open', { required: true });

const props = defineProps<{
  course?: ApiCourseWithStats | null;
}>();

const emit = defineEmits<{
  saved: [];
}>();

const api = useApi();
const loading = ref(false);
const serverError = ref('');

const isEdit = computed(() => !!props.course);
const title = computed(() => (isEdit.value ? 'Edit Kursus' : 'Kursus Baru'));

const schema = courseFormSchema;

type FormState = CourseFormSchema;

const state = reactive<FormState>({
  course_name: '',
  course_code: '',
  description: '',
  level: undefined,
  session_count: undefined,
  price: '',
  max_capacity: undefined,
});

const initial = ref<UpdateCoursePayload | null>(null);

watch(
  () => props.course,
  (c) => {
    if (c) {
      state.course_name = c.course_name;
      state.course_code = c.course_code;
      state.description = c.description ?? '';
      state.level = c.level ?? undefined;
      state.session_count = c.session_count ?? undefined;
      state.price = c.price ?? '';
      state.max_capacity = c.max_capacity ?? undefined;
      initial.value = { ...state };
    } else {
      state.course_name = '';
      state.course_code = '';
      state.description = '';
      state.level = undefined;
      state.session_count = undefined;
      state.price = '';
      state.max_capacity = undefined;
      initial.value = null;
    }
  },
  { immediate: true }
);

const onCodeInput = () => {
  state.course_code = state.course_code.toUpperCase();
};

const levelOptions = [
  { label: 'Beginner', value: 'beginner' },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Advanced', value: 'advanced' },
];

const onSubmit = async () => {
  loading.value = true;
  serverError.value = '';
  try {
    if (isEdit.value && props.course) {
      const payload: UpdateCoursePayload = {};
      const i = initial.value;
      if (i) {
        if (state.course_name !== i.course_name)
          payload.course_name = state.course_name;
        if (state.course_code !== i.course_code)
          payload.course_code = state.course_code;
        if (state.description !== i.description)
          payload.description = state.description || null;
        if (state.level !== i.level) payload.level = state.level ?? null;
        if (state.session_count !== i.session_count)
          payload.session_count = state.session_count ?? null;
        if (state.price !== i.price) payload.price = state.price || null;
        if (state.max_capacity !== i.max_capacity)
          payload.max_capacity = state.max_capacity ?? null;
      }
      await api(`/courses/${props.course.id}`, {
        method: 'PATCH',
        body: payload,
      });
    } else {
      const payload: CreateCoursePayload = {
        course_name: state.course_name,
        course_code: state.course_code,
        description: state.description || undefined,
        level: state.level,
        session_count: state.session_count,
        price: state.price || undefined,
        max_capacity: state.max_capacity,
      };
      await api('/courses', { method: 'POST', body: payload });
    }
    emit('saved');
  } catch (err) {
    if (isApiError(err) && err.fields) {
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
            name="course_name"
            label="Nama Kursus"
            required
            class="col-span-2"
          >
            <UInput
              v-model="state.course_name"
              placeholder="JLPT N5 Foundations"
              class="w-full"
            />
          </UFormField>

          <UFormField
            name="course_code"
            label="Kode Kursus"
            required
          >
            <UInput
              v-model="state.course_code"
              placeholder="JP-N5"
              class="w-full"
              @input="onCodeInput"
            />
          </UFormField>

          <UFormField
            name="level"
            label="Level"
          >
            <USelect
              v-model="state.level"
              :items="levelOptions"
              value-key="value"
              label-key="label"
              placeholder="Pilih level"
              class="w-full"
            />
          </UFormField>
        </div>

        <UFormField
          name="description"
          label="Deskripsi"
        >
          <UTextarea
            v-model="state.description"
            placeholder="Deskripsi singkat kursus..."
            :rows="2"
            autoresize
            class="w-full"
          />
        </UFormField>

        <div class="grid grid-cols-3 gap-4">
          <UFormField
            name="session_count"
            label="Jumlah Sesi"
          >
            <UInputNumber
              v-model="state.session_count"
              :min="1"
              placeholder="24"
              class="w-full"
            />
          </UFormField>

          <UFormField
            name="price"
            label="Harga (IDR)"
          >
            <UInput
              v-model="state.price"
              placeholder="480000.00"
              class="w-full"
            />
          </UFormField>

          <UFormField
            name="max_capacity"
            label="Kapasitas"
          >
            <UInputNumber
              v-model="state.max_capacity"
              :min="1"
              placeholder="16"
              class="w-full"
            />
          </UFormField>
        </div>

        <div class="flex justify-end gap-2 pt-2">
          <UButton
            label="Batal"
            color="neutral"
            variant="ghost"
            @click="open = false"
          />
          <UButton
            type="submit"
            :label="isEdit ? 'Simpan Perubahan' : 'Buat Kursus'"
            :loading="loading"
          />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
