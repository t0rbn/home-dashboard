<template>
  <section class="scenes">
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
.scenes {
  display: grid;
  grid-gap: var(--size-medium);
  grid-template-columns: repeat(var(--cards-column-count), 1fr);
  grid-auto-rows: 1fr;
  grid-auto-flow: dense;
  padding: var(--size-medium) 0;
}

.scene {
  background-position: center center;
  background-size: 100%;
  box-shadow: var(--shadow-default);
  display: flex;
  flex-direction: column-reverse;
  align-items: stretch;
  overflow: hidden;
}

.scene:hover {
  background-size: 110%;
}

.scene::v-deep label {
  backdrop-filter: var(--glass-filter);
  background-color: hsla(0, 0%, 0%, 0.5);
  border-radius: calc(var(--size-small) + (var(--size-medium) / 2));
  color: var(--color-highlight);
  margin: 0;
  padding: var(--size-small);
  text-align: center;
}

</style>
