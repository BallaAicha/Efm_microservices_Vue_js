<template>
  <div class="d-flex flex-column align-start">
    <NuxtLink v-for="l in links" :key="l.title" :to="l.link">
      <v-btn
        :prepend-icon="l.icon"
        variant="plain"
        size="large"
        class="text-none"
        :ripple="false"
      >
        {{ l.title }}
      </v-btn>
    </NuxtLink>
  </div>
  <v-divider class="my-2"></v-divider>
  <div class="d-flex flex-column align-start">
    <div class="text-body-1 mx-6">Catégories</div>
    <v-treeview
            :items="categoryTree"
            item-value="id"
            item-title="name"
            false-icon="mdi-bookmark-outline"
            indeterminate-icon="mdi-bookmark-minus"
            true-icon="mdi-bookmark"
            select-strategy="classic"
            open-on-click
            label="Catégories"
            class="treeview"
          ></v-treeview>
  </div>
  <v-divider class="my-2"></v-divider>
</template>

<script lang="ts" setup>
import links from "~/data/links.json";
import categories from "~/data/categories.json";

const categoryStore = useCategoryStore();

const categoryTree = computed(() => {
  const buildTree = (categories, parentId = null) =>
    categories
      .filter((cat) => cat.parentCategoryId === parentId)
      .map((cat) => ({
        id: cat.id,
        name: cat.name,
        children: buildTree(categories, cat.id),
      }));

  return buildTree(categoryStore.categories);
});
</script>

<style lang="scss" scoped>
.treeview {
  width: 100%;
  overflow: hidden;
}

</style>
