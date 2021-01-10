<template>
      <div>
        <h1>Accent Color</h1>
        <section class="buttons">
          <CardButton
              class="color-button flyin-right"
              :style="{backgroundColor: getColorForName(colorName), animationDelay: `${25 * index}ms`}"
              v-for="(colorName, index) in accentColors"
              :key="colorName"
              :color="getColorForName(colorName)"
              @click="triggerAccentColor(colorName)"
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
    .buttons {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: var(--size-medium);
    }

    .color-button {
      box-sizing: border-box;
      height: calc(4 * var(--size-big));
    }

    .color-button:hover {
      background-image: none;
      box-shadow: none;
      filter: brightness(125%);
    }

    @media (orientation: landscape) {
      .buttons {
        grid-template-columns: 1fr;
        grid-auto-columns: 1fr;
        grid-auto-flow: column;
      }
    }
  </style>
