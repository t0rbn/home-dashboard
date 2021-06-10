<template>
  <section>
    <GridLayout mini="true">
      <CardButton
          v-for="light in lights"
          class="light"
          :key="light.id"
          :style="{backgroundColor: getBgColorForLight(light), boxShadow: `0 0 var(--size-small) 0 ${getBgColorForLight(light)}`}"
          :class="{on: light.brightness > 0}"
          @click="selectLight(light)"
      >
        <i class="fas fa-lightbulb"></i>
        <label>{{ light.name }}</label>
      </CardButton>
    </GridLayout>
    <LightBulbControlSheet :light="selectedLight" @closed="selectLight(null)"></LightBulbControlSheet>
  </section>
</template>

<script>
import LightService from '@/services/LightService'
import CardButton from '@/components/globals/CardButton'
import LightBulbControlSheet from '@/components/lights/LightBulbControlSheet'
import GridLayout from '@/components/globals/GridLayout'

export default {
  name: 'LightBulbs',
  components: {GridLayout, LightBulbControlSheet, CardButton},
  data() {
    return {
      lights: [],
      selectedLight: null
    }
  },
  async created() {
    this.lights = await LightService.getLightBulbs()
    LightService.registerLightChangeWatcher(async () => {
      this.lights = await LightService.getLightBulbs()
    })
  },
  methods: {
    getBgColorForLight(light) {
      if (light.brightness === 0 || !light.color.match('#[0-9A-Fa-f]{6}')) {
        return
      }
      return light.color
    },
    selectLight(light) {
      this.selectedLight = light
    }
  }
}
</script>

<style scoped>

.light {
  background-image: var(--gradient-glass) !important;
}

.light.on {
  background-image: var(--gradient-glass) !important;
  color: var(--color-background);
}
</style>
