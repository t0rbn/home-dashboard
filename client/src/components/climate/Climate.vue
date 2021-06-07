<template>
  <GridLayout class="widgets">
      <Temperature></Temperature>
      <Humidity></Humidity>
  </GridLayout>
</template>

<script>
import Temperature from '@/components/climate/Temperature'
import Humidity from '@/components/climate/Humidity'
import GridLayout from '@/components/globals/GridLayout'

export default {
  name: 'Climate',
  components: {GridLayout, Humidity, Temperature}
}
</script>

<style scoped>
.widgets > * {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: vaR(--color-elevation);
  background-image: var(--gradient-glass);
  border-radius: var(--border-radius-default);
  box-shadow: var(--shadow-default);
  box-sizing: border-box;
  padding: var(--size-medium);
  aspect-ratio: 1;
}
</style>
