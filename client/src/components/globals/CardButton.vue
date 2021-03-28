<template>
  <div @click="$emit('click')" class="card-button">
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'CardButton',
}
</script>

<style scoped>
.card-button {
  align-items: center;
  background-color: var(--color-elevation);
  border-radius: var(--border-radius-default);
  box-shadow: var(--shadow-default);
  box-sizing: border-box;
  cursor: pointer;
  padding: var(--size-medium);
  transition: var(--transition-all-default);
}

.card-button:hover {
  color: var(--color-accent);
  filter: brightness(1.1);
}
</style>