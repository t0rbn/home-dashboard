<template>
<div class="bottom-sheet-container">
  <div class="bottom-sheet flyin-up">
    <slot></slot>
  </div>
</div>
</template>

<script>
export default {
name: "BottomSheet"
}
</script>

<style scoped>
.bottom-sheet-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column-reverse;
  background-color: hsla(0, 0%, 0%, 0.75);
  backdrop-filter: blur(var(--size-small));
  z-index: 100;
}

.bottom-sheet {
  box-shadow: var(--shadow-default);
  border-top-left-radius: var(--border-radius-default);
  border-top-right-radius: vaR(--border-radius-default);
  background-color: vaR(--color-elevation);
  padding: var(--size-big);
}
</style>