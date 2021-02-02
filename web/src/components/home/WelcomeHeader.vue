<template>
  <header>
    <div class="hero-image"></div>
    <h1>Welcome</h1>
  </header>
</template>

<script>
export default {
  name: 'WelcomeHeader'
}
</script>

<style scoped>
header {
  color: vaR(--color-background);
  align-items: center;
  display: flex;
  flex-direction: row;
  margin: var(--size-huge);
}

header h1 {
  font-size: var(--size-big);
  line-height: var(--size-big);
  margin: 0;
}

.hero-image {
  background-image: url('/page-headers/Home.jpg');
  background-position: center center;
  background-size: cover;
  border-radius: 50%;
  box-shadow: var(--shadow-default);
  height: calc(3 * var(--size-huge));
  width: calc(3 * var(--size-huge));
  margin-right: vaR(--size-medium);
}


@media (orientation: landscape) {
  header {
    flex-direction: column;
  }

  header .hero-image {
    margin: 0 0 var(--size-medium) 0;
  }
}
</style>