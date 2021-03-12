<template>
  <div class="status-widgets">
    <div class="widgets">
      <Temperature></Temperature>
      <Humidity></Humidity>
    </div>
  </div>
</template>

<script>
import Temperature from '@/components/Climate/Temperature'
import Humidity from '@/components/Climate/Humidity'

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
}

@media (orientation: landscape) {
  .widgets {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>