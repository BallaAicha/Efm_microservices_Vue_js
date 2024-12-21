<template>
  <div class="pa-6">
    <v-form>
      <v-row>
        <!-- Title -->
        <v-col cols="12" sm="4">
          <v-text-field
            v-model="listing.title"
            :rules="[rules.required, rules.maxLength(100)]"
            label="Titre"
            required
            variant="outlined"
          ></v-text-field>
        </v-col>
        <!-- Price -->
        <v-col cols="12" sm="4">
          <v-text-field
            v-model="listing.price"
            :rules="[rules.required, rules.positiveNumber]"
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
            :rules="[rules.required]"
            label="Localisation"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <!-- Description -->
        <v-col cols="12">
          <v-textarea
            v-model="listing.description"
            :rules="[rules.required, rules.maxLength(500)]"
            label="Description"
            variant="outlined"
          ></v-textarea>
        </v-col>

        <!-- Category -->
        <v-col cols="12" md="4">
          <v-select
            v-model="listing.category"
            :items="parentCategories"
            item-value="id"
            item-title="name"
            :rules="[rules.required]"
            label="Catégorie"
            variant="outlined"
          ></v-select>
        </v-col>

        <!-- Category -->
        <v-col cols="12" md="8">
          <v-select
            v-model="listing.category"
            clearable
            chips
            label="Sous-catégories"
            :items="categoryStore.categories"
            item-value="id"
            item-title="name"
            multiple
            variant="outlined"
          ></v-select>
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
            :rules="[rules.required]"
            label="État"
            variant="outlined"
          ></v-select>
        </v-col>

        <!-- Status -->
        <v-col cols="12" sm="5">
          <v-select
            v-model="listing.status"
            :items="['ACTIVE', 'SOLD', 'REMOVED']"
            :rules="[rules.required]"
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
              @click="$emit('cancel')"
            >
            </v-btn>
            <v-btn class="text-none" variant="outlined" @click="resetValidation">
              Effacer
            </v-btn>
            <v-btn
              class="text-none"
              text="Suivant"
              color="primary"
              flat
              append-icon="mdi-chevron-right"
              @click="addListing, $emit('next')"
            >
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import type { ListingInterface } from "~/interfaces/listing/listing.interface";

const categoryStore = useCategoryStore();

onMounted(async () => {
  await categoryStore.fetchCategories();
});

const parentCategories = computed(() => categoryStore.parentCategories);

defineProps([]);
defineEmits(["next", "cancel"]);

const listing = ref<ListingInterface>({
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
  createdAt: undefined,
  updatedAt: undefined,
});

const previews = ref<string[]>([]);

const rules = {
  required: (v: any) => !!v || "Ce champ est requis",
  maxLength: (length: number) => (v: string) =>
    !v || v.length <= length || `Maximum ${length} caractères`,
  positiveNumber: (v: number) => v > 0 || "Le nombre doit être positif",
};

const resetValidation = () => {
  previews.value = [];
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
    createdAt: undefined,
    updatedAt: undefined,
  };
};

const addListing = () => {
  console.log("Listing ajouté :", listing.value);
};
</script>
