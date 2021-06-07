<template>
  <GridLayout mini="true">
    <CardButton @click="reload()">
      <i class="fas fa-sync"></i>
      <label>reload</label>
    </CardButton>
    <CardButton @click="killsystemD()">
      <i class="fas fa-server"></i>
      <label>kill systemd</label>
    </CardButton>
  </GridLayout>
</template>

<script>
import CardButton from '@/components/globals/CardButton'
import SettingsService from '@/services/SettingsService'
import GridLayout from '@/components/globals/GridLayout'

export default {
  name: 'Settings',
  components: {GridLayout, CardButton},
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    open() {
      this.isOpen = true
    },
    close() {
      this.isOpen = false
    },
    reload() {
      SettingsService.refresh()
    },
    killsystemD() {
      SettingsService.killsystemDService()
    }
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: var(--size-medium);
}

main {
  display: grid;
  grid-gap: var(--size-medium);
  grid-template-columns: repeat(calc(2 * var(--cards-column-count)), 1fr);
}

</style>
