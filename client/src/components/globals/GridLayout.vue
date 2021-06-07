<template>
  <div class="grid-container">
    <div class="grid" :class="{mini}">
      <slot></slot>
    </div>
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

.grid > * {
  aspect-ratio: 1;
}

.grid.mini {
  grid-template-columns: repeat(calc(2 * var(--cards-column-count)), 1fr);

}

@media (max-width: 50rem) {
  .grid-container {
    overflow: scroll;
  }

  .grid > * {
    width: 50vw;
  }

  .grid.mini > * {
    width: calc(25vw - (0.5 * vaR(--size-medium)));
  }

  .grid {
    grid-auto-flow: column;
  }
}
</style>
