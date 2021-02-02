<template>
  <div class="light" :class="{active: modelValue > 0}">
    <i class="fas fa-lightbulb"></i>
    <label for="brightnessRange">{{ name }}</label>
    <input type="range" min="0" max="100" v-model="modelValue" class="slider" id="brightnessRange"
           @change="setBrightness()">
  </div>
</template>

<script>
import LightService from '@/services/LightService'

export default {
  name: 'LightBulbControl',
  props: ['name'],
  data() {
    return {
      modelValue: 0
    }
  },
  methods: {
    updateValue() {
      this.modelValue = LightService
          .currentLightBulbs
          .find(bulb => bulb.name === this.name)
          .brightness * 100
    },
    async setBrightness() {
      await LightService.setlightBrightness(this.name, this.modelValue / 100)
    }
  },
  created() {
    this.updateValue()
    LightService.registerLightChangeWatcher(() => this.updateValue())
  }
}
</script>

<style scoped>
.light {
  padding: var(--size-big);
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  grid-gap: var(--size-small);
}

.light:not(:last-child) {
  border-bottom: 1px solid var(--color-semihighlight);
}

.light.active {
  color: var(--color-accent-yellow);
}

input[type=range] {
  appearance: none;
  background: var(--color-semihighlight);
  height: var(--size-tiny);
  margin: calc((var(--size-medium) - var(--size-tiny)) / 2) 0;
  outline: none;
  width: 100%;
  -webkit-appearance: none;
}

input[type=range]::-webkit-slider-thumb {
  appearance: none;
  background: var(--color-accent-yellow);
  border-radius: calc(var(--size-medium) / 2);
  cursor: pointer;
  height: var(--size-medium);
  width: var(--size-medium);
  -webkit-appearance: none;
}
</style>