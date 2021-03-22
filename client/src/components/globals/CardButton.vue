<template>
  <div @click="$emit('click')" class="card-button glass">
    <i :class="['fas', icon]" v-if="icon"></i>
    <label>{{ label }}</label>
  </div>
</template>

<script>

export default {
  name: 'CardButton',
  props: ['icon', 'label']
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--size-medium);
  transition: var(--transition-all-default);
}

.card-button label {
  pointer-events: none;
}

.card-button i {
  display: block;
  font-size: var(--size-big);
  line-height: var(--size-big);
  margin-bottom: var(--size-small);
}

.card-button:hover {
  color: var(--color-accent);
  filter: brightness(1.1);
}
</style>