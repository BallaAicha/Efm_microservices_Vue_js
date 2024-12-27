<template>
  <section>
    <div class="text-h4 mb-4">Toutes les annonces</div>
    <div class="container-listing">
      <CardListingLast
        v-for="listing in listings"
        :key="listing.id"
        class="listing--card"
        :listing="listing"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { getListings } from "~/api/listingApi";
import type { ListingInterface } from "~/interfaces/listing/listing.interface";

const listings = ref<ListingInterface[]>([]);

const fetchListingsData = async () => {
  try {
    const data = await getListings();
    listings.value = data;
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
  }
};

onMounted(async () => {
  fetchListingsData();
});
</script>

<style lang="scss" scoped>
.container-listing {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
