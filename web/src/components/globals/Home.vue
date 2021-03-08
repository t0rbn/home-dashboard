<template>
    <section class="welcome">
      <h1>Welcome Home</h1>
    </section>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style scoped>
.welcome {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: green;
}

.welcome h1 {
  /*font-size: vaR(--size-huge);*/
  /*line-height: var(--size-huge);*/
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