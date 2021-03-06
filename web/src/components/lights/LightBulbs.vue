<template>
<Card>
  <IconHeading icon="fa-lightbulb" text="Lights"></IconHeading>
  <div class="lights">
    <i class="fas fa-lightbulb" :v-for="light in lights" :key="light" :style="{color: light.color}"></i>
  </div>
</Card>
</template>

<script>
import LightService from '@/services/LightService'
import IconHeading from '@/components/globals/IconHeading'
import Card from '@/components/globals/Card'

export default {
name: "LightBulbs",
  components: {Card, IconHeading},
  data() {
    return {
      lights: [],
    }
  },
  async created() {
    this.lights = LightService.currentLightBulbs;
    LightService.registerLightChangeWatcher(() => this.lights = LightService.currentLightBulbs)
  },
}
</script>

<style scoped>

</style>