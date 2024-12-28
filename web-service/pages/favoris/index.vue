<template>
<<<<<<< Updated upstream
  <v-container class="d-flex flex-column ga-4">
    <FormSelectCategory />
    <FormSelectCategory2 />
=======
  <v-container class="d-flex flex-column g-1">
    <div v-for="favorite in favorites" :key="favorite.id">
      <CardListingLast :listing="favorite.listing" />
    </div>
>>>>>>> Stashed changes
  </v-container>
</template>

<style lang="scss" scoped></style>
