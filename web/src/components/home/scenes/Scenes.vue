<template>
      <section class="buttons">
        <SceneButton
            v-for="scene in scenes"
            :key="scene"
            :scene="scene"
            @click="triggerScene(scene)"
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
.buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: min-content;
  grid-gap: var(--size-medium);
}

@media (orientation: landscape) {
  .buttons {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

</style>