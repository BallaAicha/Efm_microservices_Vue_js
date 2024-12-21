<template>
  <v-app id="app">
    <!-- Drawer pour les écrans mobiles -->
    <v-navigation-drawer
      v-if="isMobile"
      v-model="drawer"
      :width="400"
      :mobile="true"
    >
      <div class="drawer__content">
        <div class="d-flex align-center justify-space-between pa-4">
          <img src="~/assets/img/logo_8.svg" class="nav__menu" />
          <v-btn
            @click="drawer = false"
            variant="flat"
            icon="mdi-close"
            class="drawer__btn--close"
          ></v-btn>
        </div>
        <NavbarSideBar />
      </div>
    </v-navigation-drawer>

    <!-- Navigation mobile -->
    <div v-if="isMobile" class="navigation__mobile">
      <div class="pa-4">
        <div class="d-flex align-center justify-center mb-4">
          <v-btn
            @click="drawer = !drawer"
            variant="flat"
            icon="mdi-menu"
            class="drawer__btn--open"
          ></v-btn>
          <NuxtLink to="/" class="d-flex align-center">
            <img src="~/assets/img/logo_8.svg" class="nav__logo" />
          </NuxtLink>
        </div>
        <FormSearchListing class="flex-1-1" />
      </div>
    </div>

    <!-- Header pour les écrans desktop -->
    <TheHeader v-else class="navigation__desktop" />

    <!-- Contenu principal -->
    <v-main class="pt-6">
      <slot />
    </v-main>

    <TheFooter />
  </v-app>
</template>


<script setup lang="ts">
import { ref } from "vue";
import { useDisplay } from "vuetify";

// Accès au thème
const theme = useThemeStore();

// État du drawer
const drawer = ref(false);

// Détection des écrans mobiles
const { mdAndDown } = useDisplay();
const isMobile = ref(mdAndDown); // `mdAndDown` est vrai pour les écrans "medium" et inférieurs
</script>


<style lang="scss" scoped>
.nav__logo {
  width: 10rem;
}

.nav__menu {
  width: 10rem;
}

.navigation__mobile {
  position: relative;

  .drawer__btn--open {
    position: absolute;
    left: 2rem;
  }
}

.drawer__content {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%;
}

.drawer__btn--close {
  margin-left: auto;
}
</style>

