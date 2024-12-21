import { getCategoriesAll } from "@/api/categoryApi";
import { type CategoryInterface } from "~/interfaces/listing/category.interface";

export const useCategoryStore = defineStore("categoryStore", {
  state: () => ({
    categories: [] as CategoryInterface[],
  }),
  getters: {
    // Récupère les catégories parentes dynamiquement
    parentCategories: (state) =>
      state.categories.filter((category) => !category.parentCategoryId),
  },
  actions: {
    async fetchCategories() {
      try {
        this.categories = await getCategoriesAll();
      } catch (err) {
        console.error("Erreur lors de la requête.", err);
        throw err;
      }
    },
  },
});
