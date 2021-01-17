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
  align-items: center;
  border-top: 1px solid var(--color-elevation);
  color: var(--color-semihighlight);
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

nav a {
  cursor: pointer;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  margin: var(--size-medium);
  text-align: center;
}

nav a i {
  font-size: var(--size-big);
  line-height: var(--size-big);
}

nav a:hover {
  color: vaR(--color-highlight);
}

nav a.selected {
  color: var(--color-accent-yellow)
}

@media (orientation: landscape) {
  nav {
    border-right: 1px solid var(--color-elevation);
    border-top: none;
    flex-direction: column;
    justify-content: flex-start;
  }
  nav a {
    flex-grow: 0;
  }
}
</style>