<template>
  <section>
    <div class="scenes-wrapper">
      <div class="scenes">
        <CardButton
            class="scene"
            v-for="(scene) in scenes"
            :key="scene"
            :label="scene !== 'ALLOFF' ? scene : 'Off'"
            @click="triggerScene(scene)"
            :style="{backgroundImage: background(scene)}"
        >
        </CardButton>
      </div>
    </div>
  </section>
</template>

<script>
import LightService from '@/services/LightService'
import AssetService from '@/services/AssetService'
import CardButton from '@/components/globals/CardButton'

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
    background(scene) {
      return AssetService.getBackgroundForScene(scene)
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
  display: grid;
  grid-template-rows: min-content;
  grid-auto-columns: min-content;
  grid-gap: var(--size-medium);
  grid-auto-flow: column;
}

.scene {
  background-size: cover;
  background-position: center center;
  display: flex;
  flex-direction: column-reverse;
  padding: 0;
  height: var(--size-double-card-side);
  width: var(--size-double-card-side);
  overflow: hidden;
}

.scene::v-deep {
  justify-content: flex-start;
  align-items: stretch;
}

.scene::v-deep label {
  text-align: center;
  padding: var(--size-medium);
  background-color: var(--color-glass);
}

.scene:hover label {
  color: vaR(--color-accent)
}

@media (orientation: landscape) {
  .scenes {
    grid-template-columns: repeat(var(--landsacpe-count), min-content);
    grid-auto-flow: row;
  }
}
</style>
