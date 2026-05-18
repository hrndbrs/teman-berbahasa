<script setup lang="ts">
definePageMeta({ layout: 'auth' });

useSeoMeta({ title: 'Reset Password - Teman Berbahasa', robots: 'noindex' });

const config = useRuntimeConfig();
const route = useRoute();
const token = route.query.token as string | undefined;

const form = reactive({ password: '', confirm: '' });
const errors = reactive({ password: '', confirm: '' });
const serverError = ref('');
const loading = ref(false);
const done = ref(false);

const validatePassword = () => {
  if (!form.password) {
    errors.password = 'Password wajib diisi';
    return false;
  }
  if (form.password.length < 8) {
    errors.password = 'Password minimal 8 karakter';
    return false;
  }
  errors.password = '';
  return true;
};

const validateConfirm = () => {
  if (!form.confirm) {
    errors.confirm = 'Konfirmasi password wajib diisi';
    return false;
  }
  if (form.confirm !== form.password) {
    errors.confirm = 'Password tidak cocok';
    return false;
  }
  errors.confirm = '';
  return true;
};

const handleSubmit = async () => {
  const valid = validatePassword() && validateConfirm();
  if (!valid) return;

  loading.value = true;
  serverError.value = '';

  try {
    await $fetch('/auth/password-reset/confirm', {
      baseURL: config.public.apiBaseUrl,
      method: 'POST',
      body: { token, password: form.password },
    });
    done.value = true;
  } catch (err: any) {
    const status = err?.response?.status;
    if (status === 400 || status === 422) {
      serverError.value = 'Link reset tidak valid atau sudah kedaluwarsa';
    } else {
      serverError.value = 'Terjadi kesalahan. Coba lagi.';
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div>
    <h1 class="mb-6 text-2xl font-bold text-gray-900">Reset Password</h1>

    <div
      v-if="!token"
      class="text-center text-sm text-gray-600"
    >
      Link tidak valid. Minta link reset baru di halaman
      <NuxtLink
        to="/forgot-password"
        class="text-tb-blue-3 hover:underline"
      >
        Lupa Password </NuxtLink
      >.
    </div>

    <template v-else-if="!done">
      <div
        v-if="serverError"
        role="alert"
        class="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
      >
        {{ serverError }}
      </div>

      <form
        novalidate
        @submit.prevent="handleSubmit"
      >
        <div class="mb-4">
          <label
            for="password"
            class="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Password Baru
          </label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            autofocus
            :aria-invalid="!!errors.password"
            aria-describedby="password-error"
            class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm transition focus:border-tb-blue-3 focus:outline-none focus:ring-2 focus:ring-blue-100"
            :class="{ 'border-red-400': errors.password }"
            @blur="validatePassword"
          />
          <p
            v-if="errors.password"
            id="password-error"
            class="mt-1 text-xs text-red-600"
          >
            {{ errors.password }}
          </p>
        </div>

        <div class="mb-6">
          <label
            for="confirm"
            class="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Konfirmasi Password
          </label>
          <input
            id="confirm"
            v-model="form.confirm"
            type="password"
            :aria-invalid="!!errors.confirm"
            aria-describedby="confirm-error"
            class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm transition focus:border-tb-blue-3 focus:outline-none focus:ring-2 focus:ring-blue-100"
            :class="{ 'border-red-400': errors.confirm }"
            @blur="validateConfirm"
          />
          <p
            v-if="errors.confirm"
            id="confirm-error"
            class="mt-1 text-xs text-red-600"
          >
            {{ errors.confirm }}
          </p>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="flex w-full items-center justify-center gap-2 rounded-lg bg-tb-blue-3 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Icon
            v-if="loading"
            name="lucide:loader-circle"
            class="size-4 animate-spin"
            aria-hidden="true"
          />
          {{ loading ? 'Menyimpan...' : 'Simpan Password Baru' }}
        </button>
      </form>
    </template>

    <div
      v-else
      class="text-center"
    >
      <Icon
        name="lucide:circle-check"
        class="mx-auto mb-4 size-12 text-green-500"
        aria-hidden="true"
      />
      <p class="mb-4 font-semibold text-gray-900">Password berhasil diubah</p>
      <NuxtLink
        to="/login"
        class="inline-flex items-center gap-2 rounded-lg bg-tb-blue-3 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
      >
        Masuk Sekarang
      </NuxtLink>
    </div>
  </div>
</template>
