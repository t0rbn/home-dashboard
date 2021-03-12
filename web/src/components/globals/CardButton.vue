<template>
  <div @click="$emit('click')" class="card-button">
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
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: vaR(--color-glass);
  background-image: var(--gradient-shiny);
  border-radius: vaR(--border-radius-default);
  box-sizing: border-box;
  padding: vaR(--size-medium);
  transition: var(--transition-all-default);
}

.card-button label {
  pointer-events: none;
}

.card-button i {
  font-size: var(--size-big);
  line-height: var(--size-big);
  display: block;
  margin-bottom: var(--size-small);
}

.card-button:hover {
  filter: brightness(1.25);
  color: var(--color-accent);
}
</style>