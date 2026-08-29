<script setup lang="ts">
definePageMeta({ layout: 'auth' });
useSeoMeta({ title: 'Reset Password - Teman Berbahasa', robots: 'noindex' });

const { token, state, loading, serverError, done, onSubmit } =
  useResetPasswordPage();
</script>

<template>
  <div>
    <h1 class="text-default mb-6 text-2xl font-bold">Reset Password</h1>

    <div
      v-if="!token"
      class="text-muted text-center text-sm"
    >
      Link tidak valid. Minta link reset baru di halaman
      <NuxtLink
        to="/dashboard/auth/forgot-password"
        class="text-tb-blue-3 hover:underline"
      >
        Lupa Password
      </NuxtLink>
      .
    </div>

    <template v-else-if="!done">
      <UAlert
        v-if="serverError"
        color="error"
        variant="subtle"
        :description="serverError"
        class="mb-4"
      />

      <UForm
        :schema="resetPasswordSchema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField
          name="password"
          label="Password Baru"
          required
        >
          <UInput
            v-model="state.password"
            type="password"
            autofocus
            placeholder="Min 8 karakter"
            class="w-full"
          />
        </UFormField>

        <UFormField
          name="confirm"
          label="Konfirmasi Password"
          required
        >
          <UInput
            v-model="state.confirm"
            type="password"
            placeholder="Ulangi password baru"
            class="w-full"
          />
        </UFormField>

        <UButton
          type="submit"
          label="Simpan Password Baru"
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
        name="lucide:circle-check"
        class="mx-auto mb-4 size-12 text-green-500"
        aria-hidden="true"
      />
      <p class="text-default mb-4 font-semibold">Password berhasil diubah</p>
      <NuxtLink
        to="/dashboard/auth/login"
        class="bg-tb-blue-3 inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
      >
        Masuk Sekarang
      </NuxtLink>
    </div>
  </div>
</template>
