<template>
  <GridLayout>
    <Climate></Climate>
  </GridLayout>
</template>

<script>
import GridLayout from '@/components/globals/GridLayout'
import Climate from '@/components/status/Climate'
import Network from '@/components/status/Network'

export default {
  name: 'Status',
  components: {Network, Climate, GridLayout}
}
</script>

<style scoped>

</style>
