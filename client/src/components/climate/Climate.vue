<template>
  <div class="status-widgets">
    <div class="widgets">
      <Temperature></Temperature>
      <Humidity></Humidity>
    </div>
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
.widgets {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: var(--size-medium);
  grid-auto-rows: var(--size-card-side);
}

@media (orientation: landscape) {
  .widgets {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>