<template>
  <BottomSheet class="settings-sheet" @closed="$emit('closed')">
    <h1>Settings</h1>
    <div class="settings-actions">
      <CardButton icon="fa-redo" label="reload" @click="reloadPage"></CardButton>
      <CardButton icon="fa-skull" label="restart server" @click="restartService"></CardButton>
    </div>
  </BottomSheet>
</template>

<script>
import BottomSheet from '@/components/globals/BottomSheet'
import config from '@/config.json'
import CardButton from '@/components/globals/CardButton'

export default {
  name: 'SettingsBottomSheet',
  components: {CardButton, BottomSheet},
  methods: {
    reloadPage() {
      window.location.reload()
    },
    restartService() {
      if (!window.confirm('Restart systemd service?')) {
        return
      }
      fetch(`${config.localApiBaseUrl}${config.admin.apiEndpoint}/kill`)
      setTimeout(() => this.reloadPage(), 10000)
    }
  }
}
</script>

<style scoped>
.settings-sheet .settings-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: var(--size-medium);
}

.settings-sheet a {
  display: block;
}
</style>