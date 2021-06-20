<template>
<div class="data-entry">
  <i :class="['fas', icon]"></i>
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

.data-entry i {
  font-size: var(--size-huge);
  line-height: var(--size-huge);
  width: var(--size-huge);
  text-align: center;
}

.data-entry label {
  color: var(--color-semihighlight);
}

.data-entry h1 {
  margin: var(--size-small) 0 0 0;
}

.data-entry div {
  display: block;
}
</style>
