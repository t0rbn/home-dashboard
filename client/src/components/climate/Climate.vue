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
.widgets > * {
  background-color: vaR(--color-elevation);
  background-image: var(--gradient-glass);
  border-radius: var(--border-radius-default);
  box-shadow: var(--shadow-default);
  box-sizing: border-box;
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-gap: var(--size-big);
  grid-template-rows: 1fr;
  padding: var(--size-medium);
}

.widgets {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: var(--size-medium);
  grid-auto-rows: var(--size-card-side);
  padding-top: var(--size-medium);
}

@media (orientation: landscape), (min-width: 64.8rem) {
  .widgets {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
