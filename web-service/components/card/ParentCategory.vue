<template>
  <v-card class="card" flat>
    <div class="title">{{ props.category.name }}</div>
    <img :src="photoUrl" />
  </v-card>
</template>

<script lang="ts" setup>
import type { CategoryInterface } from "~/interfaces/listing/category.interface";
import photos from "~/data/photos.json";


const props = defineProps<{
  category: CategoryInterface;
}>();

const getRandomPhoto = (photos: any): string => {
  if (!photos || photos.length === 0) {
    return '';
  }

  const randomIndex = Math.floor(Math.random() * photos.length);
  return photos[randomIndex].source || '';
};

// Utilisation dans votre composant:
const photoUrl = getRandomPhoto(photos);

// Mise à jour du template:
// <v-img :src="photoUrl" /></v-img>
</script>

<style lang="scss" scoped>
.card {
  height: 7rem;
  width: 12rem;
  border-radius: 0.5rem;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  .title {
    position: absolute;
    z-index: 10;
    text-align: center;
    bottom: 0rem;
    padding-bottom: 0.5rem;
    font-size: large;
    font-weight: 600;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.5), transparent);
    color: $light;
    width: 100%;
  }

  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
}
</style>
