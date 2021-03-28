<template>

  <BottomSheet class="control-sheet" v-if="open" @closed="closeSheet">
    <header class="sheet-header">
      <i class="fas fa-lightbulb"></i>
      <h1>{{ light.name }}</h1>
    </header>
    <section>
      <h1>Brightness</h1>
      <input type="range" min="0" max="100" @change="selectBrightness" :value="Math.round(light.brightness * 100)">
    </section>
    <section v-if="light.spectrum === 'white'">
      <h1>Color Temperature</h1>
      <div class="color-selector">
        <CardButton
            v-for="color in getWhiteColors()"
            :key="color" :style="{backgroundColor: color}"
            @click="selectColorTemperature(getWhiteColors().indexOf(color) / (getWhiteColors().length -1))"
        ></CardButton>
      </div>
    </section>
    <section v-if="light.spectrum === 'rgb'">
      <h1>Color</h1>
      <div class="color-selector">
        <CardButton
            v-for="color in getRgbColors()"
            :key="color" :style="{backgroundColor: color}"
            @click="selectRgbColor(color)"
        ></CardButton>
        <CardButton class="custom-color-select-button" label="custom" @click="showColorSelector()"></CardButton>
        <input ref="customColor" type="color" :value="light.color" @change="selectCustomColor">
      </div>
    </section>
  </BottomSheet>

</template>

<script>
import BottomSheet from '@/components/globals/BottomSheet'
import CardButton from '@/components/globals/CardButton'
import config from '@/config.json'
import LightService from '@/services/LightService'

export default {
  name: 'LightBulbControlSheet',
  components: {CardButton, BottomSheet},
  props: ['light'],
  data() {
    return {
      open: false
    }
  },
  watch: {
    light: function (light) {
      this.open = !!light
    }
  },
  methods: {
    getWhiteColors() {
      return config.lights.whiteColors
    },
    selectColorTemperature(percent) {
      LightService.selectColorTemperature(this.light.id, percent)
    },
    getRgbColors() {
      return config.lights.rgbColors
    },
    selectRgbColor(color) {
      LightService.selectRgbColor(this.light.id, color)
    },
    selectCustomColor(event) {
      this.selectRgbColor(event.target.value)
    },
    selectBrightness(event) {
      LightService.selectBrightness(this.light.id, event.target.value / 100)
    },
    closeSheet() {
      this.open = false
    },
    showColorSelector() {
      this.$refs.customColor.click()
    }
  }
}
</script>

<style scoped>
h1 {
  margin-bottom: var(--size-medium);
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
</style>