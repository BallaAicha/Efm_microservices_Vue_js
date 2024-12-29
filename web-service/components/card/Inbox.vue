<template>
  <div
    class="px-4 pt-4 text-h6 d-flex align-center justify-space-between inbox-container"
  >
    <span>Discussions</span>
    <v-btn icon="mdi-message-processing" size="large" variant="plain"> </v-btn>
  </div>
  <!-- <v-list :items="listing.listingId" lines="three" item-props bg-color="transparent">
    <template v-slot:subtitle="{ subtitle }">
      <div v-html="subtitle"></div>
    </template>
  </v-list> -->
  <div
    v-for="(listing, i) in props.listings"
    :key="i"
    @click="emit('selectedListing', listing)"
    class="user"
  >
    <div class="pa-2">
      <div>{{ listing.title }}</div>
      <div class="text-caption">{{ listing.userId }}</div>
    </div>
    <v-divider></v-divider>
  </div>
</template>

<script lang="ts" setup>
import type { ListingInterface } from "~/interfaces/listing/listing.interface";

const props = defineProps<{
  listings: ListingInterface[];
}>();

const emit = defineEmits(["selectedListing"]);
</script>

<style lang="scss" scoped>
.user {
  &:hover {
    cursor: pointer;
    color: $primary;
  }
}
</style>
