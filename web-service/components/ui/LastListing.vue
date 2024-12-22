<template>
  <section>
    <div class="text-h4 mb-4">Toutes les annonces</div>
    <div class="container-listing">
      <CardListingVariant
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
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
