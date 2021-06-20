<template>
  <div class="app-container">
    <Header></Header>
    <main>
      <h1>Scenes</h1>
      <Scenes></Scenes>

      <h1>Lights</h1>
      <LightBulbs></LightBulbs>

      <h1>Status</h1>
      <Status></Status>

    </main>
  </div>
</template>

<script>

import Header from '@/components/globals/Header'
import LightBulbs from '@/components/lights/LightBulbs'
import Scenes from '@/components/lights/Scenes'
import Status from '@/components/status/Status'

export default {
  components: {Status, Scenes, LightBulbs, Header}
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
  color: var(--color-semihighlight)
}

</style>
