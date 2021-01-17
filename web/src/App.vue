<template>
  <main class="app-container">
    <div class="app-content" style="grid-area: content">
      <Home v-show="selectedPage === 'Home'"></Home>
      <Lights v-show="selectedPage === 'Lights'"></Lights>
      <Climate v-show="selectedPage === 'Climate'"></Climate>
    </div>
    <NavigationRail style="grid-area: navigation" @select="selectPage" :selected="selectedPage"></NavigationRail>
  </main>
</template>

<script>
import Home from '@/components/home/Home'
import NavigationRail from '@/components/globals/NavigationRail'
import Climate from '@/components/climate/Climate'
import Lights from '@/components/lights/Lights'

export default {
  components: {Lights, Climate, NavigationRail, Home},
  data() {
    return {
      selectedPage: 'Home'
    }
  },
  methods: {
    selectPage(page) {
      this.selectedPage = page
    }
  }
}
</script>

<style scoped>
.app-container {
  box-sizing: border-box;
  margin: 0 auto;
  max-height: 100%;
  min-height: 100%;
  display: grid;
  grid-template-rows: 1fr auto;
  grid-template-areas: 'content' 'navigation';
}

.app-content {
  padding: var(--size-medium);
  overflow: scroll;
}

@media (orientation: landscape) {
  .app-container {
    grid-template-rows: 1fr;
    grid-template-columns: auto 1fr;
    grid-template-areas: 'navigation content';
  }
}
</style>
