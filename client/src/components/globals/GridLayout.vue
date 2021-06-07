<template>
<div class="grid" :class="{mini}">
  <slot></slot>
</div>
</template>

<script>
export default {
  name: 'GridLayout',
  props: ['mini']
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(var(--cards-column-count), 1fr);
  grid-gap: var(--size-medium);
}

.grid.mini {
  grid-template-columns: repeat(calc(2 * var(--cards-column-count)), 1fr);
}
</style>
