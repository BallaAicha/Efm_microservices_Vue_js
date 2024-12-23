<template>
  <div class="d-flex align-center justify-space-between text-center">
    <div v-for="category in categoryStore.parentCategories" :key="category.id">
      <div class="text-center parentCategory">
        {{ category.name }}
        <v-menu
          activator="parent"
          location="bottom center"
          transition="fade-transition"
          open-on-hover
          close-on-content-click
        >
          <CardCategory
            :title="category.name"
            :children="
              category.id !== undefined
                ? childrenByParent[category.id] || []
                : []
            "
            class="mt-4"
          />
        </v-menu>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CategoryInterface } from "~/interfaces/listing/category.interface";

const categoryStore = useCategoryStore();

onMounted(async () => {
  await categoryStore.fetchCategories();
});

const childrenByParent = computed(() => {
  return categoryStore.categories.reduce((acc, category) => {
    if (category.parentCategoryId) {
      if (!acc[category.parentCategoryId]) {
        acc[category.parentCategoryId] = [];
      }
      acc[category.parentCategoryId].push(category);
    }
    return acc;
  }, {} as Record<number | string, CategoryInterface[]>);
});
</script>

<style lang="scss" scoped>
.parentCategory {
  flex: auto;
  cursor: pointer;
  padding-top: 0.5rem;

  &:hover {
    color: $secondary;
    transition: 0.4s;
  }

  &::after {
    content: "";
    width: 0%;
    height: 2px;
    background: $secondary;
    display: block;
    transition: 0.4s;
    margin-top: 5px;
  }

  &:hover::after {
    width: 100%;
  }
}
</style>
