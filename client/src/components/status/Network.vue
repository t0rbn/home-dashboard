<template>
  <CardButton class="card">
    <h1>Network</h1>
    <StatusDataEntry icon="fa-cloud-download-alt" label="Download"
                     :text="`${Math.round(100 * data.downloadMbps) / 100} mbps`"></StatusDataEntry>
    <StatusDataEntry icon="fa-stopwatch" label="Ping" :text="`${Math.round(data.ping)} ms`"></StatusDataEntry>
  </CardButton>
</template>

<script>
import NetworkService from '@/services/NetworkService'
import CardButton from '@/components/globals/CardButton'
import StatusDataEntry from '@/components/status/StatusDataEntry'

export default {
  name: 'Network',
  components: {StatusDataEntry, CardButton},
  data() {
    return {
      data: {downloadMbps: -1, ping: -1}
    }
  },
  methods: {
    async init() {
      this.data = (await NetworkService.getData())
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
