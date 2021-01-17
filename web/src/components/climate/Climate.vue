<template>
  <section class="climate">
    <Temperature class="flyin-right"></Temperature>
    <Humidity class="flyin-left"></Humidity>
  </section>
</template>

<script>
import Temperature from '@/components/climate/Temperature'
import Humidity from '@/components/climate/Humidity'

export default {
  name: 'Climate',
  components: {Humidity, Temperature}
}
</script>

<style scoped>
.climate {
  display: grid;
  grid-gap: vaR(--size-medium);
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  height: 100%;
}

@media (orientation: landscape) {
  .climate {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
  }
}
</style>