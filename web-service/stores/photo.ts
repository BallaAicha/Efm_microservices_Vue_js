// stores/photoStore.ts
import { defineStore } from "pinia";
import photos from "~/data/photos.json";

export const usePhotoStore = defineStore("photoStore", {
  state: () => ({
    photos: photos as { source: string }[], // Typage des photos si nécessaire
  }),
  getters: {
    hasPhotos: (state) => state.photos.length > 0,
  },
  actions: {
    getRandomPhoto(): string {
      if (!this.hasPhotos) {
        return "";
      }
      const randomIndex = Math.floor(Math.random() * this.photos.length);
      return this.photos[randomIndex].source || "";
    },
  },
});
