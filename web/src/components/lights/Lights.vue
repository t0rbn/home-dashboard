<template>
  <Page name="Lights">
    <div class="lights">
      <AccentColor></AccentColor>
      <LightBulbs></LightBulbs>
    </div>
  </Page>
</template>

<script>
import Page from '@/components/globals/Page'
import LightBulbs from '@/components/lights/Lightbulbs'
import AccentColor from '@/components/lights/AccentColor'

export default {
name: "Lights",
  components: {AccentColor, LightBulbs, Page}
}
</script>

<style scoped>
.lights {
  height: 100%;
  display: grid;
  grid-gap: var(--size-medium);
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
}
</style>