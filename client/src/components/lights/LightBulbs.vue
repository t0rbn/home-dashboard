<template>
  <section>
    <div class="lights-wrapper">
      <div class="lights">
        <CardButton
            v-for="light in lights"
            class="light"
            :key="light.id"
            :label="light.name" icon="fa-lightbulb"
            :style="{backgroundColor: getBgColorForLight(light)}"
            :class="{on: light.brightness > 0 && light.color.match('#[0-9A-Fa-f]{6}')}"
            @click="selectLight(light)"
        ></CardButton>
      </div>
    </div>

    <BottomSheet class="control-sheet" v-if="selectedLight" @closed="closeSheet">
      <header class="sheet-header">
        <i class="fas fa-lightbulb"></i>
        <h1>{{selectedLight.name}}</h1>
      </header>
      <section>
        <h1>Brightness</h1>
        <input type="range" min="0" max="100" @change="selectBrightness" :value="Math.round(selectedLight.brightness * 100)">
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
          <CardButton class="custom-color-select-button" label="custom" @click="showColorSelector()"></CardButton>
          <input ref="foo" type="color" :value="selectedLight.color" @change="selectCustomColor">
        </div>
      </section>
    </BottomSheet>

  </section>
</template>

<script>
import LightService from '@/services/LightService'
import CardButton from '@/components/globals/CardButton'
import BottomSheet from '@/components/globals/BottomSheet'
import config from '@/config.json'

export default {
  name: 'LightBulbs',
  components: {BottomSheet, CardButton},
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
      this.selectedLight = this.lights.filter(l => l.id === this.selectedLight.id)[0]
    })
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
    selectCustomColor(event) {
      this.selectRgbColor(event.target.value)
    },
    selectBrightness(event) {
      LightService.selectBrightness(this.selectedLight.id, event.target.value / 100)
    },
    closeSheet() {
      this.selectedLight = null;
    },
    showColorSelector() {
      this.$refs.foo.click();
    }
  }
}
</script>

<style scoped>
h1 {
  margin-bottom: var(--size-medium);
}

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
  width: var(--size-card-side);
}

.lights .light.on {
  color: var(--color-background);
}

.control-sheet .sheet-header {
  align-items: center;
  display: flex;
  flex-direction: column;
}

.control-sheet .sheet-header i {
  font-size: var(--size-huge);
  line-height: var(--size-huge);
}

.control-sheet section {
  margin-top: var(--size-huge);
}

.color-selector {
  display: grid;
  grid-auto-rows: var(--size-huge);
  grid-gap: var(--size-medium);
  grid-template-columns: repeat(3, 1fr);
}

.color-selector::v-deep > * {
  background-image: var(--gradient-glass);
}

.color-selector input[type=color] {
  opacity: 0;
}

.custom-color-select-button {
  background-image: linear-gradient(to right, red, pink, orange, cyan);
  color: var(--color-background);
}

.custom-color-select-button:hover {
  color: var(--color-background);
}

@media (orientation: landscape) {
  .lights {
    grid-template-columns: repeat(calc(var(--landsacpe-count) * 2), min-content);
    grid-auto-flow: row;
  }
}
</style>