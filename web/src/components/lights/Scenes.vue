<template>
  <section>
    <h1>Scenes</h1>
    <div class="scenes-wrapper">
      <div class="scenes">
        <CardButton
            class="scene"
            v-for="(scene, index) in scenes"
            :key="scene"
            :label="scene !== 'ALLOFF' ? scene : 'Off'"
            :icon="iconForScene(scene)"
            @click="triggerScene(scene)"
            :style="{animationDelay: `${50 * index}ms`}"
        ></CardButton>
      </div>
    </div>
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
      scenes: []
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
section {
  min-width: 0;
  min-height: 0;
  display: grid;
  grid-auto-rows: auto 1fr;
}

.scenes-wrapper {
  overflow: scroll;
  min-width: 0;
  min-height: 0;
  margin: 0 calc(-1 * var(--size-medium));
  padding: 0 var(--size-medium);
}

.scenes {
  min-height: 100%;
  display: grid;
  grid-gap: var(--size-medium);
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
}

.scene {
  min-height: var(--size-double-card-side);
  min-width: var(--size-double-card-side);
}
</style>
