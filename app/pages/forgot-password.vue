<script setup lang="ts">
definePageMeta({ layout: 'auth' });

useSeoMeta({ title: 'Lupa Password - Teman Berbahasa', robots: 'noindex' });

const config = useRuntimeConfig();
const email = ref('');
const emailError = ref('');
const serverError = ref('');
const loading = ref(false);
const sent = ref(false);

const validateEmail = () => {
  if (!email.value) {
    emailError.value = 'Email wajib diisi';
    return false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    emailError.value = 'Format email tidak valid';
    return false;
  }
  emailError.value = '';
  return true;
};

const handleSubmit = async () => {
  if (!validateEmail()) return;

  loading.value = true;
  serverError.value = '';

  try {
    await $fetch('/auth/password-reset/request', {
      baseURL: config.public.apiBaseUrl,
      method: 'POST',
      body: { email: email.value },
    });
    sent.value = true;
  } catch {
    serverError.value = 'Terjadi kesalahan. Coba lagi.';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div>
    <h1 class="mb-2 text-2xl font-bold text-gray-900">Lupa Password</h1>

    <template v-if="!sent">
      <p class="mb-6 text-sm text-gray-600">
        Masukkan email akunmu. Kami akan mengirimkan link untuk mereset
        password.
      </p>

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
        <div class="mb-6">
          <label
            for="email"
            class="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            autocomplete="email"
            autofocus
            :aria-invalid="!!emailError"
            aria-describedby="email-error"
            class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm transition focus:border-tb-blue-3 focus:outline-none focus:ring-2 focus:ring-blue-100"
            :class="{ 'border-red-400': emailError }"
            @blur="validateEmail"
          />
          <p
            v-if="emailError"
            id="email-error"
            class="mt-1 text-xs text-red-600"
          >
            {{ emailError }}
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
          {{ loading ? 'Mengirim...' : 'Kirim Link Reset' }}
        </button>
      </form>
    </template>

    <div
      v-else
      class="text-center"
    >
      <Icon
        name="lucide:mail-check"
        class="mx-auto mb-4 size-12 text-green-500"
        aria-hidden="true"
      />
      <p class="mb-1 font-semibold text-gray-900">Email terkirim</p>
      <p class="text-sm text-gray-600">
        Cek inbox kamu untuk link reset password.
      </p>
    </div>

    <div class="mt-6 text-center">
      <NuxtLink
        to="/login"
        class="text-sm text-tb-blue-3 hover:underline"
      >
        Kembali ke Login
      </NuxtLink>
    </div>
  </div>
</template>
