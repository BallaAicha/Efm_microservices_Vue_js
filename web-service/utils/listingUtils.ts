import type { ListingInterface } from "../interfaces//listing/listing.interface";

export function emptyListing(): ListingInterface {
  return {
    id: undefined,
    userId: undefined,
    title: "Item By Fernando",
    description: "On teste",
    category: [],
    price: 56,
    isExchangeable: false,
    location: "Rabat",
    condition: "NEW", // Valeur par défaut
    createdAt: new Date,
    updatedAt: new Date,
    status: "ACTIVE" // Valeur par défaut
  };
}
