<template>
  <div class="pa-6">
    <v-form>
      <v-row>
        <!-- Images -->
        <v-col cols="12">
          <v-file-input
            multiple
            prepend-icon="mdi-image"
            label="Images"
            variant="outlined"
            @change="handleFileChange"
            :clearable="false"
          >
            <template v-slot:selection="{ fileNames }">
              <template v-for="fileName in fileNames" :key="fileName">
                <v-chip class="me-1" color="primary" size="small" label>
                  {{ fileName }}
                </v-chip>
              </template>
            </template>
          </v-file-input>
        </v-col>

        <!-- Image Previews -->
        <v-col v-if="previews.length" cols="12" class="preview--container">
          <img
            v-for="(preview, index) in previews"
            :key="index"
            :src="preview"
            class="preview--image"
          />
        </v-col>

        <!-- Buttons -->
        <v-col>
          <div class="d-flex flex-column flex-lg-row justify-end ga-6">
            <v-btn
              class="text-none"
              text="Publier sans photos"
              color="warning"
              variant="outlined"
              append-icon="mdi-image-off"
              @click="$emit('cancel')"
            >
            </v-btn>
            <v-btn
              class="text-none"
              color="primary"
              text="Poster annonce"
              flat
              append-icon="mdi-tag-plus"
              @click="$emit('add')"
              :disabled="!previews.length"
            >
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type {
  ListingInterface,
  ListingImgInterface,
} from "~/interfaces/listing/listing.interface";
import categories from "~/data/categories.json";

defineProps([]);
defineEmits(["add", "cancel"]);

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

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!input.files) return;

  previews.value = [];
  for (let i = 0; i < input.files.length; i++) {
    const file = input.files[i];
    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target?.result as string;
      previews.value.push(result);
    };

    reader.readAsDataURL(file);
  }
};

const addListing = () => {
  console.log("Listing ajouté :", listing.value);
};
</script>

<style lang="scss" scoped>
.preview--container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  .preview--image {
    max-width: 10rem;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    flex: auto;
    border-radius: 0.5rem;
    background-color: white;
  }
}
</style>
