<template>
  <div class="text-center pa-4">
    <v-btn
      prepend-icon="mdi-tag-plus"
      class="text-none"
      color="secondary"
      @click="createListing = true"
    >
      Créer une annonce
    </v-btn>
    <v-dialog
      v-model="createListing"
      transition=""
      :persistent="true"
    >
      <v-card>
        <v-toolbar class="px-5">
          <v-btn icon="mdi-close" @click="closeDialog"></v-btn>
          <v-toolbar-title>Nouvelle annonce</v-toolbar-title>
          <div class="d-flex align-center justify-center py-3">
            <img src="/assets/img/logo_8.svg" class="nav__logo" />
          </div>
        </v-toolbar>
        <FormAddListing
          v-if="!createListingPhotos"
          @next="createListingPhotos = true"
        />
        <FormAddListingPhotos v-if="createListingPhotos" @add="closeDialog" />
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
const createListing = ref(false);
const createListingPhotos = ref(false);

// Fonction pour fermer le dialogue
const closeDialog = () => {
  createListing.value = false;
  createListingPhotos.value = false;
};
</script>

<style lang="scss" scoped>
.nav__logo {
  width: 6rem;
}
</style>
