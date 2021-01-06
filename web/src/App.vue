<template>
    <main class="app-container">
      <Temperature style="grid-area: temperature"></Temperature>
      <Humidity style="grid-area: humidity"></Humidity>
      <Scenes style="grid-area: scenes"></Scenes>
      <AccentColor style="grid-area: color"></AccentColor>
      <PowerOff style="grid-area: poweroff"></PowerOff>
    </main>
</template>

<script>
import Scenes from '@/components/scenes/Scenes'
import Temperature from '@/components/status/Temperature'
import Humidity from '@/components/status/Humidity'
import AccentColor from '@/components/accent-color/Accentcolor'
import PowerOff from '@/components/power-off/PowerOff'

export default {
  components: {PowerOff, AccentColor, Humidity, Temperature, Scenes}
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
  grid-template-rows: 3fr 2fr 1fr;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-areas: 'scenes scenes temperature' 'scenes scenes humidity' 'poweroff color humidity';
  padding: var(--size-medium);
}
</style>
