<template>
  <Card class="card" title="Scenes" icon="fa-lightbulb">
    <section class="buttons">
      <SceneButton
          v-for="scene in scenes"
          :key="scene"
          :scene="scene"
          @click="triggerScene(scene)"
      ></SceneButton>
    </section>
  </Card>
</template>

<script>
import LightService from '@/components/scenes/LightService'
import SceneButton from '@/components/scenes/SceneButton'
import Card from '@/components/globals/Card'

export default {
  name: 'Scenes',
  components: {SceneButton, Card},
  data() {
    return {
      scenes: []
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
.card {
  overflow: hidden;
}

.buttons {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  grid-auto-rows: 1fr;
  grid-gap: var(--size-medium);
  margin-top: var(--size-medium);
}

</style>