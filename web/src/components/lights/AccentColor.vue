<template>
      <div class="accent-color">
        <h1>Accent Color</h1>
        <section class="buttons">
          <CardButton
              class="color-button flyin-right"
              :style="{backgroundColor: getColorForName(colorName), animationDelay: `${50 * index}ms`}"
              v-for="(colorName, index) in accentColors"
              :key="colorName"
              :color="getColorForName(colorName)"
              @click="triggerAccentColor(colorName)"
              :label="colorName"
          ></CardButton>
        </section>
      </div>
  </template>

  <script>
  import LightService from '@/services/LightService'
  import CardButton from '@/components/globals/CardButton'
  import config from '@/config.json'

  export default {
      name: 'AccentColor',
      components: {CardButton},
      data() {
        return {
          accentColors: []
        }
      },
      async created() {
        this.accentColors = await LightService.getAccentColors()
      },
      methods: {
        triggerAccentColor(color) {
          LightService.selectAccentColor(color)
        },
        getColorForName(name) {
          return config.lights.colorNameMap[name] || ''
        }
      }
    }
  </script>

  <style scoped>
    .accent-color {
      display: flex;
      flex-direction: column;
    }

    .buttons {
      flex-grow: 1;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: var(--size-medium);
    }

    .color-button {
      background-image: linear-gradient(10deg, hsla(0, 0%, 0%, 0.5), transparent);
      box-sizing: border-box;
      transition: var(--transition-all-default);
    }

    .color-button:hover {
      background-image: none;
      box-shadow: none;
      filter: brightness(125%);
    }

    @media (orientation: landscape) {
      .buttons {
        grid-auto-columns: 1fr;
        grid-auto-flow: column;
      }
    }
  </style>
