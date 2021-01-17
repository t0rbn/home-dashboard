<template>
    <section class="lights">
      <AccentColor></AccentColor>
      <LightBulbs class="lightbulbs"></LightBulbs>
    </section>
</template>

<script>
import LightBulbs from '@/components/lights/Lightbulbs'
import AccentColor from '@/components/lights/AccentColor'

export default {
name: "Lights",
  components: {AccentColor, LightBulbs}
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

@media (orientation: landscape) {
  .lights {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 1fr;
  }

  .lightbulbs {
    overflow: scroll;
  }
}
</style>