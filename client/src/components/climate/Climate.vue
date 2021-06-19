<template>
  <GridLayout>
    <CardButton>
      <h1>{{ data.temp }}°C</h1>
      <label>Temperature</label>
    </CardButton>

    <CardButton>
      <h1>{{ Math.round(data.humidity * 100) }}%</h1>
      <label>Humidity</label>
    </CardButton>
  </GridLayout>
</template>

<script>
import GridLayout from '@/components/globals/GridLayout'
import ClimateService from '@/services/ClimateService'
import CardButton from '@/components/globals/CardButton'

export default {
  name: 'Climate',
  components: {CardButton, GridLayout},


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
h1 {
  font-size: var(--size-huge);
  line-height: var(--size-huge);
}
</style>
