<template>
  <div class="d-flex flex-column align-center ga-4">
    <div class="d-flex ga-6">
      <div class="d-flex align-center ga-3">
        <img src="/assets/img/logo_1.svg" class="logo__car" />
        <img src="/assets/img/logo_2.svg" class="logo__car" />
        <img src="/assets/img/logo_3.svg" class="logo__car" />
        <img src="/assets/img/logo_4.svg" class="logo__car" />
      </div>
      <div class="d-flex align-center ga-3">
        <img src="/assets/img/logo_5.svg" class="logo__car" />
      </div>
      <div class="d-flex align-center ga-3">
        <img src="/assets/img/logo_6.svg" class="logo__car" />
        <img src="/assets/img/logo_7.svg" class="logo__car" />
      </div>
    </div>
    <div class="d-flex align-center">
      <img src="/assets/img/logo_8.svg" class="logo__car logo__car--logo" />
    </div>
  </div>
</template>

<script setup lang="ts">
import anime from "animejs";

onMounted(() => {
  anime({
    targets: ".logo__car",
    opacity: [0, 1],
    translateX: [200, 0],
    delay: anime.stagger(100),
  });
});
</script>

<style lang="scss" scoped>
.logo__car {
  height: 4rem;
  opacity: 0;
}

.logo__car--logo {
  height: 6rem;
}
</style>
