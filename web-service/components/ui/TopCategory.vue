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
          <CardCategoryAlt :category="category" />
        </div>
      </v-slide-group-item>
    </v-slide-group>
  </section>
</template>

<script lang="ts" setup>
import { getCategoriesAll } from "~/api/categoryApi";
interface Category {
  id: number;
}

const categories = ref<Category[]>([]);

onMounted(async () => {
  categories.value = await getCategoriesAll();
});
</script>

<style lang="scss" scoped></style>
