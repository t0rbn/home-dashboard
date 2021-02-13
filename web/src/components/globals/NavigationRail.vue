<template>
  <nav>
    <a @click="$emit('select', 'Home')" :class="{selected: selected === 'Home'}">
      <i class="fas fa-home"></i
      >Home
    </a>
    <a @click="$emit('select', 'Lights')" :class="{selected: selected === 'Lights'}">
      <i class="fas fa-lightbulb"></i>
      Lights
    </a>
    <a @click="$emit('select', 'Climate')" :class="{selected: selected === 'Climate'}">
      <i class="fas fa-thermometer-three-quarters"></i>
      Climate
    </a>
  </nav>
</template>

<script>
export default {
  name: 'NavigationRail',
  props: ['selected']
}
</script>

<style scoped>
nav {
  color: vaR(--color-background);
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

nav a {
  cursor: pointer;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  padding: var(--size-medium);
  text-align: center;
  margin-top: var(--size-small);
}

nav a i {
  font-size: var(--size-big);
  line-height: var(--size-big);
}

nav a.selected {
  background-color: var(--color-background);
  border-top-left-radius: var(--border-radius-default);
  border-top-right-radius: var(--border-radius-default);
  color: var(--color-accent);
}

@media (orientation: landscape) {
  nav {
    align-items: stretch;
    border-top: none;
    flex-direction: column;
    justify-content: flex-start;
  }

  nav a {
    align-items: center;
    flex-grow: 0;
    flex-direction: row;
    margin-left: vaR(--size-small);
    margin-bottom: 0;
    padding: var(--size-big);
  }

  nav a.selected {
    border-radius: var(--border-radius-default) 0 0 var(--border-radius-default);
  }

  nav a i {
    margin-right: var(--size-small);
    min-width: var(--size-big);
  }
}
</style>