<template>
  <v-card>
    <v-toolbar
      color="primary"
      flat
    >
      <template v-slot:prepend>
        <v-icon start>mdi-format-list-bulleted</v-icon>
        <v-toolbar-title>Sélection de catégories</v-toolbar-title>
      </template>
    </v-toolbar>

    <v-row>
      <v-col>
        <v-card-text>
          <v-treeview
            v-model:selected="selectedCategories"
            :items="categoryTree"
            selectable
            :load-children="loadCategories"
            item-value="id"
            item-title="name"
            false-icon="mdi-bookmark-outline"
            indeterminate-icon="mdi-bookmark-minus"
            true-icon="mdi-bookmark"
            select-strategy="classic"
            return-object
          ></v-treeview>
        </v-card-text>
      </v-col>

      <v-divider :vertical="$vuetify.display.mdAndUp" class="my-md-3"></v-divider>

      <v-col
        cols="12"
        md="6"
      >
        <v-card-text>
          <div
            v-if="selectedCategories.length === 0"
            key="title"
            class="text-h6 font-weight-light text-grey pa-4 text-center"
          >
            Sélectionnez vos catégories favorites
          </div>

          <v-scroll-x-transition
            group
            hide-on-leave
          >
            <v-chip
              v-for="(category, i) in selectedCategories"
              :key="i"
              :text="category.name"
              class="ma-1"
              color="grey"
              prepend-icon="mdi-tag"
              size="small"
            ></v-chip>
          </v-scroll-x-transition>
        </v-card-text>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn
        text="Réinitialiser"
        variant="text"
        @click="selectedCategories = []"
      ></v-btn>

      <v-spacer></v-spacer>

      <v-btn
        append-icon="mdi-content-save"
        color="green-darken-1"
        text="Sauvegarder"
        variant="flat"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

// Liste des catégories (vous pouvez la remplacer par un fetch si besoin)
import categoriesData from "~/data/categories.json";

const categories = ref(categoriesData);
const selectedCategories = ref([]);
const categoryTree = ref([
  {
    id: "root",
    name: "Toutes les catégories",
    children: [],
  },
]);

function buildTree(categories, parentId = null) {
  return categories
    .filter((cat) => cat.parentCategoryId === parentId)
    .map((cat) => ({
      id: cat.id,
      name: cat.name,
      children: buildTree(categories, cat.id),
    }));
}

function loadCategories() {
  const root = categoryTree.value[0];
  root.children = buildTree(categories.value);
  categoryTree.value = [root];
}

// Charger les données initiales
watch(categories, () => {
  loadCategories();
});
</script>
