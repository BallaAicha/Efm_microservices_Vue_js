<template>
  <v-card
    class="mx-auto"
    color="primary"
    max-width="340"
    subtitle="Take a walk down the beach"
    :title="props.category.name"
  >
  </v-card>
</template>

<script lang="ts" setup>
import type { CategoryInterface } from "~/interfaces/listing/category.interface";

const props = defineProps<{
  category: CategoryInterface;
}>();
</script>
