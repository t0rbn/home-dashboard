<template>
  <header class="glass">
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
  top: 0;
  left: 0;
  right: 0;
  align-items: center;
  backdrop-filter: var(--glass-filter);
  background-image: var(--gradient-glass);
  display: flex;
  flex-direction: row;
  padding: var(--size-medium);
  position: sticky;
  justify-content: space-between;
  z-index: 10;
}

header .hero-wrapper {
  align-items: center;
  display: flex;
  flex-direction: row;
}

header .hero {
  background-image: url('/Home.jpg');
  background-position: center center;
  background-size: cover;
  border-radius: 50%;
  height: var(--size-huge);
  margin-right: var(--size-medium);
  width: var(--size-huge);
}

header a {
  font-size: var(--size-big);
  color: var(--color-accent);
  line-height: var(--size-big);
}
</style>