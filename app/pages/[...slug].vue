<script setup lang="ts">
// Catch-all route for 404
throw createError({
  statusCode: 404,
  statusMessage: 'Page Not Found',
  fatal: true,
});
</script>

<template>
  <div></div>
</template>
