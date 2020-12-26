<template>
    <div class="climate-graph-container">
      <div class="values-container">
        <div class="value-bar" v-for="(value, index) in getPreparedValues()" :key="index"
             :style="{height: valueToPercentString(value)}"></div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'AreaGraph',
  props: ['values'],
  methods: {
    normalizeValues(values) {
      if (!values || !values.length) {
        return []
      }

      const min = Math.min(...values)
      const max = Math.max(...values)
      return values.map(v => (v - min) / (max - min))
    },
    valueToPercentString(val) {
      return `${10 + (val * 90)}%`
    },
    smooth(values, groupSize) {
        let newValues = []
        for (let i = groupSize; i < values.length - (groupSize + 1); i++) {
          newValues.push(
              values
                  .filter((v, j) => j >= i - groupSize && j <= i + groupSize)
                  .reduce((a, b) => a + b)
              / ((2 * groupSize) + 1))
        }
        return newValues
    },
    getPreparedValues() {
      return this.normalizeValues(this.smooth(this.values, 3))
    }
  }
}
</script>

<style scoped>
.climate-graph-container {
  box-sizing: border-box;
  position: relative;
}

.values-container {
  align-items: flex-end;
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
}

.value-bar {
  flex-grow: 1;
  background-image: linear-gradient(to bottom, hsla(0, 0%, 0%, 0.5), hsla(0, 0%, 0%, 0.25) var(--size-big));
  transform-origin: bottom center;
}
</style>