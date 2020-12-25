<template>
    <nav class="navbar">
        <div class="container">
             <div class="navbar-content">
                <router-link class="header-logo" to="/">Time Library</router-link>
                <div
                  class="button-burger"
                  @click="showMenu = !showMenu"
                  :class="{ active: showMenu }"
                >
                  <span class="line line-1"></span>
                  <span class="line line-2"></span>
                  <span class="line line-3"></span>
                </div>
                <div class="navbar-list__wrapper" :class="{ active: showMenu }">
                  <ul class="navbar-list">
                    <li class="navbar-item" @click="showMenu = false" v-if="isAuth">
                      <router-link class="navbar-link" to="/home">Home</router-link>
                    </li>
                    <li class="navbar-item" @click="showMenu = false" v-if="isAuth">
                      <router-link class="navbar-link" to="/task">Task</router-link>
                    </li>
                    <li class="navbar-item" @click="showMenu = false" v-if="!isAuth">
                      <router-link class="navbar-link" to="/registration">Registration</router-link>
                    </li>
                    <li class="navbar-item" @click="showMenu = false" v-if="!isAuth">
                      <router-link class="navbar-link" to="/login">Login</router-link>
                    </li>
                    <li class="navbar-item" @click="showMenu = false" v-if="isAuth">
                      <router-link class="navbar-link" to="/logout">Logout</router-link>
                    </li>
                  </ul>
                </div>
             </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'NavMenu',
  setup() {
    const showMenu = ref(false);

    return { showMenu };
  },
});
</script>

<style lang="scss" scoped>
@media screen and (max-width: 480px) {
  .navbar-item,
  .navbar-link {
    &:last-child {
      padding-right: 20px;
    }
  }
}
</style>
