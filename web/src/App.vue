<template>
  <main class="app-container">
    <div class="app-content" style="grid-area: content">
      <Home v-show="selectedPage === 'Home'"></Home>
      <Lights v-show="selectedPage === 'Lights'"></Lights>
      <Climate v-show="selectedPage === 'Climate'"></Climate>
    </div>
    <WelcomeHeader style="grid-area: header"></WelcomeHeader>
    <NavigationRail style="grid-area: navigation" @select="selectPage" :selected="selectedPage"></NavigationRail>
    <Notification></Notification>
  </main>
</template>

<script>
import Home from '@/components/home/Home'
import NavigationRail from '@/components/globals/NavigationRail'
import Climate from '@/components/climate/Climate'
import Lights from '@/components/lights/Lights'
import Notification from '@/components/globals/Notification'
import WelcomeHeader from '@/components/home/WelcomeHeader'

export default {
  components: {WelcomeHeader, Notification, Lights, Climate, NavigationRail, Home},
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
  background-color: vaR(--color-app-background);
  box-sizing: border-box;
  margin: 0 auto;
  max-height: 100%;
  min-height: 100%;
  display: grid;
  grid-template-rows: auto auto 1fr;
  grid-template-areas: 'header' 'navigation' 'content';
}

.app-content {
  background-color: var(--color-background);
  padding: var(--size-big);
  overflow: scroll;
}

@media (orientation: landscape) {
  .app-content {
    border-radius: var(--border-radius-default);
    margin: var(--size-medium) var(--size-medium) var(--size-medium) 0;
  }

  .app-container {
    grid-template-rows: auto 1fr;
    grid-template-columns: auto 1fr;
    grid-template-areas: 'header content' 'navigation content';
  }
}
</style>
