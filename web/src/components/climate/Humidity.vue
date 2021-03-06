<template>
  <Card class="status-humidity">
      <IconHeading icon="fa-tint" :text="`${current}%`"></IconHeading>
      <DataTable :data="stats"></DataTable>
    <AreaGraph class="graph" :values="history"></AreaGraph>
  </Card>
</template>

<script>
import ClimateService from '@/services/ClimateService'
import AreaGraph from '@/components/globals/AreaGraph'
import DataTable from '@/components/globals/DataTable'
import IconHeading from '@/components/globals/IconHeading'
import Card from '@/components/globals/Card'
import config from '@/config.json'

export default {
  name: 'Humidity',
  components: {Card, IconHeading, DataTable, AreaGraph},
  data() {
    return {
      current: {},
      stats: {},
      history: {},
      firstTimeStamp: 0,
      lastUpdateTimeStamp: 0
    }
  },
  methods: {
    async init() {
      this.current = Math.round(100 * (await ClimateService.getCurrent()).humidity)
      this.history = (await ClimateService.getHistory()).map(v => Math.round(100 * v.humidity))

      this.stats = {
        Maximum: `${Math.max(...this.history)}%`,
        Minimum: `${Math.min(...this.history)}%`,
        Average: `${Math.round((this.history).reduce((a, b) => a + b) / this.history.length)}%`
      }}
  },
  async created() {
    await this.init()
    setInterval(async () => this.init(), config.climate.refreshIntervalSeconds * 1000)
  }
}
</script>

<style scoped>
.status-humidity {
  color: var(--color-accent);
  display: flex;
  flex-direction: column;
}

.graph {
  margin-top: var(--size-big);
  flex-grow: 1;
}

.graph::v-deep polyline {
  stroke: vaR(--color-accent)
}
</style>