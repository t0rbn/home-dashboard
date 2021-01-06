<template>
      <Card class="card" title="Accent colors" icon="fa-palette">
        <section class="buttons">
          <AccentColorButton
              v-for="colorName in accentColors"
              :key="colorName"
              :color="getColorForName(colorName)"
              @click="triggerAccentColor(colorName)"
          ></AccentColorButton>
        </section>
      </Card>
  </template>

  <script>
    import LightService from '@/components/LightService'
    import Card from '@/components/globals/Card'
    import AccentColorButton from '@/components/accent-color/AccentColorButton'

    export default {
      name: 'AccentColor',
      components: {AccentColorButton, Card},
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
      justify-items: center;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      grid-gap: var(--size-big);
    }
  </style>
