<template>
  <nav>
    <a @click="$emit('select', 'Home')" :class="{selected: selected === 'Home'}"><i class="fas fa-home"></i></a>
    <a @click="$emit('select', 'Lights')" :class="{selected: selected === 'Lights'}"><i class="fas fa-lightbulb"></i></a>
    <a @click="$emit('select', 'Climate')" :class="{selected: selected === 'Climate'}"><i
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
  /*background-color: var(--color-elevation);*/
  border-top: 1px solid var(--color-semihighlight);
  color: var(--color-semihighlight);
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}

nav a {
  font-size: var(--size-big);
  line-height: var(--size-big);
  margin: var(--size-medium);
  cursor: pointer;
  flex-grow: 1;
  text-align: center;
}

nav a:hover {
  color: vaR(--color-highlight);
}

nav a.selected {
  color: var(--color-accent-yellow)
}

@media (orientation: landscape) {
  nav {
    flex-direction: column;
    justify-content: flex-start;
    border-top: none;
    border-right: 1px solid var(--color-semihighlight);
  }
  nav a {
    flex-grow: 0;
  }
}
</style>