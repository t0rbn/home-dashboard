<template>
  <header>
    <div class="hero-image"></div>
    <h1>Welcome</h1>
  </header>
</template>

<script>
export default {
name: "HomeHeader"
}
</script>

<style scoped>
header {
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: var(--size-huge) var(--size-medium);
}

header h1 {
  font-size: var(--size-huge);
  line-height: var(--size-huge);
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
}


@media (orientation: landscape) {
  header {
    flex-direction: row;
  }
  header h1 {
    margin-left: var(--size-small);
  }
}
</style>