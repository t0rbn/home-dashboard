<template>
<div class="data-entry">
  <div class="icon-container">
    <i :class="['fas', icon]"></i>
  </div>
  <div>
    <h1>{{text}}</h1>
    <label>{{label}}</label>
  </div>
</div>
</template>

<script>
export default {
  name: 'StatusDataEntry',
  props: ['icon', 'text', 'label']
}
</script>

<style scoped>
.data-entry {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.data-entry .icon-container {
  display: flex;
  flex-direction: column;
  height: var(--size-huge);
  aspect-ratio: 1;
  margin-right: var(--size-small);
  align-items: center;
  justify-content: center;
  background-color: var(--color-highlight);
  border-radius: var(--border-radius-default);
}

.data-entry .icon-container i {
  color: var(--color-background);
  font-size: var(--size-big);
  line-height: var(--size-big);
}

.data-entry label {
  color: var(--color-semihighlight);
}

.data-entry h1 {
  margin: 0 0 0 0;
}
</style>
