<template>
  <Card @click.native="$emit('click')" class="scene-button" :style="{backgroundImage: backgroundPathForScene()}">
    <label>{{ scene }}</label>
  </Card>
</template>

<script>
import Card from '@/components/globals/Card'

export default {
  name: 'SceneButton',
  components: {Card},
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
  height: 5rem;
  background-position: center center;
  background-size: cover;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
}

.scene-button label {
  color: var(--color-background);
  background-color: hsla(0, 0%, 100%, 0.5);
  backdrop-filter: blur(var(--size-small));
  padding: var(--size-small) var(--size-medium);
  border-radius: calc(var(--size-small) + (0.5 * var(--size-medium)));
}

.scene-button:hover {
  filter: brightness(125%);
}
</style>