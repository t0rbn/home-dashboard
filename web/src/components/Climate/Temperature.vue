<template>
  <div class="status-temperature">
    <div>
      <IconHeading icon="fa-thermometer-three-quarters" :text="`${current}°C`"></IconHeading>
      <DataTable :data="stats"></DataTable>
    </div>
    <AreaGraph class="graph" :values="history"></AreaGraph>
  </div>
</template>

<script>
import ClimateService from '@/services/ClimateService'
import AreaGraph from '@/components/globals/AreaGraph'
import IconHeading from '@/components/globals/IconHeading'
import config from '@/config.json'
import DataTable from '@/components/globals/DataTable'

export default {
  name: 'Temperature',
  components: {DataTable, IconHeading, AreaGraph},
  data() {
    return {
      current: '',
      history: [],
      stats: {}
    }
  },
  methods: {
    async init() {
      this.history = (await ClimateService.getTemperatures())
      this.current = this.history.length ? this.history[this.history.length - 1] : -1
      this.stats = {
        Maximum: `${Math.max(...this.history)}°`,
        Minimum: `${Math.min(...this.history)}°`,
        Average: `${Math.round((this.history).reduce((a, b) => a + b) / this.history.length)}°`
      }
    }
  },
  async created() {
    await this.init()
    setInterval(async () => this.init(), config.climate.refreshIntervalSeconds * 1000)
  }
}
</script>

<style scoped>
.status-temperature {
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-rows: 1fr;
  grid-gap: var(--size-big);
  box-sizing: border-box;
  background-color: vaR(--color-glass);

  border-radius: var(--border-radius-default);
  padding: var(--size-medium);
  height: var(--size-card-side);
}

</style>