<template>
  <div class="card">
    <strong><i :class="['fas', icon]"></i>{{ title }}</strong>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['title', 'icon']
}
</script>

<style scoped>
.card {
  background-color: var(--color-elevation);
  background-image: vaR(--gradient-elevation-action);
  border-radius: vaR(--border-radius-default);
  box-shadow: vaR(--shadow-default);
  padding: vaR(--size-big);
  color: vaR(--color-highlight);
}

strong {
  display: block;
}

strong i {
  margin: 0 var(--size-small) var(--size-small) 0;
}
</style>