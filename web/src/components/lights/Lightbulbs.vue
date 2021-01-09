<template>
 <div>
   <h1>Lights</h1>
    <div class="lights-grid">
      <template v-for="light in currentlyOn">
        <div  class="light" :class="{active: light.brightness > 0}" :key="light.name">
          <i class="fas fa-lightbulb"></i>
          {{ light.name }}<span v-show="light.brightness > 0"> ({{Math.round(light.brightness)}}%)</span>
        </div>
      </template>
    </div>
 </div>
</template>

<script>
import LightService from '@/services/LightService'

export default {
  name: 'LightBulbs',
  data() {
    return {
      currentlyOn: []
    }
  },
  created() {
    this.update()
    LightService.registerLightChangeWatcher(() => this.update())
  },
  methods: {
    async update() {
      this.currentlyOn = (await LightService.getLights()).filter(l => l.brightness > 0)
    },
    getTableData() {
      const returnMe = {}
      this.currentlyOn.forEach(l => returnMe[l.name] = Math.round(l.brightness) + '%')
      return returnMe
    }
  }
}
</script>

<style scoped>
.lights-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: auto;
}

.light {
  border: var(--size-tiny) solid var(--color-elevation);
  border-radius: var(--shadow-default);
  padding: var(--size-medium);
  text-align: center;
}

.light i {
  font-size: var(--size-big);
  line-height: var(--size-big);
  margin-bottom: var(--size-small);
  display: block;
}

.light.active {
  color: var(--color-accent-yellow);
  box-shadow: var(--shadow-glow-yellow);
}
</style>