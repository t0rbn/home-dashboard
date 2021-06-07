<template>
  <GridLayout mini="true">
    <CardButton>
      <i class="fas fa-thermometer-three-quarters"></i>
      <label>{{ data.temp }}°C</label>
    </CardButton>

    <CardButton>
      <i class="fas fa-tint"></i>
      <label>{{ data.humidity * 100 }}%</label>
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
</style>
