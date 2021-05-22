<template>
  <BottomSheet class="control-sheet" v-if="isOpen" @closed="close()">
    <header>
      <h1>Settings</h1>
    </header>
    <main>
      <CardButton @click="reload()">
        <i class="fas fa-sync"></i>
        <label>reload</label>
      </CardButton>
      <CardButton @click="killsystemD()">
        <i class="fas fa-server"></i>
        <label>kill systemd</label>
      </CardButton>
    </main>
  </BottomSheet>
</template>

<script>
import BottomSheet from '@/components/globals/BottomSheet'
import CardButton from '@/components/globals/CardButton'
import SettingsService from '@/services/SettingsService'

export default {
  name: 'SettingsSheet',
  components: {CardButton, BottomSheet},
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    open()  {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false
    },
    reload() {
      SettingsService.refresh();
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
