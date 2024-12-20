<template>
  <v-app id="app">
    <v-main id="main">
      <slot />
    </v-main>
    <ButtonTheme class="btn__theme" />
  </v-app>
</template>

<style lang="scss" scoped>
#app {
  position: relative;

  #main {
    @extend %flex-center-el;
  }

  .btn__theme {
    position: fixed;
    top: 1rem;
    right: 1rem;
  }
}
</style>
