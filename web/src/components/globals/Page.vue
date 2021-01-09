<template>
<main>
  <header>
    <h1>{{ name }}</h1>
  </header>
  <section class="slot">
    <slot></slot>
  </section>
</main>
</template>

<script>
export default {
  name: 'Page',
  props: ['name']
}
</script>

<style scoped>
main {
  height: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
}

header {
  background-color: pink;
  height: 5rem;
  color: green;
}

.slot {
  flex-grow: 1;
  padding: var(--size-medium);
  overflow: scroll;
}
</style>