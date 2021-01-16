<template>
  <Card class="light" :class="{active: modelValue > 0}">
    <i class="fas fa-lightbulb"></i>
    <label for="brightnessRange">{{ name }}</label>
    <input type="range" min="0" max="100" v-model="modelValue" class="slider" id="brightnessRange"
           @change="setBrightness()">
  </Card>
</template>

<script>
import LightService from '@/services/LightService'
import Card from '@/components/globals/Card'

export default {
  name: 'LightBulbControl',
  components: {Card},
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
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  grid-gap: var(--size-small);
}

.light.active {
  color: vaR(--color-elevation);
  background-image: var(--gradient-yellow-blue);
}

input[type=range] {
  width: 100%;
  -webkit-appearance: none; /* Override default CSS styles */
  appearance: none;
  margin: calc((var(--size-medium) - var(--size-tiny)) / 2) 0;
  height: var(--size-tiny); /* Specified height */
  background: var(--color-highlight); /* Grey background */
  outline: none; /* Remove outline */
}

input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none; /* Override default look */
  appearance: none;
  width: var(--size-medium); /* Set a specific slider handle width */
  height: var(--size-medium); /* Slider handle height */
  background: var(--color-accent-yellow); /* Green background */
  border-radius: calc(var(--size-medium) / 2);
  cursor: pointer; /* Cursor on hover */
}

.light.active input[type=range] {
  background: var(--color-elevation); /* Grey background */
}

.light.active input[type=range]::-webkit-slider-thumb {
  background: var(--color-background);
}
</style>