<template>
  <nav>
    <div v-if="posY > posY_ref" class="nav--fill"></div>
    <div
      class="nav"
      :class="[
        posY > posY_ref ? 'nav--fixed' : 'nav--static',
        theme.isDark ? 'nav--dark' : 'nav--light',
      ]"
    >
      <v-container>
        <div class="nav__toolbar d-flex flex-column">
          <div class="d-flex justify-space-between ga-4 align-center mb-3">
            <NuxtLink to="/" class="d-flex align-center justify-end">
              <img v-if="theme.isDark" src="/assets/img/logo_8.svg" class="nav__logo" />
              <img v-else src="/assets/img/logo_8.svg" class="nav__logo" />
            </NuxtLink>
            <ButtonAddListing />
            <FormSearchListing class="flex-1-1" />
            <NavbarTool />
          </div>
          <NavbarCategory />
        </div>
      </v-container>
    </div>
  </nav>
</template>

<script setup lang="ts">
import anime from "animejs";
const theme = useThemeStore();

const posY = ref(0);
const posY_ref = 0;

const handleScroll = () => {
  posY.value = window.scrollY;
};

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener("scroll", handleScroll);
  }
  anime({
    targets: ".nav__logo",
    opacity: [0, 1],
    translateX: [-200, 0],
    delay: anime.stagger(100),
  });
});

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener("scroll", handleScroll);
  }
});
</script>

<style lang="scss" scoped>
.nav__logo {
  width: 5.5rem;
  opacity: 0;
}

.nav--light {
  background-color: $light;
  border-bottom: 1px $dark solid;

  .nav__link {
    color: $surface;

    &:hover {
      color: $dark;
    }
  }

  .router-link-exact-active {
    color: $dark;
  }
}

.nav--dark {
  background-color: $dark;
  border-bottom: 1px $light solid;

  .nav__link {
    color: $light;

    &:hover {
      color: $primary;
    }
  }

  .router-link-exact-active {
    color: $secondary;
  }
}

.nav {
  width: 100%;
  height: 9rem;
  display: flex;
  align-items: flex-end;
}

.nav--fixed {
  position: static;
  z-index: 20;

  @media only screen and (max-width: 600px) {
  }

  @media only screen and (min-width: 600px) {
    position: fixed;
    overflow: hidden;
    top: 0;
  }
}

.nav--static {
  position: static;

  @media only screen and (min-width: 600px) {
  }

  @media only screen and (max-width: 600px) {
  }
}

.nav--fill {
  height: 9rem;

  @media only screen and (max-width: 600px) {
    display: none;
  }
}
</style>
