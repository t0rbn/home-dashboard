<template>
  <div class="app-container">
    <Header @settings="triggerSettings"></Header>
    <main>
      <h1>Scenes</h1>
      <Scenes></Scenes>

      <h1>Lights</h1>
      <LightBulbs></LightBulbs>

      <h1>Climate</h1>
      <Climate></Climate>
    </main>
  </div>
</template>

<script>

import Header from '@/components/globals/Header'
import Climate from '@/components/climate/Climate'
import LightBulbs from '@/components/lights/LightBulbs'
import Scenes from '@/components/lights/Scenes'

export default {
  components: {Scenes, Climate, LightBulbs, Header},
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
}

main h1 {
  color: var(--color-accent);
  margin-top: var(--size-huge);
}

@media (orientation: landscape) {
  main {
    margin: 0 auto;
    width: fit-content;
  }
}
</style>
