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
  padding: vaR(--size-medium);
  color: vaR(--color-highlight);
}
</style>