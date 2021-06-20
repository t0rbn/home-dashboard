<template>
  <CardButton class="card">
    <StatusDataEntry icon="fa-thermometer-three-quarters" label="Temperature" :text="`${data.temp}°C`"></StatusDataEntry>
    <StatusDataEntry icon="fa-tint" label="Humidity" :text="`${Math.round(100 * data.humidity)}%`"></StatusDataEntry>
  </CardButton>
</template>

<script>
import ClimateService from '@/services/ClimateService'
import CardButton from '@/components/globals/CardButton'
import StatusDataEntry from '@/components/status/StatusDataEntry'

export default {
  name: 'Climate',
  components: {StatusDataEntry, CardButton},


  data() {
    return {
      data: {temp: -1, humidity: -1}
    }
  },
  methods: {
    async init() {
      this.data = (await ClimateService.getData())
    }
  },
  async created() {
    await this.init()
    setInterval(async () => this.init(), 60000)
  }
}
</script>

<style scoped>
.card > * {
  margin-bottom: var(--size-big);
}
</style>
