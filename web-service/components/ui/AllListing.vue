<template>
  <section>
    <div>
      <TextTitle :value="'Les dernieres annonces'" class="mb-2" />
    </div>
    <div class="mb-2 text-end">
      <v-btn append-icon="mdi-chevron-right" variant="plain" class="text-none" to="/listings">
        Voir plus d'annonce
      </v-btn>
    </div>
    <div class="container-listing">
      <CardListing
        v-for="listing in listings"
        :key="listing.id"
        class="listing--card"
        :listing="listing"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import listings from "~/data/listings.json";
</script>

<style lang="scss" scoped>
.container-listing {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 1rem;
  justify-content: center;
  padding: 1rem;
}
</style>
