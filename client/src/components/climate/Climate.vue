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

.widgets {
  display: grid;
  grid-template-columns: repeat(var(--cards-coloum-count-maxi), 1fr);
  grid-gap: var(--size-medium);
  padding-top: var(--size-medium);
}
</style>
