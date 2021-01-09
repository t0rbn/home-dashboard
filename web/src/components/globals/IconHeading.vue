<template>
  <strong>
    <i :class="['fas', icon]"></i>{{ text }}
  </strong>
</template>

<script>
export default {
  name: 'IconHeading',
  props: ['icon', 'text']
}
</script>

<style scoped>
strong {
  display: block;
  margin-bottom: var(--size-medium);
}

i {
  margin-right: var(--size-small);
}
</style>