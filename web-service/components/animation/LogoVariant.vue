<template>
  <div class="anim-logo">
    <img src="/assets/img/logo_ani_4.svg" class="logo__car" />
  </div>
</template>

<script setup lang="ts">
import anime from "animejs";

const texts = ["C", "'", "T", "R", "O", "C"]; // Texte à afficher

onMounted(() => {
  // Animation du texte CONNECT
  anime({
    targets: ".logo__car",
    opacity: [0, 1],
    scale: [0.5, 1],
    translateX: [-150, 0],
  });
});
</script>

<style lang="scss" scoped>
.anim-logo {
  width: 5rem;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    // position: absolute;
    height: 100%;
    width: 100%;
    transform: scale(0.5);
    // opacity: 0;
    // will-change: transform, opacity;
  }
}
</style>
