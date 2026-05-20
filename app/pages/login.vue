<script setup lang="ts">
definePageMeta({ layout: 'auth' });

useSeoMeta({ title: 'Login - Teman Berbahasa', robots: 'noindex' });

const { login } = useAuth();
const route = useRoute();

const form = reactive({ email: '', password: '' });
const errors = reactive({ email: '', password: '' });
const serverError = ref('');
const loading = ref(false);

const validateEmail = () => {
  if (!form.email) {
    errors.email = 'Email wajib diisi';
    return false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Format email tidak valid';
    return false;
  }
  errors.email = '';
  return true;
};

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

const handleSubmit = async () => {
  const valid = validateEmail() && validatePassword();
  if (!valid) return;

  loading.value = true;
  serverError.value = '';

  try {
    await login({ email: form.email, password: form.password });
    const redirect = route.query.redirect as string | undefined;
    await navigateTo(redirect || '/dashboard');
  } catch (err: unknown) {
    if (err instanceof ApiError && err.status === 401) {
      serverError.value =
        err.code === ApiError.Code.ACCOUNT_LOCKED
          ? 'Akun dikunci karena terlalu banyak percobaan login'
          : 'Email atau password salah';
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
    <h1 class="mb-6 text-2xl font-bold text-gray-900">Masuk</h1>

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
          for="email"
          class="mb-1.5 block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          autocomplete="email"
          autofocus
          :aria-invalid="!!errors.email"
          aria-describedby="email-error"
          class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm transition focus:border-tb-blue-3 focus:outline-none focus:ring-2 focus:ring-blue-100"
          :class="{ 'border-red-400': errors.email }"
          @blur="validateEmail"
        />
        <p
          v-if="errors.email"
          id="email-error"
          class="mt-1 text-xs text-red-600"
        >
          {{ errors.email }}
        </p>
      </div>

      <div class="mb-6">
        <label
          for="password"
          class="mb-1.5 block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          v-model="form.password"
          type="password"
          autocomplete="current-password"
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
        {{ loading ? 'Memproses...' : 'Masuk' }}
      </button>
    </form>

    <div class="mt-4 text-center">
      <NuxtLink
        to="/forgot-password"
        class="text-sm text-tb-blue-3 hover:underline"
      >
        Lupa password?
      </NuxtLink>
    </div>
  </div>
</template>
