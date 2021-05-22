<template>
  <header>
    <main>
      <img src="/Home.jpg">
      <h1>Welcome Home</h1>
      <a href="#" @click="openSettings()"><i class="fas fa-cog"></i></a>
    </main>
  </header>
</template>

<script>

export default {
  name: 'Home',
  components: {},
  methods: {
    openSettings() {
      this.$emit('openSettings')
    }
  }
}
</script>

<style scoped>
header {
  top: 0;
  left: 0;
  right: 0;
  backdrop-filter: var(--glass-filter);
  background-color: var(--color-elevation);
  background-image: var(--gradient-glass);
  box-shadow: var(--shadow-default);
  padding: var(--size-medium);
  position: sticky;
  z-index: 10;
}

header main {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

header main h1 {
  flex-grow: 1;
  margin: 0 var(--size-medium);
}

header main img {
  width: var(--size-huge);
  height: var(--size-huge);
  border-radius: 50%;
}

header main a {
  color: var(--color-highlight)
}
</style>
