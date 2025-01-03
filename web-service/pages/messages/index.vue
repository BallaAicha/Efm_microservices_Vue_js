<template>
  <v-container>
    <v-row>
      <v-cols cols="4" class="border">
        <v-card
          @click="selectedListing = listing"
          v-for="listing in listings"
          :key="listing.id"
          flat
        >
          <v-card-text>{{ listing.listingId }}</v-card-text>
        </v-card>
      </v-cols>
      <v-cols cols="6" class="websocket">
        <MessageReceiver :recipient="selectedListing" />
        <MessageSender :recipient="selectedListing" />
      </v-cols>
    </v-row>
  </v-container>
  <!-- <UiInbox /> -->
</template>

<script lang="ts" setup>
import { getListings } from "~/api/listingApi";
import type { ListingInterface } from "~/interfaces/listing/listing.interface";

const selectedListing = ref<ListingInterface>(emptyListing());

const listings = ref<ListingInterface[]>([]);

const { user } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const fetchListingsData = async () => {
  try {
    const data = await getListings();
    const filteredData = data.filter((item) => item.userId !== user.value?.id);
    listings.value = filteredData;
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
  }
};

const handleListing = (listing: ListingInterface) => {
  selectedListing.value = listing;
};

onMounted(() => {
  fetchListingsData();
});
</script>

<style lang="scss" scoped>
.websocket {
  // width: 500px;
  margin-left: 2rem;
}
</style>
