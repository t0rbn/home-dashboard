<template>
<main>
  <header :style="{backgroundImage: backGroundImage()}">
    <h1>{{ name }}</h1>
    <div class="content-overflow"></div>
  </header>
  <section class="slot">
    <slot></slot>
  </section>
</main>
</template>

<script>
import AssetService from '@/services/AssetService'

export default {
  name: 'Page',
  props: ['name'],
  methods: {
    backGroundImage() {
      return AssetService.getPageHeaderPath(this.name)
    }
  }
}
</script>

<style scoped>
main {
  height: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
}


h1 {
  font-size: calc(2 * var(--size-big));
  line-height: calc(2 * var(--size-big));
  text-shadow: 1px 1px vaR(--color-background);
  margin: 0 0 vaR(--size-small) vaR(--size-medium);
}

header {
  background-color: var(--color-elevation);
  background-size: cover;
  background-position: top right;
  padding: 0;
  height: calc(min(100vw, 100vh) / 3);
  min-height: calc(min(100vw, 100vh) / 3);
  color: var(--color-highlight);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  filter: grayscale(100%);
}

.content-overflow {
 height: var(--size-big);
  background-color: var(--color-background);
  border-top-left-radius: var(--size-big);
  border-top-right-radius: vaR(--size-big);
}

.slot {
  flex-grow: 1;
  padding: var(--size-medium);
  margin: 0 auto;
  box-sizing: border-box;
  overflow: scroll;
  max-width: 60rem;
  width: 100%;
}
</style>