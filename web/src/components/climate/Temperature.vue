<template>
  <div class="status-temperature">
    <IconHeading class="data" icon="fa-thermometer-three-quarters" :text="`${current}°C`"></IconHeading>
    <div class="data" >
      <DataTable :data="stats"></DataTable>
    </div>
    <AreaGraph class="graph" :values="history"></AreaGraph>
  </div>
</template>

<script>
import ClimateService from '@/services/ClimateService'
import AreaGraph from '@/components/globals/AreaGraph'
import DataTable from '@/components/globals/DataTable'
import IconHeading from '@/components/globals/IconHeading'

export default {
  name: 'Temperature',
  components: {IconHeading, DataTable, AreaGraph},
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
  color: var(--color-accent-red);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.status-temperature .data {
  margin-left: var(--size-medium);
}

.graph {
  background-image: var(--gradient-red-yellow);
  flex-grow: 1;
  margin: var(--size-big) calc(-1 * var(--size-big)) calc(-1 * var(--size-big));
}
</style>