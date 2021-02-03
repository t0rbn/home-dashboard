<template>
  <Card @click.native="$emit('click')" class="card-button" :class="{huge: huge}">
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
  flex-direction: row;
  justify-content: center;
  padding: var(--size-big) var(--size-huge);
}

.card-button i {
  display: block;
  margin-right: var(--size-small);
}

.card-button:hover {
  box-shadow: var(--shadow-glow-blue);
  color: var(--color-accent-primary);
}

.card-button.huge {
  flex-direction: column;
}

.card-button.huge i {
  font-size: var(--size-huge);
  line-height: var(--size-huge);
  margin: 0 0 var(--size-small) 0;
}

</style>