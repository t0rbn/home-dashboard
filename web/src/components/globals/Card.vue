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
  background-color: vaR(--color-elevation);
  background-image: var(--gradient-elevation);
  border-radius: vaR(--border-radius-default);
  box-sizing: border-box;
  color: vaR(--color-highlight);
  padding: vaR(--size-medium);
  min-height: calc(var(--size-card-side));
  min-width: calc(var(--size-card-side));
  backdrop-filter: blur(var(--size-big));
}
</style>