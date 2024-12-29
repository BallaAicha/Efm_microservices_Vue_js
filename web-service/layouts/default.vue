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
          <img src="~/assets/img/logo.svg" class="nav__menu" />
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
    <!-- <div v-if="isMobile" class="navigation__mobile">
      <div class="pa-4">
        <div class="d-flex align-center justify-center mb-4">
          <v-btn
            @click="drawer = !drawer"
            variant="flat"
            icon="mdi-menu"
            class="drawer__btn--open"
          ></v-btn>
          <NuxtLink to="/" class="d-flex align-center">
            <img src="~/assets/img/logo.svg" class="nav__logo" />
          </NuxtLink>
        </div>
        <FormSearchListing class="flex-1-1" />
      </div>
    </div> -->

    <!-- Header pour les écrans desktop -->
    <div>
      <TheHeader class="header-fixed" />
      <TheHeader class="header-static" />
    </div>

    <!-- Contenu principal -->
    <v-main class="pt-6">
      <slot />
    </v-main>
    <CardMiniDiscussion v-if="isOpen" />

    <TheFooter />
  </v-app>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify";

const { isOpen } = storeToRefs(useMessageStore());

// Accès au thème
const theme = useThemeStore();

// État du drawer
const drawer = ref(false);

// Détection des écrans mobiles
const { mdAndDown } = useDisplay();
const isMobile = ref(mdAndDown); // `mdAndDown` est vrai pour les écrans "medium" et inférieurs

const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 100; // Affiche le header fixe après 100px de défilement
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
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

/* Style pour le header statique */
.header-static {
  z-index: 1;
}

/* Style pour le header fixe */
.header-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  // transform: translateY(-100%);
  // opacity: 0;
  // transition: all 0.3s ease-in-out;
  z-index: 10;
}

/* Quand le header fixe est visible */
.header-fixed.header-visible {
  // transform: translateY(0);
  // opacity: 1;
}
</style>
