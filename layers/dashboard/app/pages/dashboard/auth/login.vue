<script setup lang="ts">
definePageMeta({ layout: 'auth' });
useSeoMeta({ title: 'Login - Teman Berbahasa', robots: 'noindex' });

const { state, loading, serverError, onSubmit } = useLoginPage();
</script>

<template>
  <div>
    <h1 class="text-default mb-6 text-2xl font-bold">Masuk</h1>

    <UAlert
      v-if="serverError"
      color="error"
      variant="subtle"
      :description="serverError"
      class="mb-4"
    />

    <UForm
      :schema="loginSchema"
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

      <UFormField
        name="password"
        label="Password"
        required
      >
        <UInput
          v-model="state.password"
          type="password"
          autocomplete="current-password"
          placeholder="Min 8 karakter"
          class="w-full"
        />
      </UFormField>

      <UButton
        type="submit"
        label="Masuk"
        :loading="loading"
        block
      />
    </UForm>

    <div class="mt-4 text-center">
      <NuxtLink
        to="/dashboard/auth/forgot-password"
        class="text-tb-blue-3 dark:text-default text-sm hover:underline"
      >
        Lupa password?
      </NuxtLink>
    </div>
  </div>
</template>
