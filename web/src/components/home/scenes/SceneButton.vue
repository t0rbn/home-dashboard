<template>
  <Card @click.native="handleClick()" class="scene-button">
    <i :class="['fas', getIcon()]"></i>
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
    getIcon() {
      return AssetService.getSceneIcon(this.scene)
    },
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>
.scene-button {
  background-image: linear-gradient(10deg, var(--color-background), var(--color-elevation));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: var(--transition-all-default);
  cursor: pointer;
}

.scene-button:hover {
  color: var(--color-elevation);
  background-image: vaR(--gradient-yellow-blue);
  box-shadow: var(--shadow-glow-yellow);
}

i {
  font-size: var(--size-huge);
  line-height: var(--size-huge);
  display: block;
  margin-bottom: var(--size-small);
}
</style>
