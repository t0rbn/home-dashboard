<template>
  <Card @click.native="$emit('click')" class="card-button">
    <i :class="['fas', icon]" v-if="icon"></i>{{ label }}
  </Card>
</template>

<script>
import Card from '@/components/globals/Card'

export default {
  name: 'CardButton',
  components: {Card},
  props: ['icon', 'label', 'huge']
}
</script>

<style scoped>
.card-button {
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--size-big);
}

.card-button i {
  font-size: var(--size-big);
  line-height: var(--size-big);
  display: block;
  margin-bottom: var(--size-small);
}

.card-button:hover {
  background-color: var(--color-elevation-double);
  color: var(--color-accent);
}
</style>