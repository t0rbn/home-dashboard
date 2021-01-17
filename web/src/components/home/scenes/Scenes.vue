<template>
      <section class="scene-buttons">
        <SceneButton
            class="flyin-up"
            v-for="(scene, index) in scenes"
            :key="scene"
            :scene="scene"
            @click="triggerScene(scene)"
            :style="{animationDelay: `${50 * index}ms`}"
        ></SceneButton>
      </section>
</template>

<script>
import LightService from '@/services/LightService'
import SceneButton from '@/components/home/scenes/SceneButton'

export default {
  name: 'Scenes',
  components: {SceneButton},
  data() {
    return {
      scenes: [],
    }
  },
  async created() {
    this.scenes = await LightService.getScenes()
  },
  methods: {
    triggerScene(scene) {
      LightService.selectScene(scene)
    }
  }
}
</script>

<style scoped>
.scene-buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: auto;
  grid-gap: var(--size-medium);
}

@media (orientation: landscape) {
  .scene-buttons {
    grid-template-columns: repeat(4, 1fr);
  }
}

</style>
