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
    smooth(values) {
        let newValues = []
        for (let i = 1; i < values.length - 1; i++) {
          newValues.push((values[i - 1] + values[i] + values[i + 1]) / 3);
        }
        return newValues
    },
    getPreparedValues() {
      return this.normalizeValues(this.smooth(this.values))
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
  background-color: hsla(0, 0%, 0%, 0.33);
  transform-origin: bottom center;
}
</style>