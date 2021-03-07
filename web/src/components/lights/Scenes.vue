<template>
      <section class="scene-buttons">
        <CardButton
            class="flyin-up"
            v-for="(scene, index) in scenes"
            :key="scene"
            :label="scene !== 'ALLOFF' ? scene : 'Off'"
            :icon="iconForScene(scene)"
            @click="triggerScene(scene)"
            :style="{animationDelay: `${50 * index}ms`}"
        ></CardButton>
      </section>
</template>

<script>
import LightService from '@/services/LightService'
import CardButton from '@/components/globals/CardButton'
import AssetService from '@/services/AssetService'

export default {
  name: 'Scenes',
  components: {CardButton},
  data() {
    return {
      scenes: [],
    }
  },
  async created() {
    this.scenes = await LightService.getSceneNames()
  },
  methods: {
    triggerScene(scene) {
      LightService.selectScene(scene)
    },
    iconForScene(scene) {
      return AssetService.getSceneIcon(scene)
    }
  }
}
</script>

<style scoped>
.scene-buttons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: auto;
  grid-gap: var(--size-medium);
}

@media (orientation: landscape) {
  .scene-buttons {
    grid-template-columns: repeat(5, 1fr);
  }
}

</style>
