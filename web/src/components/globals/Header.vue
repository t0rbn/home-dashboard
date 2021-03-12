<template>
  <header>
    <h1>Welcome Home</h1>
  </header>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
header {
  position: sticky;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--color-accent);
  background-color: var(--color-glass);
  backdrop-filter: vaR(--glass-filter);
  z-index: 10;
}
</style>