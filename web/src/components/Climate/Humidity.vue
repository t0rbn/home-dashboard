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
import IconHeading from '@/components/globals/IconHeading'
import Card from '@/components/globals/Card'
import config from '@/config.json'
import DataTable from '@/components/globals/DataTable'

export default {
  name: 'Humidity',
  components: {DataTable, Card, IconHeading, AreaGraph},
  data() {
    return {
      current: '',
      history: [],
      stats: {}
    }
  },
  methods: {
    async init() {
      this.history = (await ClimateService.getHumidities()).map(h => Math.round(100 * h))
      this.current = this.history.length ? this.history[this.history.length - 1] : -1,
          this.stats = {
            Maximum: `${Math.max(...this.history)}%`,
            Minimum: `${Math.min(...this.history)}%`,
            Average: `${Math.round((this.history).reduce((a, b) => a + b) / this.history.length)}%`
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
.status-humidity {
  color: var(--color-accent);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content min-content 1fr;
}


.graph {
  min-width: 0;
  min-height: 0;
  margin-top: var(--size-big);
}

.graph::v-deep polyline {
  stroke: vaR(--color-accent)
}
</style>