<script setup lang="ts">
const { events } = useEventsPage();
</script>

<template>
  <AppSectionsEventsHero />
  <AppSectionsSharedEventCards
    class="hidden md:block"
    :events="events"
  />
  <AppSectionsEventsDetails :events="events" />
  <AppSectionsEventsCTA />
</template>
