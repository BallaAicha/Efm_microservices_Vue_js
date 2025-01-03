<template>
  <UiInbox />
</template>

<script lang="ts" setup>
import { getListings } from "~/api/listingApi";
import type { ListingInterface } from "~/interfaces/listing/listing.interface";

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
