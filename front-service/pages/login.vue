<template>
  <section>
    <div class="d-flex align-center justify-center">
      <AnimationLogo />
    </div>
    <FormLogin v-if="!showRegister" />
    <FormRegister v-else />
    <div v-if="!showRegister" @click="toggleForm" class="text-center">
      Pas encore inscrit ?
      <span class="text-primary text__pointer">Créez un compte</span>
    </div>
    <div v-else @click="toggleForm" class="text-center">
      Vous-avez déja un compte ?
      <span class="text-primary text__pointer">Connectez-vous</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

// Variable pour gérer l'état du formulaire affiché
const showRegister = ref(false);

// Fonction pour basculer entre login et register
const toggleForm = () => {
  showRegister.value = !showRegister.value;
};

definePageMeta({
  layout: "authentication",
});
</script>

<style lang="scss" scoped>
section {
  width: 100%;
  max-width: 528px;
}

.text__pointer {
  cursor: pointer;
}
</style>
