<template>
  <Card @click.native="$emit('click')" class="scene-button" :style="{backgroundImage: backgroundPathForScene()}">
    <label>{{ scene }}</label>
  </Card>
</template>

<script>
import Card from '@/components/globals/Card'
import AssetService from '@/services/AssetService'

export default {
  name: 'SceneButton',
  components: {Card},
  props: ['scene'],
  methods: {
    backgroundPathForScene() {
      return AssetService.getSceneBackgroundPath(this.scene);
    }
  }
}
</script>

<style scoped>
.scene-button {
  background-position: center center;
  box-sizing: border-box;
  background-size: cover;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-end;
  padding: 0;
  overflow: hidden;
}

.scene-button label {
  overflow: hidden;
  color: var(--color-highlight);
  background-color: hsla(0, 0%, 0%, 0.5);
  backdrop-filter: blur(var(--size-small));
  padding: var(--size-small) var(--size-medium);
  /*border-radius: calc(var(--size-small) + (0.5 * var(--size-medium)));*/
  transform: translateY(1px);
}

.scene-button:hover {
  filter: brightness(125%);
}
</style>
