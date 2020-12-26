<template>
  <a @click="$emit('click')" class="scene-button">
    <div class="hero" :style="{backgroundImage: backgroundPathForScene()}"></div>
    <label>{{ scene }}</label>
  </a>
</template>

<script>
export default {
  name: 'SceneButton',
  props: ['scene'],
  methods: {
    backgroundPathForScene() {
      return `url('./scenes/${this.scene}.jpg')`
    }
  }
}
</script>

<style scoped>
.scene-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.scene-button .hero {
  background-size: cover;
  background-position: center center;
  border: var(--size-tiny) solid var(--color-highlight);
  border-radius: 50%;
  width: 5rem;
  height: 5rem;  box-shadow: var(--shadow-default);

}

.scene-button label {
  color: var(--color-background);
  background-color: var(--color-highlight);
  transform: translateY(-50%);
  padding: var(--size-small) var(--size-medium);
  border-radius: calc(var(--size-small) + (0.5 * var(--size-medium)));
  box-shadow: var(--shadow-default);
}

.scene-button:hover .hero, .scene-button:hover label {
  border-color: var(--color-accent-yellow);
  background-color: var(--color-accent-yellow);
  box-shadow: var(--shadow-glow-yellow);
  cursor: pointer;
}
</style>