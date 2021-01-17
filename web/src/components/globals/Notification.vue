<template>
  <div class="notification" :class="{hidden: !text || !text.length}">
      <i :class="['fas', icon]"></i>{{ text }}
  </div>
</template>

<script>
import NotificationService from '@/services/NotificationService'

export default {
  name: 'Notification',
  data() {
    return {
      icon: null,
      text: null
    }
  },
  created() {
    NotificationService.registerWatcher((text, icon) => {
      this.text = text
      this.icon = icon
    })
  }
}
</script>

<style scoped>
.notification {
  background-color: hsla(0, 0%, 0%, 0.75);
  backdrop-filter: blur(var(--size-small));
  position: absolute;
  top: var(--size-medium);
  left: var(--size-medium);
  right: var(--size-medium);
  bottom: var(--size-medium);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--color-accent-blue);
  font-size: var(--size-big);
  line-height: var(--size-big);
}

i {
  font-size: var(--size-huge);
  line-height: var(--size-huge);
  padding: var(--size-huge) 0;
  width: calc(3 * var(--size-huge));
  text-align: center;
  color: var(--color-background);
  background-color: var(--color-accent-blue);
  margin-bottom: var(--size-small);
  border-radius: 50%;
}

.notification.hidden {
  display: none;
}
</style>