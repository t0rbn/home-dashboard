<template>
    <main class="app-container">
      <div class="app-content">
        <Home v-show="selectedPage === 'home'"></Home>
        <Lights v-show="selectedPage === 'lights'"></Lights>
        <Climate v-show="selectedPage === 'climate'"></Climate>
      </div>
      <NavigationRail @select="selectPage" :selected="selectedPage"></NavigationRail>
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
      selectedPage: 'home'
    }
  },
  methods: {
    selectPage(page) {
      this.selectedPage = page;
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
}

.app-content {
  overflow: hidden;
}
</style>
