<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Card',
}
</script>

<style scoped>
.card {
  background-color: var(--color-elevation);
  background-image: vaR(--gradient-elevation-action);
  border-radius: vaR(--border-radius-default);
  box-shadow: vaR(--shadow-default);
  color: vaR(--color-highlight);
  padding: vaR(--size-medium);
}
</style>