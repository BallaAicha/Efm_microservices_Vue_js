<template>
  <div class="text-center">
    <!-- Bouton principal -->
    <v-btn
      prepend-icon="mdi-tag-plus"
      class="px-6"
      color="primary"
      flat
      height="42"
      rounded
      @click="openCreateListing"
    >
      Créer une annonce
    </v-btn>

    <!-- Dialogue principal -->
    <v-dialog v-model="createListing" persistent>
      <v-card flat>
        <!-- <v-toolbar class="px-5">
          <v-btn icon="mdi-close" @click="createListing = false"></v-btn>
          <v-toolbar-title>Nouvelle annonce</v-toolbar-title>
        </v-toolbar> -->
        <div class="d-flex align-center justify-center pt-6">
          <img src="/assets/img/logo.svg" class="nav__logo" />
        </div>

        <!-- Formulaires -->
        <FormAddListing
          v-show="!createListingPhotos"
          @next="proceedToPhotos"
          @cancel="createListing = false"
          />
          <FormAddListingPhotos
          v-show="createListingPhotos"
          @add="submitListing"
          @cancel="createListing = false"
        />
      </v-card>
    </v-dialog>

    <!-- Chargement -->
    <v-dialog v-model="loading" persistent>
      <AnimationLoader />
    </v-dialog>

    <!-- Notification -->
    <v-dialog v-model="notification" max-width="400">
      <v-card
        prepend-icon="mdi-check"
        title="Annonce validée"
        class="pa-6"
        flat
      >
        <div class="pb-6">Votre annonce a été créée avec succès</div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const createListing = ref(false);
const createListingPhotos = ref(false);
const loading = ref(false);
const notification = ref(false);

// Fonction pour ouvrir le dialogue principal
const openCreateListing = () => {
  resetState();
  createListing.value = true;
};

// Fonction pour fermer tous les dialogues
const closeDialog = () => {
  resetState();
  notification.value = true;

  // Masquer la notification après 3 secondes
  setTimeout(() => {
    notification.value = false;
  }, 3000);
};

// Transition vers le formulaire de photos
const proceedToPhotos = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    createListingPhotos.value = true;
  }, 2000); // Simule un délai de 2 secondes
};

// Soumettre l'annonce finale
const submitListing = () => {
  closeDialog();
};

// Réinitialiser tous les états
const resetState = () => {
  createListing.value = false;
  createListingPhotos.value = false;
  loading.value = false;
  notification.value = false;
};
</script>

<style lang="scss" scoped>
.nav__logo {
  width: 6rem;
}
</style>
