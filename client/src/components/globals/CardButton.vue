<template>
  <div @click="$emit('click')" class="card-button elevation">
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
  border-radius: var(--border-radius-default);
  box-sizing: border-box;
  cursor: pointer;
  padding: var(--size-medium);
  transition: var(--transition-all-default);
}

.card-button:hover {
  filter: brightness(1.1);
}

.card-button i {
  font-size: var(--size-big);
}

.card-button > * {
  display: block;
  margin-bottom: var(--size-small);
}
</style>
