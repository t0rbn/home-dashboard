<template>
  <div class="app-container">
    <Header @openSettings="openSettings()"></Header>
    <main>
      <h1>Scenes</h1>
      <Scenes></Scenes>

      <h1>Lights</h1>
      <LightBulbs></LightBulbs>

      <h1>Climate</h1>
      <Climate></Climate>

      <SettingsSheet ref="settingsSheet"></SettingsSheet>
    </main>
  </div>
</template>

<script>

import Header from '@/components/globals/Header'
import Climate from '@/components/climate/Climate'
import LightBulbs from '@/components/lights/LightBulbs'
import Scenes from '@/components/lights/Scenes'
import SettingsSheet from '@/components/settings/SettingsSheet'

export default {
  components: {SettingsSheet, Scenes, Climate, LightBulbs, Header},
  methods: {
    openSettings() {
      this.$refs.settingsSheet.open()
    }
  }
}
</script>

<style scoped>
.app-container {
  bottom: 0;
  box-sizing: border-box;
  left: 0;
  overflow: scroll;
  position: absolute;
  right: 0;
  top: 0;
}

main {
  padding: var(--size-medium);
  padding-top: 0;
  box-sizing: border-box;
  margin: 0 auto;
  max-width: 60rem;
}

main h1 {
  margin-top: var(--size-huge);
  margin-bottom: var(--size-medium);
}

</style>
