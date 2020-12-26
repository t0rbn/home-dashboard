<template>
    <main class="app-container">
      <Temperature style="grid-area: temperature"></Temperature>
      <Humidity style="grid-area: humidity"></Humidity>
      <Scenes style="grid-area: scenes"></Scenes>
    </main>
</template>

<script>
import Scenes from '@/components/scenes/Scenes'
import Temperature from '@/components/status/Temperature'
import Humidity from '@/components/status/Humidity'

export default {
  components: {Humidity, Temperature, Scenes}
}
</script>

<style scoped>
.app-container {
  box-sizing: border-box;
  margin: 0 auto;
  max-height: 100%;
  min-height: 100%;
  display: grid;
  grid-gap: var(--size-medium);
  grid-template-rows: 1fr 2fr;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: 'temperature humidity' 'scenes scenes';
  padding: var(--size-medium);
}

@media (orientation: landscape) {
  .app-container {
    max-width: max(100vh, 100rem);
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 2fr 1fr;
    grid-template-areas: 'scenes temperature' 'scenes humidity';
  }
}
</style>
