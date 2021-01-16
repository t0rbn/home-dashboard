<template>
  <div>
    <h1>Lights</h1>
    <Card>
      <template v-for="(light, index) in currentlyOn">
        <div class="light flyin-up" :class="{active: light.brightness > 0}" :key="light.name"
             :style="{animationDelay: `${50 * index}ms`}">
          <i class="fas fa-lightbulb"></i>
          <p>{{ light.name }}</p>
          <span class="brightness-value" v-if="light.brightness > 0">{{ Math.round(light.brightness) }}%</span>
          <span class="brightness-value" v-if="light.brightness === 0">off</span>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import LightService from '@/services/LightService'
import Card from '@/components/globals/Card'

export default {
  name: 'LightBulbs',
  components: {Card},
  data() {
    return {
      currentlyOn: []
    }
  },
  created() {
    this.update()
    LightService.registerLightChangeWatcher(() => this.update())
  },
  methods: {
    async update() {
      this.currentlyOn = (await LightService.getLights())
    }
  }
}
</script>

<style scoped>
.light {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: var(--size-small) 0;
  transition: var(--transition-all-default);
}

.light i {
  width: calc(3 * var(--size-medium));
  padding: var(--size-medium) 0;
  background-color: var(--color-semihighlight);
  box-shadow: var(--shadow-default);
  text-align: center;
  border-radius: 50%;
  margin-right: var(--size-small);
}

.light p {
  flex-grow: 1;
}

.light .brightness-value {
  display: block;
  color: var(--color-elevation)
}

.light.active {
  color: var(--color-accent-yellow);
}

.light.active i {
  background-image: var(--gradient-yellow-blue);
  box-shadow: var(--shadow-glow-yellow);
  color: var(--color-background);
}

.light.active .brightness-value {
  color: var(--color-highlight);
}

/*@media (orientation: landscape) {*/
/*  .lights-grid {*/
/*    grid-template-columns: repeat(4, 1fr);*/
/*  }*/
/*}*/
</style>