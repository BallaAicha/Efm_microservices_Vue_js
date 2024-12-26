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
        <div class="d-flex align-center justify-center pt-6">
          <img src="/assets/img/logo.svg" class="nav__logo" />
        </div>

        <!-- Formulaires -->
        <FormAddListing
          v-show="!createListingPhotos"
          @cancel="createListing = false"
          @add="handleAddListing"
        />

        <!-- Passer l'ID de l'annonce à FormAddListingImages -->
        <FormAddListingImages
          v-show="createListingPhotos"
          :listing="listingResponse!"
          @cancel="createListing = false"
          @add="submitImages"
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
import { addListing } from "~/api/listingApi";
import type { ListingInterface } from "~/interfaces/listing/listing.interface";

const createListing = ref(false);
const createListingPhotos = ref(false);
const loading = ref(false);
const notification = ref(false);
const listingResponse = ref<ListingInterface | null>(null); // Variable pour stocker l'ID de l'annonce

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
    createListingPhotos.value = true;
    loading.value = false;
  }, 2000); // Simule un délai de 2 secondes
};

// Handler pour l'ajout de l'annonce
const handleAddListing = async (listingData: ListingInterface) => {
  try {
    // Appeler la fonction addListing pour ajouter l'annonce
    const response = await addListing(listingData);
    listingResponse.value = response; // Enregistrer l'ID de l'annonce
    proceedToPhotos(); // Transition vers l'ajout des images
  } catch (err) {
    console.error("Erreur lors de l'ajout de l'annonce :", err);
  }
};

// Soumettre les images
const submitImages = async (imagesData: any) => {
  try {
    if (listingResponse.value !== null) {
      // Appeler une fonction qui enverra les images pour l'annonce
      // await addImagesToListing(listingId.value, imagesData); // Supposons que vous ayez une fonction pour ajouter des images
      closeDialog();
    } else {
      console.error("ID de l'annonce manquant.");
    }
  } catch (err) {
    console.error("Erreur lors de l'ajout des images :", err);
  }
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
