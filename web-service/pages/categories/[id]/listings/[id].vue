<template>
  <v-container>
    <!-- <v-row align="center" no-gutters class="mt-1">
      <v-col class="text-h4 font-weight-bold" cols="auto">
        Details du produit {{ product.id }}
      </v-col>
    </v-row> -->
    <v-row align="start" justify="start" class="flex-column flex-md-row">
      <v-col cols="12" md="4">
        <div class="container__img">
          <div v-for="i in 5" class="img--cover">
            <img :src="photoStore.getRandomPhoto()" />
          </div>
        </div>
      </v-col>
      <v-col>
        <v-card variant="flat" class="bg-transparent">
          <p class="text-h4 mt-2">
            {{ product.title }}
          </p>
          <v-divider class="my-3" />
          <p class="text-h6 py-1">{{ product.category }}</p>
          <p class="text-body-2">{{ product.description }}</p>
          <p class="text-h4 font-weight-bold text-error mt-3">
            {{ product.price }} $
          </p>
          <div class="d-flex ga-3 mt-4">
            <v-btn
              @click="contact = !contact"
              prepend-icon="mdi-heart"
              text="Favoris"
              flat
              :color="contact ? 'error' : 'white'"
              class="text-none"
              rounded
            ></v-btn>
            <v-btn
              prepend-icon="mdi-email"
              text="Contacter l'annonceur"
              color="secondary"
              disabled
              flat
              class="text-none"
              rounded
            ></v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const photoStore = usePhotoStore();
const messageStore = useMessageStore();

const contact = ref(false);

const { id } = useRoute().params;

const { data: product } = await useFetch("https://fakestoreapi.com/products/1");

</script>

<style lang="scss" scoped>
.container__img {
  display: grid;
  // grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  grid-template-columns: repeat(2, 1fr);
  width: 100%;

  gap: 0.5rem;
  justify-content: center;

  .img--cover {
    height: 125px;

    &:first-child {
      height: 200px;
      grid-column: span 2;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 1rem;
  }
}
</style>
