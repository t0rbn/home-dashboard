<template>
  <div class="climate">
    <Temperature class="flyin-right"></Temperature>
    <Humidity class="flyin-left"></Humidity>
  </div>
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
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: vaR(--size-medium);
}

@media (orientation: landscape) {
  .climate {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
  }
}
</style>