<template>
  <section class="pa-5 d-flex" :style="sectionStyle">
    <div class="d-flex align-center justify-center sub2">
      <AnimationLogo />
    </div>
    <div class="sub1">
      <div class="sub1__content">
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
      </div>
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

const sectionStyle = computed(() => ({
  // maxWidth: showRegister.value ? "800px" : "528px",
}));

definePageMeta({
  layout: "authentication",
});
</script>

<style lang="scss" scoped>
section {
  width: 100%;
  flex-wrap: wrap;
}

.text__pointer {
  cursor: pointer;
}

.sub1 {
  @extend %flex-center-el;
  
  .sub1__content {
    max-width: 528px;
  }
}

.sub2 {
  padding: 2rem;
}

.sub1,
.sub2 {
  flex: auto;
}
</style>
