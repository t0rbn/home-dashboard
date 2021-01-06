<template>
    <main class="app-container">
      <Temperature style="grid-area: temperature"></Temperature>
      <Humidity style="grid-area: humidity"></Humidity>
      <Scenes style="grid-area: scenes"></Scenes>
      <AccentColor style="grid-area: color"></AccentColor>
    </main>
</template>

<script>
import Scenes from '@/components/scenes/Scenes'
import Temperature from '@/components/status/Temperature'
import Humidity from '@/components/status/Humidity'
import AccentColor from '@/components/accent-color/Accentcolor'

export default {
  components: {AccentColor, Humidity, Temperature, Scenes}
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
  grid-template-rows: 2fr 1fr 1fr;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-areas: 'scenes scenes temperature' 'scenes scenes humidity' 'color color humidity';
  padding: var(--size-medium);
}
</style>
