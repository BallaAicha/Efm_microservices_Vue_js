<template>
  <v-container class="d-flex flex-column g-1">
    <div v-for="favorite in favorites" :key="favorite.id">
      <CardListingLast :listing="favorite.listing" />
    </div>
  <v-container>
    <div v-for="favorite in favorites" :key="favorite.id">
      <CardListingLast :listing="favorite.listing" />
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { getListingsFavorite } from '~/api/listingApi';

const favorites = ref<any>([]);

const fetchFavoritesData = async () => {
    try {
        const data = await getListingsFavorite();
        favorites.value = data;
    } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
  }
}

onMounted(async () => {
  fetchFavoritesData();
});
</script>

<style lang="scss" scoped></style>
