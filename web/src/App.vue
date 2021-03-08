<template>
  <div class="app-container">
    <Home></Home>
    <main>
      <Scenes></Scenes>
      <LightBulbs></LightBulbs>
      <Climate></Climate>
    </main>
  </div>
</template>

<script>

import Home from '@/components/globals/Home'
import Climate from '@/components/Climate/Climate'
import LightBulbs from '@/components/lights/LightBulbs'
import Scenes from '@/components/lights/Scenes'

export default {
  components: {Scenes, Climate, LightBulbs, Home}
}
</script>

<style scoped>
.app-container {
  background-color: var(--color-background);
  background-image: var(--gradient-background);
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  grid-template-rows: auto 1fr;
}

main {
  overflow: scroll;
  padding: var(--size-medium);
  display: grid;
  grid-auto-rows: min-content;
}

main > * {
  margin-top: var(--size-big);
}

@media (orientation: landscape) {
  main {
    grid-template-rows: minmax(min-content, 1fr);
  }
}
</style>
