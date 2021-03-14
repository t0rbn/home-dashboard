<template>
  <header>
    <div class="hero-wrapper">
      <div class="hero"></div>
      <h1>Welcome Home</h1>
    </div>
      <a href="#" @click="refresh()" @contextmenu="killServer()"><i class="fas fa-sync"></i></a>
  </header>
</template>

<script>
import config from '@/config.json'

export default {
  name: 'Home',
  methods: {
    refresh() {
      window.location.reload()
    },
    killServer() {
      if (!window.confirm('Restart systemd service?')) {
        return
      }
      fetch(`${config.localApiBaseUrl}${config.admin.apiEndpoint}/kill`)
      setTimeout(() => this.refresh(), 1000)
    }
  }
}
</script>

<style scoped>
header {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  padding: var(--size-medium);
  background-color: var(--color-glass);
  backdrop-filter: vaR(--glass-filter);
  z-index: 10;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

header .hero-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
}


header .hero {
  background-image: url('/Home.jpg');
  background-position: center center;
  background-size: cover;
  width: var(--size-huge);
  height: var(--size-huge);
  border-radius: 50%;
  margin-right: var(--size-medium);
}


header a {
  font-size: var(--size-big);
  line-height: var(--size-big);
  color: var(--color-accent);
}

</style>