<template>
  <div class="bottom-sheet-container" :class="{hidden}" @click="close()">
    <div class="bottom-sheet flyin-up elevation glass" @click.stop="noop()">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BottomSheet',
  data() {
    return {
      hidden: true
    }
  },
  mounted() {
    setTimeout(() => this.hidden = false, 1)
  },
  methods: {
    noop() {
    },
    close() {
      this.hidden = true
      setTimeout(() => this.$emit('closed'), 125)
    }
  }
}
</script>

<style scoped>
.bottom-sheet-container {
  background-color: hsla(0, 0%, 0%, 0.75);
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column-reverse;
  position: fixed;
  transition: var(--transition-all-default);
  z-index: 100;
}

.bottom-sheet {
  border: none;
  border-top: 1px solid var(--color-elevation);;
  border-top-left-radius: var(--size-huge);
  border-top-right-radius: var(--size-huge);
  box-sizing: border-box;
  margin: 0 auto;
  max-width: 60rem;
  padding: var(--size-huge);
  transition: var(--transition-all-default);
  width: 100%;
  z-index: 101;
}

.bottom-sheet-container.hidden {
  transition: var(--transition-all-default);
  opacity: 0;
}

.bottom-sheet-container.hidden .bottom-sheet {
  transition: var(--transition-all-default);
  transform: translateY(100%);
}

</style>

