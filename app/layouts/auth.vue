<template>
  <div class="flex min-h-dvh items-center justify-center bg-muted px-4">
    <div class="w-full max-w-md">
      <div class="mb-8 text-center">
        <NuxtLink to="/">
          <Icon
            name="svg:tb"
            class="mx-auto h-12 w-auto"
            aria-hidden="true"
          />
        </NuxtLink>
      </div>
      <div class="rounded-2xl border border-default bg-elevated p-8 shadow-sm">
        <slot />
      </div>
    </div>
  </div>
</template>
