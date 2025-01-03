<template>
  <div class="pa-6">
    <v-form>
  <v-row>
    <!-- Title -->
    <v-col cols="12" sm="4">
      <v-text-field
        v-model="listing.title"
        label="Titre"
        :rules="titleRules"
        required
        variant="outlined"
        append-icon="mdi-format-title"
      ></v-text-field>
    </v-col>

    <!-- Price -->
    <v-col cols="12" sm="4">
      <v-text-field
        v-model="listing.price"
        label="Prix"
        :rules="priceRules"
        required
        variant="outlined"
        type="number"
        prefix="Dh"
        append-icon="mdi-cash"
      ></v-text-field>
    </v-col>

    <!-- Location -->
    <v-col cols="12" sm="4">
      <v-text-field
        v-model="listing.location"
        label="Localisation"
        :rules="locationRules"
        variant="outlined"
        append-icon="mdi-map-marker"
      ></v-text-field>
    </v-col>

    <!-- Description -->
    <v-col cols="12">
      <v-textarea
        v-model="listing.description"
        label="Description"
        :rules="descriptionRules"
        variant="outlined"
        auto-grow
        rows="2"
        append-icon="mdi-note-text"
      ></v-textarea>
    </v-col>

    <!-- Catégorie -->
    <v-col cols="12">
      <v-select
        v-model="listing.category"
        :items="categories"
        :rules="categoryRules"
        item-value="id"
        item-title="name"
        label="Catégorie"
        variant="outlined"
        multiple
        chips
        append-icon="mdi-shape-outline"
      ></v-select>
    </v-col>

    <!-- Is Exchangeable -->
    <v-col cols="12" md="2">
      <v-switch
        v-model="listing.isExchangeable"
        label="Échangeable"
        color="secondary"
        inset
        prepend-icon="mdi-swap-horizontal"
      ></v-switch>
    </v-col>

    <!-- Condition -->
    <v-col cols="12" sm="5">
      <v-select
        v-model="listing.condition"
        :items="['NEW', 'USED']"
        :rules="conditionRules"
        label="État"
        variant="outlined"
        append-icon="mdi-tag-outline"
      ></v-select>
    </v-col>

    <!-- Status -->
    <v-col cols="12" sm="5">
      <v-select
        v-model="listing.status"
        :items="['ACTIVE', 'SOLD', 'REMOVED']"
        :rules="statusRules"
        label="Statut"
        variant="outlined"
        append-icon="mdi-check-circle-outline"
      ></v-select>
    </v-col>

    <!-- Buttons -->
    <v-col cols="12">
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
          text="Effacer"
          variant="outlined"
          append-icon="mdi-eraser"
          @click="resetValidation"
        >
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
import { ref, onMounted } from "vue";
import type { CategoryInterface } from "~/interfaces/listing/category.interface";
import type { ListingInterface } from "~/interfaces/listing/listing.interface";

const categoryStore = useCategoryStore();

const emit = defineEmits(["cancel", "add"]);

const isLoadingCategories = ref(true);
const errorLoadingCategories = ref(false);
const categories = ref<CategoryInterface[]>([]);

// Charger les catégories à partir du store
onMounted(async () => {
  try {
    await categoryStore.fetchCategories();
    categories.value = categoryStore.categories;
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error);
    errorLoadingCategories.value = true;
  } finally {
    isLoadingCategories.value = false;
  }
});

// Définitions des propriétés du formulaire
const listing = ref<ListingInterface>(emptyListing());

// const listing = ref<ListingInterface>({
//   id: "",
//   userId: "",
//   title: "",
//   description: "",
//   categories: [], // Tableau des catégories sélectionnées
//   price: 0,
//   isExchangeable: false,
//   location: "",
//   condition: "NEW",
//   status: "ACTIVE",
//   createdAt: new Date(),
//   updatedAt: new Date(),
// });

// Réinitialiser le formulaire
const resetValidation = () => {
  listing.value = emptyListing() as ListingInterface;
};

// Validation et action suivante
const validateAndProceed = () => {
  // Validation du formulaire
  if (
    !listing.value.title ||
    !listing.value.price ||
    !listing.value.category.length
  ) {
    console.error("Formulaire invalide !");
    return;
  }

  console.log("Listing validé :", listing.value);

  // Émettre les données vers le composant parent
  emit("add", listing.value);
};


</script>
