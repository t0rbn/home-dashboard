<template>
      <div>
        <h1>Accent Color</h1>
        <section class="buttons">
          <CardButton
              class="color-button"
              :style="{backgroundColor: getColorForName(colorName)}"
              v-for="colorName in accentColors"
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
          return {
            Purple: '#a51acd',
            Blue: '#3e3ee5',
            Amber: '#e28132',
            Green: '#2fdb2f',
            White: '#ffffff',
          }[name] || '#123456'
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

    .color-button:hover {
      background-image: none;
    }

    @media (orientation: landscape) {
      .buttons {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        grid-auto-columns: 1fr;
        grid-auto-flow: column;
      }
    }
  </style>
