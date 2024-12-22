<template>
  <div class="pa-6">
    <v-form>
      <v-row>
        <!-- Title -->
        <v-col cols="12" sm="4">
          <v-text-field
            v-model="listing.title"
            label="Titre"
            required
            variant="outlined"
          ></v-text-field>
        </v-col>

        <!-- Price -->
        <v-col cols="12" sm="4">
          <v-text-field
            v-model="listing.price"
            label="Prix"
            required
            variant="outlined"
            type="number"
            prefix="Dh"
          ></v-text-field>
        </v-col>

        <!-- Location -->
        <v-col cols="12" sm="4">
          <v-text-field
            v-model="listing.location"
            label="Localisation"
            variant="outlined"
          ></v-text-field>
        </v-col>

        <!-- Description -->
        <v-col cols="12">
          <v-textarea
            v-model="listing.description"
            label="Description"
            variant="outlined"
          ></v-textarea>
        </v-col>

        <!-- TreeView for Categories -->
        <v-col cols="12">
          <v-treeview
            v-model:selected="listing.category"
            :items="categoryTree"
            selectable
            item-value="id"
            item-title="name"
            false-icon="mdi-bookmark-outline"
            indeterminate-icon="mdi-bookmark-minus"
            true-icon="mdi-bookmark"
            select-strategy="classic"
            open-on-click
            show-checkbox
            multiple
            label="Catégories"
          ></v-treeview>
        </v-col>

        <!-- Is Exchangeable -->
        <v-col cols="12" md="2">
          <v-switch
            v-model="listing.isExchangeable"
            label="Échangeable"
            color="secondary"
          ></v-switch>
        </v-col>

        <!-- Condition -->
        <v-col cols="12" sm="5">
          <v-select
            v-model="listing.condition"
            :items="['NEW', 'USED']"
            label="État"
            variant="outlined"
          ></v-select>
        </v-col>

        <!-- Status -->
        <v-col cols="12" sm="5">
          <v-select
            v-model="listing.status"
            :items="['ACTIVE', 'SOLD', 'REMOVED']"
            label="Statut"
            variant="outlined"
          ></v-select>
        </v-col>

        <!-- Buttons -->
        <v-col>
          <div class="d-flex flex-column flex-lg-row justify-end ga-6">
            <v-btn
              class="text-none"
              text="Annuler"
              color="error"
              variant="outlined"
              append-icon="mdi-close"
              @click="emit('cancel')"
            >
            </v-btn>
            <v-btn
              class="text-none"
              variant="outlined"
              @click="resetValidation"
            >
              Effacer
            </v-btn>
            <v-btn
              class="text-none"
              text="Suivant"
              color="primary"
              flat
              append-icon="mdi-chevron-right"
              @click="validateAndProceed"
            >
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import type { ListingInterface } from "~/interfaces/listing/listing.interface";

const categoryStore = useCategoryStore();

// Charger les catégories à partir du store
onMounted(async () => {
  try {
    await categoryStore.fetchCategories();
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error);
  }
});

const emit = defineEmits(["cancel", "next"]);

// Générer l'arborescence pour le TreeView
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

// Définitions des propriétés du formulaire
const listing = ref<ListingInterface>({
  id: "",
  userId: "",
  title: "",
  description: "",
  category: [], // Tableau des catégories sélectionnées
  price: 0,
  isExchangeable: false,
  location: "",
  condition: "NEW",
  status: "ACTIVE",
  createdAt: new Date,
  updatedAt: new Date,
});

// Réinitialiser le formulaire
const resetValidation = () => {
  listing.value = {
    id: "",
    userId: "",
    title: "",
    description: "",
    category: [],
    price: 0,
    isExchangeable: false,
    location: "",
    condition: "NEW",
    status: "ACTIVE",
    createdAt: new Date,
    updatedAt: new Date,
  };
};

// Validation et action suivante
const validateAndProceed = () => {
  // if (
  //   !listing.value.title ||
  //   !listing.value.price ||
  //   !listing.value.category.length
  // ) {
  //   console.error("Formulaire invalide !");
  //   console.log("Listing invalide :", listing.value.category);
  //   console.log("Annonce invalide :", listing.value.title);
  //   return;
  // }
  console.log("Listing validé :", listing.value);
  emit("next");
};
</script>
