<template>
  <div class="home">
    <section class="welcome">
      <div class="hero"></div>
      <h1>Welcome Home</h1>
    </section>
    <Scenes></Scenes>
  </div>
</template>

<script>
import Scenes from '@/components/home/Scenes'

export default {
  name: 'Home',
  components: {Scenes}
}
</script>

<style scoped>
.home {
  display: grid;
  height: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto auto;
}

.welcome {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.welcome h1 {
  font-size: vaR(--size-huge);
  line-height: var(--size-huge);
}

.welcome .hero {
  width: min(25vw, 25vh);
  height: min(25vw, 25vh);
  border-radius: 50%;
  background-position: center center;
  background-size: contain;
  background-image: url('/page-headers/Home.jpg');
}
</style>