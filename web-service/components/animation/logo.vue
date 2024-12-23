<template>
  <div class="d-flex flex-column align-center ga-4">
    <div class="d-flex ga-6 text-container">
      <div class="text__car" v-for="(text, index) in texts" :key="index">
        {{ text }}
      </div>
    </div>
    <div class="d-flex ga-6 text-container">
      <div class="text__car" v-for="(text, index) in texts_2" :key="index">
        {{ text }}
      </div>
    </div>
    <div class="d-flex anim-logo">
      <img src="/assets/img/logo_ani_1.svg" class="logo__car" />
      <img src="/assets/img/logo_ani_2.svg" class="logo__car" />
      <img src="/assets/img/logo_ani_3.svg" class="logo__car" />
      <img src="/assets/img/logo_ani_4.svg" class="logo__car" />
    </div>
  </div>
</template>

<script setup lang="ts">
import anime from "animejs";

const texts = ["C", "O", "N", "N", "E", "C", "T"]; // Texte à afficher
const texts_2 = ["T", "R", "O", "C"]; // Texte à afficher

onMounted(() => {
  // Animation du texte CONNECT
  anime
    .timeline()
    .add({
      targets: ".text__car",
      opacity: [0, 1],
      translateY: [-100, 0],
      rotateX: [-90, 0],
      scale: [0.5, 1],
      delay: anime.stagger(200), // Chaque lettre apparaît progressivement
      elasticity: 500,
      easing: "easeOutElastic(1, .8)",
      color: ["#1883BF", "#FABB17", "#EB5925", "#1883BF"], // Transition de couleur
    })
    .add(
      {
        targets: ".logo__car",
        opacity: [0, 1],
        scale: [0.5, 1],
        rotate: "1turn",
        translateX: [-150, 0],
        delay: anime.stagger(600), // Les logos apparaissent après un délai progressif
        easing: "easeOutBack",
      },
      "+=250" // Ajoute un délai après l'animation du texte
    );
});
</script>


<style lang="scss" scoped>
.text-container {
  display: flex;
  gap: 0.5rem;
  font-size: 3rem;
  font-weight: bold;
  color: $primary; // Couleur initiale
}

.text__car {
  opacity: 0;
  transform: translateY(100px);
  display: inline-block;
  will-change: transform, opacity, color;
  font-family: "Ubuntu";
}

.anim-logo {
  width: 200px;
  height: 200px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    position: absolute;
    height: 100%;
    transform: scale(0.5);
    opacity: 0;
    will-change: transform, opacity;
  }
}
</style>
