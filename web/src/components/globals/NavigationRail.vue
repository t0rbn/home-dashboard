<template>
  <nav>
    <a @click="$emit('select', 'home')" :class="{selected: selected === 'home'}"><i class="fas fa-home"></i></a>
    <a @click="$emit('select', 'lights')" :class="{selected: selected === 'lights'}"><i class="fas fa-lightbulb"></i></a>
    <a @click="$emit('select', 'climate')" :class="{selected: selected === 'climate'}"><i
        class="fas fa-thermometer-three-quarters"></i></a>
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
  display: flex;
  background-color: var(--color-elevation);
  color: var(--color-highlight);
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}

nav a {
  font-size: var(--size-big);
  line-height: var(--size-big);
  margin: var(--size-medium);
  cursor: pointer;
}

nav a.selected {
  color: var(--color-accent-yellow)
}

@media (orientation: landscape) {
  nav {
    flex-direction: column;
    justify-content: flex-start;
  }
}
</style>