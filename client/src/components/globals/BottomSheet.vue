<template>
  <div class="bottom-sheet-container" @click="$emit('closed')">
    <div class="bottom-sheet flyin-up glass" @click.stop="noop()">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BottomSheet',
  methods: {
    noop() {
    }
  }
}
</script>

<style scoped>
.bottom-sheet-container {
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column-reverse;
  position: fixed;
  z-index: 100;
}

.bottom-sheet {
  /*color: var(--color-background);*/
  backdrop-filter: var(--glass-filter);
  background-image: var(--gradient-glass);
  border-top-left-radius: var(--size-huge);
  border-top-right-radius: var(--size-huge);
  padding: var(--size-huge);
  z-index: 101;
}
</style>