<template>
  <Card :title="`${currentlyOn.length} lights on`" icon="fa-lightbulb">
    <div class="lights-grid">
      <template v-for="light in currentlyOn">
        <div :key="light.name">{{ light.name }}</div>
        <ProgressBar :key="light.name" class="light-bar" :value="light.brightness / 100"></ProgressBar>
      </template>
    </div>
  </Card>
</template>

<script>
import LightService from '@/components/scenes/LightService'
import Card from '@/components/globals/Card'
import ProgressBar from '@/components/globals/ProgressBar'

export default {
  name: 'Lightbulbs',
  components: {ProgressBar, Card},
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
.light-bar {
  display: block;
  height: var(--size-medium);
  margin-bottom: var(--size-medium);
  margin-left: var(--size-medium);
}

.lights-grid {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-auto-rows: auto;

}
</style>