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
  background-color: green;
  position: absolute;
  top: vaR(--size-medium);
  left: vaR(--size-medium);
  right: vaR(--size-medium);
}

.notification.hidden {
  display: none;
}
</style>