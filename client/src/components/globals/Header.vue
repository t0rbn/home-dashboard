<template>
  <header class="elevation glass">
    <main>
      <img src="/Home.jpg">
      <h1>Welcome Home</h1>
    </main>
  </header>
</template>

<script>

export default {
  name: 'Home',
}
</script>

<style scoped>
header {
  border: none;
  border-bottom: 1px solid var(--color-elevation);
  top: 0;
  left: 0;
  right: 0;
  padding: var(--size-medium);
  position: sticky;
  z-index: 10;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
