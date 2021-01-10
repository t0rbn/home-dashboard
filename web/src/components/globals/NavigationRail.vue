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
  /*background-color: var(--color-elevation);*/
  border-top: 1px solid var(--color-elevation);
  color: var(--color-elevation);
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

nav a:hover {
  color: vaR(--color-highlight);
}

nav a.selected {
  color: var(--color-accent-yellow)
}
</style>