<template>
  <v-container>
    <v-row align-content="start" gap="3">
      <v-col cols="4" class="border h-auto">
        <v-card
          @click="selectedRecipient = listing.userId"
          v-for="listing in listings"
          :key="listing.id"
          flat
          class="pa-2"
        >
          <div class="text-caption">{{ listing.title }}</div>
          <div>{{ listing.listingId }}</div>
          <div class="text-caption text-grey">{{ listing.userId }}</div>
        </v-card>
      </v-col>
      <v-col cols="12" md="8">
        <div class="text-h5 mb-2">{{ selectedRecipient }}</div>
        <MessageReceiver @selected-recipient="sendResponseTo" class="mb-3" />
        <MessageSender :recipient-id="selectedRecipient" />
      </v-col>
    </v-row>
  </v-container>
  <!-- <UiInbox /> -->
</template>

<script lang="ts" setup>
import { getListings } from "~/api/listingApi";
import type { ListingInterface } from "~/interfaces/listing/listing.interface";

// const selectedListing = ref<ListingInterface>(emptyListing());
const selectedRecipient = ref<string>("");

const sendResponseTo = (recipientId: string) => {
  selectedRecipient.value = recipientId;
};

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

onMounted(() => {
  fetchListingsData();
});
</script>

<style lang="scss" scoped></style>
