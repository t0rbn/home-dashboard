<template>
 <GridLayout>
    <CardButton
        class="scene"
        v-for="(scene) in scenes"
        :key="scene"
        @click="triggerScene(scene)"
        :style="{backgroundImage: background(scene)}"
    >
      <label>{{ scene !== 'ALLOFF' ? scene : 'Off' }}
      </label>
    </CardButton>
 </GridLayout>
</template>

<script>
import LightService from '@/services/LightService'
import CardButton from '@/components/globals/CardButton'
import GridLayout from '@/components/globals/GridLayout'

export default {
  name: 'Scenes',
  components: {GridLayout, CardButton},
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
      return `url('/scenes/${scene}.jpg')`
    }
  }
}
</script>

<style scoped>
.scene {
  background-position: center center;
  background-size: 100%;
  display: flex;
  flex-direction: column-reverse;
}

.scene:hover {
  background-size: 110%;
}

.scene label {
  backdrop-filter: var(--glass-filter);
  background-color: hsla(0, 0%, 0%, 0.5);
  color: var(--color-highlight);
  margin: 0;
  padding: var(--size-medium);
  text-align: center;
}

.scene::v-deep {
  padding: 0;
  overflow: hidden;
}

</style>
