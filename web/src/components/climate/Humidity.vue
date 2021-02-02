<template>
  <div class="status-humidity">
    <IconHeading class="data" icon="fa-tint" :text="`${current}%`"></IconHeading>
    <div>
      <DataTable class="data" :data="stats"></DataTable>
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
  name: 'Humidity',
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
    this.current = Math.round(100 * (await ClimateService.getCurrent()).humidity)
    this.history = (await ClimateService.getHistory()).map(v => Math.round(100 * v.humidity))

    this.stats = {
      Maximum: `${Math.max(...this.history)}%`,
      Minimum: `${Math.min(...this.history)}%`,
      Average: `${Math.round((this.history).reduce((a, b) => a + b) / this.history.length)}%`
    }
  }
}
</script>

<style scoped>
.status-humidity {
  color: var(--color-accent-blue);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.status-humidity .data {
  margin-left: var(--size-medium);
}

.graph {
  background-image: var(--gradient-yellow-blue);
  flex-grow: 1;
  margin: var(--size-big) calc(-1 * var(--size-big)) calc(-1 * var(--size-big));
}

</style>