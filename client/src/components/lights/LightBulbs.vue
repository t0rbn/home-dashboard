<template>
  <section>
    <div class="lights-wrapper">
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
    </div>

    <LightBulbControlSheet :light="selectedLight"></LightBulbControlSheet>
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
section {
  display: grid;
  grid-auto-rows: auto 1fr;
  min-height: 0;
  min-width: 0;
}

.lights-wrapper {
  min-height: 0;
  min-width: 0;
  overflow: scroll;
  padding: 0 var(--size-medium);
  margin: 0 calc(-1 * var(--size-medium));
}

.lights {
  display: grid;
  grid-auto-columns: min-content;
  grid-auto-flow: column;
  grid-gap: var(--size-medium);
  grid-template-rows: min-content;
  padding: var(--size-medium) 0;
}

.light {
  background-image: var(--gradient-glass) !important;
  height: var(--size-card-side);
  justify-content: flex-start;
  width: var(--size-card-side);
}

.light i {
  display: block;
  font-size: var(--size-big);
  margin-bottom: var(--size-small);
}

.lights .light.on {
  color: var(--color-background);
  box-shadow: var(--shadow-glow-hightlight);
}

@media (orientation: landscape), (min-width: 64.8rem) {
  .lights {
    grid-template-columns: repeat(calc(var(--landsacpe-count) * 2), min-content);
    grid-auto-flow: row;
  }
}
</style>
