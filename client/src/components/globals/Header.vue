<template>
  <header>
    <main>
      <img src="/Home.jpg">
      <h1>Welcome Home</h1>
      <a href="#" @click="refresh()" @contextmenu="killServer()"><i class="fas fa-sync"></i></a>
    </main>
  </header>
</template>

<script>
import config from '@/config.json'

export default {
  name: 'Home',
  data() {
    return {
      maxi: true
    }
  },
  mounted() {
    document.querySelector('.app-container').addEventListener('scroll', () => this.maxi = false)
  },
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
header, header * {
  transition: all 500ms ease;
}

header {
  top: 0;
  left: 0;
  right: 0;
  backdrop-filter: var(--glass-filter);
  background-color: var(--color-elevation);
  box-shadow: var(--shadow-default);
  padding: var(--size-medium);
  position: sticky;
  z-index: 10;
}

header main {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

header main h1 {
  flex-grow: 1;
  margin: 0 var(--size-medium);
}

header main img {
  width: var(--size-huge);
  height: var(--size-huge);
  border-radius: 50%;
}

header main a {
  color: var(--color-highlight)
}
</style>
