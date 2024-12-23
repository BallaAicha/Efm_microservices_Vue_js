import type { CategoryInterface } from "./category.interface";

// Listing
export interface ListingInterface {
  id?: string | undefined; // UUID
  userId?: string | undefined; // UUID (relation avec User)
  title: string;
  description: string;
  category: CategoryInterface[];
  price: number; // Float
  isExchangeable: boolean;
  location: string;
  condition: "NEW" | "USED"; // Enum
  createdAt: Date; // DateTime
  updatedAt: Date; // DateTime
  status: "ACTIVE" | "SOLD" | "REMOVED"; // Enum
}

// ListingImg
export interface ListingImgInterface {
  id: string; // UUID
  listingId: string; // UUID (relation avec Listing)
  imageUrl: string;
}

