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
    @click="emit('selectedRecipient', listing.userId)"
    class="user"
  >
    <div class="pa-2">
      <div class="text-caption">
        {{
          listing.internalUser.firstName + " " + listing.internalUser.lastName
        }}
      </div>
      <div class="text-caption">{{ listing.title }}</div>
      <div>{{ listing.listingId }}</div>
      <div class="text-caption text-grey">{{ listing.userId }}</div>
    </div>
    <v-divider></v-divider>
  </div>
</template>

<script lang="ts" setup>
import type { ListingInterface } from "~/interfaces/listing/listing.interface";

const props = defineProps<{
  listings: ListingInterface[];
}>();

const emit = defineEmits(["selectedRecipient"]);
</script>

<style lang="scss" scoped>
.user {
  &:hover {
    cursor: pointer;
    color: $primary;
  }
}
</style>
