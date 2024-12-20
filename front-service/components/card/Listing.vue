<template>
  <v-card
    :disabled="loading"
    :loading="loading"
    class="mx-auto my-12"
    max-width="374"
  >
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="deep-purple"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
      cover
    ></v-img>

    <v-card-item>
      <v-card-title>Iphone XS</v-card-title>

      <v-card-subtitle>
        <span class="me-1">Local Favorite</span>

        <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <div class="my-4 text-subtitle-1">$ • Italian, Cafe</div>

      <div>
        Small plates, salads & sandwiches - an intimate setting with 12 indoor
        seats plus patio seating.
      </div>
    </v-card-text>

    <v-divider class="mx-4 mb-1"></v-divider>

    <!-- <v-card-title>Catégories</v-card-title> -->

    <div class="px-4 mb-2">
      <v-chip-group v-model="selection" selected-class="bg-grey">
        <v-chip>Électronique</v-chip>
        <v-chip>Informatique</v-chip>
        <v-chip>Smartphone</v-chip>
        <v-chip>Mobile</v-chip>
      </v-chip-group>
    </div>

    <v-card-actions>
      <v-btn
        color="primary"
        text="Interessé"
        @click="reserve"
        border
      ></v-btn>
      <v-btn
        color="error"
        icon="mdi-heart"
        @click="reserve"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    loading: false,
    selection: 1,
  }),

  methods: {
    reserve() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
  },
};
</script>
