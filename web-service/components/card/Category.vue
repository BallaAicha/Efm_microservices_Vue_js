<template>
  <v-card width="500" flat class="bg-surface-light">
    <template v-slot:title>
      <span class="font-weight-black text-secondary">{{ title }}</span>
    </template>

    <!-- <v-card-text class="bg-surface-light"> -->
    <v-list class="pa-4" density="compact">
      <v-list-item v-for="child in children" :key="child.id">
        <NuxtLink :to="`/categories/${child.name}`">
          {{ child.name }}
        </NuxtLink>
      </v-list-item>
    </v-list>
    <!-- </v-card-text> -->
  </v-card>
</template>

<script setup lang="ts">
import type { CategoryInterface } from "~/interfaces/listing/category.interface";

const props = defineProps<{
  title: string;
  children: CategoryInterface[];
}>();
</script>
