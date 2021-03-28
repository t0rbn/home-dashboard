<template>
  <section>
    <div class="scenes-wrapper">
      <div class="scenes">
        <CardButton
            class="scene"
            v-for="(scene) in scenes"
            :key="scene"
            @click="triggerScene(scene)"
            :style="{backgroundImage: background(scene)}"
        >
          <label>{{scene !== 'ALLOFF' ? scene : 'Off'}}
          </label>
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
  display: grid;
  grid-auto-rows: auto 1fr;
  min-height: 0;
  min-width: 0;
}

.scenes-wrapper {
  margin: 0 calc(-1 * var(--size-medium));
  min-height: 0;
  min-width: 0;
  overflow: scroll;
  padding: 0 var(--size-medium);
}

.scenes {
  display: grid;
  grid-auto-columns: min-content;
  grid-auto-flow: column;
  grid-gap: var(--size-medium);
  grid-template-rows: min-content;
  padding: var(--size-medium) 0;
}

.scene {
  background-position: center center;
  background-size: cover;
  box-shadow: var(--shadow-default);
  display: flex;
  flex-direction: column-reverse;
  height: var(--size-double-card-side);
  overflow: hidden;
  width: var(--size-double-card-side);
}

.scene::v-deep {
  align-items: stretch;
}

.scene::v-deep label {
  backdrop-filter: var(--glass-filter);
  background-color: hsla(0, 0%, 0%, 0.5);
  border-radius: calc(var(--size-small) + (var(--size-medium) / 2));
  color: var(--color-highlight);
  padding: var(--size-small);
  text-align: center;
}

.scene:hover label {
  color: var(--color-accent)
}

@media (orientation: landscape) {
  .scenes {
    grid-auto-flow: row;
    grid-template-columns: repeat(var(--landsacpe-count), min-content);
  }
}
</style>
