<template>
  <div v-if="data" class="data-table">
    <template v-for="key in Object.keys(data)">
      <div :key="`${key}-key`">{{ key }}:</div>
      <div :key="`${key}-value`">{{ data[key] }}</div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'DataTable',
  props: ['data']
}
</script>

<style scoped>
.data-table {
  /*color: var(--color-semihighlight);*/
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: auto 1fr;
  grid-column-gap: vaR(--size-small);
}
</style>
