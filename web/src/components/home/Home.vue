<template>
  <Page name="Home">
    <div class="home">
      <Scenes></Scenes>
      <CardButton class="turn-off-button" icon="fa-power-off" label="Turn Off" @click="turnOff" warn="true"></CardButton>
    </div>

  </Page>
</template>

<script>
import Page from '@/components/globals/Page'
import Scenes from '@/components/home/scenes/Scenes'
import CardButton from '@/components/globals/CardButton'
import PowerOffService from '@/services/PowerOffService'

export default {
  name: 'Home',
  components: {CardButton, Scenes, Page},
  methods: {
    turnOff() {
      console.log("fopp")
      PowerOffService.trigger();
    }
  }
}
</script>

<style scoped>
.home {
  height: 100%;
  display: grid;
  grid-gap: var(--size-medium);
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
}

@media (orientation: landscape) {
  .turn-off-button {
    justify-self: flex-end;
  }
}
</style>