<template>
  <main class="app-container">
    <Home style="grid-area: header"></Home>
    <Scenes style="grid-area: scenes"></Scenes>
    <Temperature style="grid-area: temperature"></Temperature>
    <Humidity style="grid-area: humidity"></Humidity>
    <div style="background-color: green; grid-area: lights"></div>

  </main>
</template>

<script>

import Scenes from '@/components/lights/Scenes'
import Temperature from '@/components/climate/Temperature'
import Humidity from '@/components/climate/Humidity'
import Home from '@/components/globals/Home'

export default {
  components: {Home, Humidity, Temperature, Scenes}
}
</script>

<style scoped>
.app-container {
  background-image: var(--gradient-background);
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: var(--size-medium);
  display: grid;
  grid-gap: var(--size-medium);
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas: 'header temperature' 'header humidity' 'scenes lights';
}

/*@media (orientation: landscape) {*/
/*  .app-container {*/
/*    grid-template-rows: 1fr;*/
/*    grid-template-columns: auto 1fr;*/
/*    grid-template-areas: 'navigation content';*/
/*  }*/
/*}*/
</style>
