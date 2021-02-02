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
  /*background-color: vaR(--color-elevation);*/
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
  padding: var(--size-medium);
  text-align: center;
  margin-top: var(--size-small);
}

nav a i {
  font-size: var(--size-big);
  line-height: var(--size-big);
}

nav a:hover {
  color: vaR(--color-highlight);
}

nav a.selected {
  color: var(--color-accent-yellow);
  background-color: var(--color-background);
  border-top-left-radius: var(--border-radius-default);
  border-top-right-radius: var(--border-radius-default);
}

@media (orientation: landscape) {
  nav {
    border-top: none;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
  }
  nav a {
    flex-grow: 0;
    flex-direction: row;
    align-items: center;
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