<template>
  <nav>
    <a @click="$emit('select', 'Home')" :class="{selected: selected === 'Home'}">
      <i class="fas fa-home"></i>
    </a>
    <a @click="$emit('select', 'Lights')" :class="{selected: selected === 'Lights'}">
      <i class="fas fa-lightbulb"></i>
    </a>
    <a @click="$emit('select', 'Climate')" :class="{selected: selected === 'Climate'}">
      <i class="fas fa-thermometer-three-quarters"></i>
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
  background-color: vaR(--color-elevation);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

nav a {
  cursor: pointer;
  font-size: vaR(--size-big);
  line-height: var(--size-big);
  flex-grow: 1;
  text-align: center;
  padding: var(--size-big);
}

nav a.selected {
  color: var(--color-accent);
}

@media (orientation: landscape) {
  nav {
    flex-direction: column;
  }

  nav a {
    flex-grow: 0;
  }
}
</style>