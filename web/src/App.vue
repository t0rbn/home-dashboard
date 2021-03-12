<template>
  <div class="app-container">
    <Header></Header>
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
import Climate from '@/components/Climate/Climate'
import LightBulbs from '@/components/lights/LightBulbs'
import Scenes from '@/components/lights/Scenes'

export default {
  components: {Scenes, Climate, LightBulbs, Header}
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
