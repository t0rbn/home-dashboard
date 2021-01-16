<template>
<Card @click.native="$emit('click')" class="card-button" :class="{warn: warn}">
  <i :class="['fas', icon]" v-if="icon"></i>{{label}}
</Card>
</template>

<script>
import Card from '@/components/globals/Card'
export default {
  name: 'CardButton',
  components: {Card},
  props: ['icon', 'label', 'warn']
}
</script>

<style scoped>
.card-button {
  text-align: center;
  padding: var(--size-big) var(--size-big);
  cursor: pointer;
}

.card-button i {
  margin-right: var(--size-small);
}

.card-button:hover {
  background-image: var(--gradient-yellow-blue);
  color: var(--color-background);
  box-shadow: var(--shadow-glow-yellow);

}

.card-button.warn {
  color: var(--color-background);
  background-image: var(--gradient-red-yellow);
}

.card-button.warn:hover {
  background-image: var(--gradient-red-yellow);
  box-shadow: var(--shadow-glow-red);
  color: var(--color-background);
}


</style>