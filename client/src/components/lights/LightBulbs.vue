<template>
  <section>
      <div class="lights">
        <CardButton
            v-for="light in lights"
            class="light"
            :key="light.id"
            :style="{backgroundColor: getBgColorForLight(light)}"
            :class="{on: light.brightness > 0}"
            @click="selectLight(light)"
        >
          <i class="fas fa-lightbulb"></i>
          <label>{{ light.name }}</label>
        </CardButton>
      </div>

    <LightBulbControlSheet :light="selectedLight" @closed="selectLight(null)"></LightBulbControlSheet>
  </section>
</template>

<script>
import LightService from '@/services/LightService'
import CardButton from '@/components/globals/CardButton'
import LightBulbControlSheet from '@/components/lights/LightBulbControlSheet'

export default {
  name: 'LightBulbs',
  components: {LightBulbControlSheet, CardButton},
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

.lights {
  display: grid;
  grid-template-columns: repeat(calc( 2 * var(--cards-column-count)), 1fr);
  grid-gap: var(--size-medium);
  padding: var(--size-medium) 0;
}

.light {
  aspect-ratio: 1;
  background-image: var(--gradient-glass) !important;
}

.light i {
  display: block;
  font-size: var(--size-big);
  margin-bottom: var(--size-small);
}

.lights .light.on {
  background-image: var(--gradient-glass) !important;
  box-shadow: var(--shadow-glow-hightlight);
  color: var(--color-background);
}
</style>
