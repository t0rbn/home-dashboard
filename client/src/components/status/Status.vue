<template>
  <GridLayout>
    <Climate></Climate>
  </GridLayout>
</template>

<script>
import GridLayout from '@/components/globals/GridLayout'
import Climate from '@/components/status/Climate'

export default {
  name: 'Status',
  components: {Climate, GridLayout}
}
</script>

<style scoped>

</style>
