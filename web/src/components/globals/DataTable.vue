<template>
  <table class="data-table">
    <tr v-for="key in Object.keys(data)" :key="key">
      <td :key="key">{{ key }}:</td>
      <td :key="key" class="value">{{ data[key] }}</td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'DataTable',
  props: ['data']
}
</script>

<style scoped>
.value {
  margin-left: var(--size-small);
}
</style>