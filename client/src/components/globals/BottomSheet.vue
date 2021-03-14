<template>
  <div class="bottom-sheet-container" @click="$emit('closed')">
    <div class="bottom-sheet flyin-up" @click.stop="noop()">
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
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column-reverse;
  z-index: 100;
}

.bottom-sheet {
  /*color: var(--color-background);*/
  border-top-left-radius: var(--size-huge);
  border-top-right-radius: vaR(--size-huge);
  background-color: var(--color-glass);
  backdrop-filter: var(--glass-filter);
  padding: var(--size-huge);
  z-index: 101;

}
</style>