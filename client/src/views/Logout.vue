<template>
  <div class="logout"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import store from '@/store';
import router from '@/router';

export default defineComponent({
  name: 'Logout',
  setup() {
    store.dispatch('logout');
    router.push({
      path: '/login',
      query: { message: 'logout' },
    });
  },
});
</script>
