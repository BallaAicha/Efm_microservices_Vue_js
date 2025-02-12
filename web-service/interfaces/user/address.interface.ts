// Address
export interface AddressInterface {
  id: string; // UUID
  userId: string; // UUID (relation avec User)
  houseNumber: string;
  street: string;
  postalCode: string;
  city: string;
  country: string;
}
