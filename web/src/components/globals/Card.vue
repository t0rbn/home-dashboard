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
  /*border: 1px solid var(--color-elevation-double);*/
  background-color: vaR(--color-elevation);
  border-radius: vaR(--border-radius-default);
  box-shadow: vaR(--shadow-default);
  color: vaR(--color-highlight);
  padding: vaR(--size-medium);
}
</style>