<template>
  <section>
    <div>
      <TextTitle :value="'Top catégories'" />
    </div>
    <v-slide-group show-arrows class="py-6">
      <v-slide-group-item
        v-for="category in parentCategories"
        :key="category.id"
        v-slot="{ isSelected, toggle }"
      >
        <div class="mx-3">
          <CardParentCategory :category="category" />
        </div>
      </v-slide-group-item>
    </v-slide-group>
  </section>
</template>

<script lang="ts" setup>
const categoryStore = useCategoryStore();

onMounted(async () => {
  await categoryStore.fetchCategories();
});

const parentCategories = computed(() => categoryStore.parentCategories);
</script>

<style lang="scss" scoped></style>
