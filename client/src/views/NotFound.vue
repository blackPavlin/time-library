<template>
  <div class="not-found">
    <section class="header">
      <h1 class="ui-title-1">Woops!</h1>
      <span class="ui-title-3">404 Page Not Found</span>
      <span>
        <span>Do you want to return to home page?</span>
        <router-link to="/"> Enter Here</router-link>
      </span>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  a {
    color: #444ce0;
  }
}
</style>
