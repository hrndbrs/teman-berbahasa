<script setup lang="ts">
definePageMeta({ layout: 'auth' });
useSeoMeta({ title: 'Lupa Password - Teman Berbahasa', robots: 'noindex' });

const { state, loading, serverError, sent, onSubmit } = useForgotPasswordPage();
</script>

<template>
  <div>
    <h1 class="mb-2 text-2xl font-bold text-default">Lupa Password</h1>

    <template v-if="!sent">
      <p class="mb-6 text-sm text-muted">
        Masukkan email akunmu. Kami akan mengirimkan link untuk mereset
        password.
      </p>

      <UAlert
        v-if="serverError"
        color="error"
        variant="subtle"
        :description="serverError"
        class="mb-4"
      />

      <UForm
        :schema="forgotPasswordSchema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField
          name="email"
          label="Email"
          required
        >
          <UInput
            v-model="state.email"
            type="email"
            autocomplete="email"
            autofocus
            placeholder="kamu@email.com"
            class="w-full"
          />
        </UFormField>

        <UButton
          type="submit"
          label="Kirim Link Reset"
          :loading="loading"
          block
        />
      </UForm>
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
      <p class="mb-1 font-semibold text-default">Email terkirim</p>
      <p class="text-sm text-muted">
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
