import { defineStore } from "pinia";
import type { ListingInterface } from "~/interfaces/listing/listing.interface";
import { emptyListing } from "~/utils/listingUtils";

export const useMessageStore = defineStore("messageStore", {
  state: () => ({
    isOpen: false,
    listing: emptyListing() as ListingInterface, // Utilisation de l'état vide
  }),
  actions: {
    open(listing: ListingInterface) {
      this.isOpen = true;
      this.listing = listing;
    },
    close() {
      this.isOpen = false;
      this.listing = emptyListing(); // Réinitialisation avec l'état vide
    },
  },
});