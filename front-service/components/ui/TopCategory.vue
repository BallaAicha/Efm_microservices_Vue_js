<template>
  <section>
    <div>
      <TextTitle :value="'Top catégories'" />
    </div>
    <v-slide-group show-arrows class="py-6">
      <v-slide-group-item
        v-for="category in categories"
        :key="category.id"
        v-slot="{ isSelected, toggle }"
      >
        <div class="mx-3">
          <CardCategoryAlt />
        </div>
      </v-slide-group-item>
    </v-slide-group>
  </section>
</template>

<script lang="ts" setup>
import categories from "~/data/categories.json";
</script>

<style lang="scss" scoped></style>
