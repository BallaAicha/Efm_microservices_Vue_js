import type { ListingInterface } from "../interfaces//listing/listing.interface";

export function emptyListing(): ListingInterface {
  return {
    id: undefined,
    userId: undefined,
    title: "",
    description: "",
    category: [],
    price: 0,
    isExchangeable: false,
    location: "",
    condition: "NEW", // Valeur par défaut
    createdAt: undefined,
    updatedAt: undefined,
    status: "ACTIVE" // Valeur par défaut
  };
}