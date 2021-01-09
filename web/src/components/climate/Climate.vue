<template>
  <Page name="Climate">
    <div class="climate">
      <Temperature></Temperature>
      <Humidity></Humidity>
    </div>
  </Page>

</template>

<script>
import Temperature from '@/components/climate/Temperature'
import Humidity from '@/components/climate/Humidity'
import Page from '@/components/globals/Page'

export default {
name: "Climate",
  components: {Page, Humidity, Temperature}
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
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr;
  }

}
</style>