<template>
  <div class="default">
    <TheHeader />

    <slot />

    <TheFooter />
  </div>
</template>

<script lang="ts" setup>
import TheHeader from '~/components/TheHeader.vue';
import TheFooter from '~/components/TheFooter.vue';
</script>

<style lang="scss" scoped>
.default {
  display: flex;
  flex-direction: column;
  min-height: 100svh;
}
</style>
