<template>
  <div class="wrapper">
    <header>
      <nav-menu />
    </header>
    <div class="content-wrapper">
      <section>
        <div class="container">
          <router-view />
        </div>
      </section>
    </div>
    <message-box />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavMenu from '@/components/NavMenu.vue';
import MessageBox from '@/components/MessageBox.vue';

export default defineComponent({
  name: 'App',
  components: {
    NavMenu,
    MessageBox,
  },
});
</script>

<style lang="scss">
@import './assets/styles/css/animation.css';

.wrapper {
  max-width: unset;
}
</style>
