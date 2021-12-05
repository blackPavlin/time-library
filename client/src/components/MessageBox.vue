<template>
  <div
    class="ui-message"
    v-if="messageShow"
    :class="[
      { 'ui-message--success': messageContext === 'success' },
      { 'ui-message--danger': messageContext === 'error' },
    ]"
  >
    <span class="message-title">{{ messageTitle }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import store from '@/store';

export default defineComponent({
  name: 'Logout',
  setup() {
    const messageShow = computed(() => store.getters.messageShow);
    const messageTitle = computed(() => store.getters.messageTitle);
    const messageContext = computed(() => store.getters.messageContext);

    return {
      messageShow,
      messageTitle,
      messageContext,
    };
  },
});
</script>

<style lang="scss" scoped>
.ui-message {
  display: flex;
}
</style>
