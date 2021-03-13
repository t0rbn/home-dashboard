<template>
  <div class="app-container">
    <Header @click.native="triggerSettings"></Header>
    <main>
      <h1>Scenes</h1>
      <Scenes></Scenes>

      <h1>Lights</h1>
      <LightBulbs></LightBulbs>

      <h1>Climate</h1>
      <Climate></Climate>

      <SettingsBottomSheet v-if="settingsOpen" @closed="triggerSettings()"></SettingsBottomSheet>
    </main>
  </div>
</template>

<script>

import Header from '@/components/globals/Header'
import Climate from '@/components/Climate/Climate'
import LightBulbs from '@/components/lights/LightBulbs'
import Scenes from '@/components/lights/Scenes'
import SettingsBottomSheet from '@/components/globals/SettingsBottomSheet'

export default {
  components: {SettingsBottomSheet, Scenes, Climate, LightBulbs, Header},
  data() {
    return {
      settingsOpen: false
    }
  },
  methods: {
    triggerSettings() {
      this.settingsOpen = !this.settingsOpen
    }
  }
}
</script>

<style scoped>
.app-container, .app-container main {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

main {
  overflow: scroll;
  padding: var(--size-medium);
  margin-top: 1rem;
  /*display: grid;*/
  /*grid-auto-rows: min-content;*/
}

main h1 {
  margin-top: var(--size-huge);
}

@media (orientation: landscape) {
  main {
    margin: 0 auto;
    width: fit-content;
  }
}
</style>
