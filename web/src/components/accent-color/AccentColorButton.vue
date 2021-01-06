<template>
  <button @click="$emit('click')" :style="{backgroundColor: color}"></button>
</template>

<script>
export default {
  name: 'AccentColorButton',
  props: ['color'],
  methods: {

  }
}
</script>

<style scoped>
button {
  border-radius: 50%;
  width: 5rem;
  height: 5rem;  box-shadow: var(--shadow-default);
}
</style>

