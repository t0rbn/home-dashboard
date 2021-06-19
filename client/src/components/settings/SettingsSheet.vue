<template>
  <BottomSheet v-if="isOpen" @closed="close()">
    <header class="sheet-header">
      <i class="fas fa-cog"></i>
      <h1>Settings</h1>
    </header>
    <GridLayout mini="true">
      <CardButton @click="refresh()">
        <i class="fas fa-sync"></i>
        <label>Reload App</label>
      </CardButton>
      <CardButton @click="restartSystemD()">
        <i class="fas fa-server"></i>
        <label>Restart SystemD</label>
      </CardButton>
      <CardButton @click="restartTradfri()">
        <i class="fas fa-lightbulb"></i>
        <label>Reboot Tradfri</label>
      </CardButton>
    </GridLayout>
  </BottomSheet>
</template>

<script>
import BottomSheet from '@/components/globals/BottomSheet'
import GridLayout from '@/components/globals/GridLayout'
import CardButton from '@/components/globals/CardButton'
import SettingsService from '@/services/SettingsService'

export default {
  name: 'SettingsSheet',
  components: {CardButton, GridLayout, BottomSheet},
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
    refresh() {
      SettingsService.refresh()
    },
    restartSystemD() {
      SettingsService.restartSystemDService()
    },
    restartTradfri() {
      SettingsService.restartTradfriGateWay()
    }
  }
}
</script>

<style scoped>
.sheet-header {
  align-items: center;
  display: flex;
  flex-direction: column;
}

 .sheet-header i {
  font-size: var(--size-huge);
  line-height: var(--size-huge);
}
</style>
