<template>
  <section class="climate">
    <Temperature class="flyin-right"></Temperature>
    <Humidity class="flyin-left"></Humidity>
  </section>
</template>

<script>
import Humidity from '@/components/climate/Humidity'
import Temperature from '@/components/climate/Temperature'

export default {
  name: 'Climate',
  components: {Temperature, Humidity}
}
</script>

<style scoped>
.climate {
  display: grid;
  grid-gap: var(--size-medium);
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  height: 100%;
}
</style>