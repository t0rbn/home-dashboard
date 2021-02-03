<template>
  <div class="home">
    <Scenes></Scenes>
    <CardButton class="turn-off-button" icon="fa-power-off" label="Turn Off" @click="turnOff"></CardButton>
  </div>
</template>

<script>
import Scenes from '@/components/home/Scenes'
import CardButton from '@/components/globals/CardButton'
import PowerOffService from '@/services/PowerOffService'

export default {
  name: 'Home',
  components: {CardButton, Scenes},
  methods: {
    turnOff() {
      console.log('fopp')
      PowerOffService.trigger()
    }
  }
}
</script>

<style scoped>
.home {
  display: grid;
  height: 100%;
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