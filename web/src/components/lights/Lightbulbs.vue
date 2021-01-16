<template>
  <div>
    <h1>Lights</h1>
    <div class="bulbs-list">
      <LightBulbControl v-for="(light, index) in allLights"
                        :key="light.name"
                        class="flyin-up"
                        :style="{animationDelay: `${50 * index}ms`}"
                        :name="light.name">

      </LightBulbControl>
    </div>
  </div>
</template>

<script>
import LightService from '@/services/LightService'
import LightBulbControl from '@/components/lights/LightBulbControl'

export default {
  name: 'LightBulbs',
  components: {LightBulbControl},
  data() {
    return {
      allLights: []
    }
  },
  created() {
    LightService.registerLightChangeWatcher(() => this.allLights = LightService.currentLightBulbs)
    LightService.updateLights()
  }
}
</script>

<style scoped>
.bulbs-list {
  grid-gap: var(--size-medium);
  grid-template-columns: 1fr;
  display: grid;
  margin-bottom: var(--size-medium);
}

@media (orientation: landscape) {
  .bulbs-list {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>