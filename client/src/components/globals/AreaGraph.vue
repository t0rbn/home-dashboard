<template>
  <div>
    <svg viewBox="0 0 1 1" preserveAspectRatio="none">
      <polyline :points="getSvgPath()"></polyline>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'AreaGraph',
  props: ['values'],
  methods: {
    getNormalizedValues() {
      if (!this.values || !this.values.length) {
        return []
      }
      const min = Math.min(...this.values)
      const max = Math.max(...this.values)
      if (min === max) {
        return [0.5, 0.5]
      }
      return this.values.map(v => (v - min) / (max - min))
    },
    smooth(values) {
      if (values.length < 3) {
        return values
      }

      let newValues = []
      for (let i = 1; i < values.length - 1; i++) {
        newValues.push((values[i - 1] + values[i] + values[i + 1]) / 3)
      }
      return newValues
    },
    getSvgPath() {
      const values = this.smooth(this.getNormalizedValues())
      return values.map((v, i) => (i / (values.length - 1)) + ',' + (1 - v)).join(' ')
    }
  }
}
</script>

<style scoped>
div {
  margin-top: var(--size-big);
  min-width: 0;
  min-height: 0;
}

svg {
  height: 100%;
  width: 100%;
}

svg polyline {
  fill: none;
  stroke: var(--color-highlight);
  stroke-width: 0.01;
}
</style>
