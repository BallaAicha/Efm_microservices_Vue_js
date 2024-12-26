<template>
  <nav>
    <div class="nav" :class="[theme.isDark ? 'nav--dark' : 'nav--light']">
      <v-container>
        <div class="nav__toolbar d-flex flex-column">
          <div class="d-flex justify-space-between ga-4 align-center mb-3">
            <NuxtLink to="/" class="d-flex align-center">
              <!-- <AnimationLogoVariant /> -->
              <img src="~/assets/img/logo.svg" class="nav__logo" />
            </NuxtLink>
            <ButtonTheme />
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
import type { UserInterface } from '~/interfaces/user/user.interface';

// import anime from "animejs";
const theme = useThemeStore();

// onMounted(() => {
//   anime({
//     targets: ".nav__logo",
//     opacity: [0, 1],
//     translateX: [-200, 0],
//     delay: anime.stagger(100),
//   });
// });
</script>

<style lang="scss" scoped>
.nav__logo {
  height: 100%;
  width: 4rem;
  opacity: 1;
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
  transition: top 0.3s ease; // Transition pour un passage fluide
}

.nav--fixed {
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  right: 0;
}

.nav--static {
  position: static;
}

.nav-placeholder {
  height: 9rem; // Place un espace pour éviter le "saut" visuel
}
</style>
