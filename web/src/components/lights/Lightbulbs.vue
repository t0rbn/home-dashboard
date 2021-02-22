<template>
  <div>
    <h1>Lights</h1>
    <LightBulbControl v-for="(light, index) in allLights"
                      :key="light.name"
                      class="flyin-up light"
                      :style="{animationDelay: `${50 * index}ms`}"
                      :name="light.name">
    </LightBulbControl>
  </div>
</template>

<script>
import LightService from '@/services/LightService'
import LightBulbControl from '@/components/lights/LightBulbControl'
import config from '@/config.json'

export default {
  name: 'LightBulbs',
  components: {LightBulbControl},
  data() {
    return {
      allLights: []
    }
  },
  methods: {
    init() {
      LightService.registerLightChangeWatcher(() => this.allLights = LightService.currentLightBulbs)
      LightService.updateLights()
    }
  },
  created() {
    this.init()
    setInterval(() => this.init(), config.lights.refreshIntervalSeconds * 1000)
  }
}
</script>

<style scoped>
.light {
  margin-bottom: vaR(--size-medium);
}
</style>