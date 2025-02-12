import type { Message } from "@stomp/stompjs";
import { defineStore } from "pinia";
import type { ListingInterface } from "~/interfaces/listing/listing.interface";
import type { MessageInterface } from "~/interfaces/message.interface";
import { emptyListing } from "~/utils/listingUtils";

export const useMessageStore = defineStore("messageStore", {
  state: () => ({
    isOpen: false,
    listing: emptyListing() as ListingInterface, // Utilisation de l'état vide
  }),
  actions: {
    open(listing: ListingInterface) {
      if (this.isOpen && this.listing.id === listing.id) {
        return; // Empêche de rouvrir la même annonce inutilement
      }
      if (this.isOpen) {
        this.close();
        setTimeout(() => {
          this.isOpen = true;
          this.listing = listing;
        }, 1000);
      } else {
        this.isOpen = true;
        this.listing = listing;
      }
    },    
    close() {
      this.isOpen = false;
      this.listing = emptyListing(); // Réinitialisation avec l'état vide
    },
  },
});
