<template>
  <NuxtLink :to="`/categories/${category.name}`">
    <v-card class="card" flat>
      <div class="title">{{ props.category.name }}</div>
      <img :src="photoStore.getRandomPhoto()" />
    </v-card>
  </NuxtLink>
</template>

<script lang="ts" setup>
import type { CategoryInterface } from "~/interfaces/listing/category.interface";
const photoStore = usePhotoStore();

const props = defineProps<{
  category: CategoryInterface;
}>();
</script>

<style lang="scss" scoped>
.card {
  height: 7rem;
  width: 12rem;
  border-radius: 0.5rem;
  cursor: pointer;
  position: relative;
  @extend %flex-center-el;
  overflow: hidden;
  transition: ease all 0.3s;

  &:hover {
    transform: scale(0.9);
  }

  .title {
    position: absolute;
    z-index: 10;
    text-align: center;
    bottom: 0rem;
    padding: 0.5rem 0 0.5rem 0.5rem;
    font-size: large;
    font-weight: 600;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.8),
      rgba(0, 0, 0, 0.5),
      transparent
    );
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
