<template>
  <header :style="{backgroundImage: getBackgroundImage()}">
    <h1>{{ name }}</h1>
  </header>
</template>

<script>
import AssetService from '@/services/AssetService'

export default {
  name: 'AppHeader',
  props: ['name'],
  methods: {
    getBackgroundImage() {
      return AssetService.getPageHeaderPath(this.name)
    }
  }
}
</script>

<style scoped>
header {
  height: min(20vw, 20vh);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-size: cover;
  background-position: top right;
}

h1 {
  font-size: var(--size-huge);
  line-height: var(--size-huge);
  color: var(--color-highlight);
  margin: 0;
  padding: 0 0 var(--size-medium) var(--size-medium);
  background-image: linear-gradient(to top, var(--color-background), transparent);
}
</style>