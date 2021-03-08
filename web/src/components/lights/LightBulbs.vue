<template>
  <section>
    <h1>Lights</h1>
    <div class="lights-wrapper">
      <div class="lights">
        <CardButton
            v-for="light in lights"
            class="light"
            :key="light.id"
            :label="light.name" icon="fa-lightbulb"
            :style="{backgroundColor: getBgColorForLight(light)}"
            :class="{on: light.brightness > 0}"
            @click="selectLight(light)"
        ></CardButton>
      </div>
    </div>

    <BottomSheet v-if="selectedLight.id">
      <icon-heading icon="fa-lightbulb" :text="selectedLight.name"></icon-heading>
      <section>
        <h1>Brightness</h1>
        <input type="range" min="0" max="100" @change="selectBrightness">
      </section>
      <section v-if="selectedLight.spectrum === 'white'">
        <h1>Color Temperature</h1>
        <div class="color-selector">
          <CardButton
              v-for="color in getWhiteColors()"
              :key="color" :style="{backgroundColor: color}"
              @click="selectColorTemperature(getWhiteColors().indexOf(color) / (getWhiteColors().length -1))"
          ></CardButton>
        </div>
      </section>
      <section v-if="selectedLight.spectrum === 'rgb'">
        <h1>Color</h1>
        <div class="color-selector">
          <CardButton
              v-for="color in getRgbColors()"
              :key="color" :style="{backgroundColor: color}"
              @click="selectRgbColor(color)"
          ></CardButton>
        </div>
      </section>
    </BottomSheet>

  </section>
</template>

<script>
import LightService from '@/services/LightService'
import CardButton from '@/components/globals/CardButton'
import BottomSheet from '@/components/globals/BottomSheet'
import IconHeading from '@/components/globals/IconHeading'
import config from '@/config.json'

export default {
  name: 'LightBulbs',
  components: {IconHeading, BottomSheet, CardButton},
  data() {
    return {
      lights: [],
      selectedLight: {}
    }
  },
  async created() {
    this.lights = await LightService.getLightBulbs()
    LightService.registerLightChangeWatcher(async () => this.lights = await LightService.getLightBulbs())
  },
  methods: {
    getBgColorForLight(light) {
      if (light.brightness === 0) {
        return
      }
      return light.color
    },
    selectLight(light) {
      this.selectedLight = light
    },
    getWhiteColors() {
      return config.lights.whiteColors
    },
    selectColorTemperature(percent) {
      LightService.selectColorTemperature(this.selectedLight.id, percent)
    },
    getRgbColors() {
      return config.lights.rgbColors
    },
    selectRgbColor(color) {
      LightService.selectRgbColor(this.selectedLight.id, color)
    },
    selectBrightness(event) {
      console.table(event.target.value)
      LightService.selectBrightness(this.selectedLight.id, event.target.value / 100)
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

.lights-wrapper {
  overflow: scroll;
  min-width: 0;
  min-height: 0;
}

.lights {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 1fr;
  grid-gap: var(--size-medium);
}

.lights .light.on {
  color: var(--color-background);
}

.color-selector {
  display: grid;;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: min-content;
  grid-gap: var(--size-medium);
}

/*@media (orientation: landscape) {*/
  .lights {
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
  }
/*}*/
</style>