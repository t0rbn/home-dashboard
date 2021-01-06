<template>
<Card class="card" @click="clicked">
  <p><i class="fas fa-power-off"></i></p>
  <p>OFF</p>
</Card>
</template>

<script>
import Card from '@/components/globals/Card'
import PowerOffService from '@/components/power-off/PowerOffService'
export default {
  name: 'PowerOff',
  components: {Card},
  methods: {
    async clicked() {
      await PowerOffService.trigger();
    }
  }
}
</script>

<style scoped>
p {
  text-align: center;
  margin-top: 0;
  margin-bottom: var(--size-small);
}

i {
  font-size: calc(2 * var(--size-big));
  line-height: calc(2 * var(--size-big));
}

.card {
  color: var(--color-background);
  background-color: var(--color-accent-red);
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>