<template>
  <footer class="mt-6">
    <!-- <AnimationBars id="footer__bars" class="d-none d-md-block" /> -->
    <v-footer
      class="footer__elements d-flex flex-column"
      :class="!theme.isDark && ''"
    >
      <img src="/assets/img/logo.svg" class="nav__logo" />
       <!-- <AnimationLogo /> -->
      <!-- <ButtonTheme /> -->

      <div class="text-center text-disabled pa-4">
        <p>Made with <v-icon icon="mdi-heart"></v-icon></p>
        <p>{{ new Date().getFullYear() }} © Dio_Nando</p>
      </div>
      <!-- <ButtonsScrollToTop class="d-none d-sm-block" /> -->
    </v-footer>
  </footer>
</template>

<script setup lang="ts">
import links from "~/data/links.json";

const theme = useThemeStore();
</script>

<style lang="scss" scoped>
footer {
  position: relative;
  overflow: hidden;
  border-top: 1px solid rgba(0, 0, 0, 0.12);

  #footer__bars,
  #footer__waves {
    z-index: 1;
  }

  #footer__particles {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 2;
  }

  .footer__elements > div {
    z-index: 3;
  }
}

.link {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 1rem;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  text-align: center;

  @media only screen and (min-width: 600px) {
    justify-content: center;
    gap: 4rem;
  }
}

.router-link {
  font-weight: bold;
  transition: 200ms;
  font-size: 1rem;

  &-exact-active {
    color: $secondary;
  }

  &:hover {
    color: $tertiary;
    transform: scale(1.1);
  }
}

.icon {
  font-size: 1.5rem;
}

p {
  font-size: small;
}

.nav__logo {
  height: 5rem;
  margin: 1rem;
}
</style>
