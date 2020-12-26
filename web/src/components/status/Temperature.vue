<template>
  <Card class="status-temperature" :title="`${current}°C`" icon="fa-thermometer-three-quarters">
    <div>
      <DataTable :data="stats"></DataTable>
    </div>
    <AreaGraph class="graph" :values="history"></AreaGraph>
  </Card>
</template>

<script>
import ClimateService from '@/components/status/ClimateService'
import AreaGraph from '@/components/globals/AreaGraph'
import DataTable from '@/components/globals/DataTable'
import Card from '@/components/globals/Card'

export default {
  name: 'Temperature',
  components: {Card, DataTable, AreaGraph},
  data() {
    return {
      current: {},
      stats: {},
      history: {},
      firstTimeStamp: 0,
      lastUpdateTimeStamp: 0
    }
  },
  async created() {
    this.current = (await ClimateService.getCurrent()).temp
    this.history = (await ClimateService.getHistory()).map(v => v.temp)

    this.stats = {
      Maximum: `${Math.max(...this.history)}°`,
      Minimum: `${Math.min(...this.history)}°`,
      Average: `${Math.round((this.history).reduce((a, b) => a + b) / this.history.length)}°`
    }
  }
}
</script>

<style scoped>
.status-temperature {
  background-image: var(--gradient-red-yellow);
  color: var(--color-elevation);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.graph {
  flex-grow: 1;
  margin: var(--size-big) calc(-1 * var(--size-big)) calc(-1 * var(--size-big));
}
</style>