<template>
  <Card class="status-temperature">
    <IconHeading icon="fa-thermometer-three-quarters" :text="`${current}°C`"></IconHeading>
    <div>
      <DataTable :data="stats"></DataTable>
    </div>
    <AreaGraph class="graph" :values="history"></AreaGraph>
  </Card>
</template>

<script>
import ClimateService from '@/services/ClimateService'
import AreaGraph from '@/components/globals/AreaGraph'
import DataTable from '@/components/globals/DataTable'
import Card from '@/components/globals/Card'
import IconHeading from '@/components/globals/IconHeading'

export default {
  name: 'Temperature',
  components: {IconHeading, Card, DataTable, AreaGraph},
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