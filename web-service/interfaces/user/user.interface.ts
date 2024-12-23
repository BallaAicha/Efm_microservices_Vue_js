// User
export interface UserInterface {
  id: string; // UUID
  name?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password?: string;
  passwordConfirmation?: string;
  rating: number; // Float
  numberOfReviews: number;
  profilePicture?: string;
}

export interface UserWithAddressInterface {
  id: string; // UUID
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password?: string;
  passwordConfirmation?: string;
  rating: number; // Float
  status: string;
  images: [];
  imagePath: string | null;
  numberOfReviews: number;
  profilePicture: string | null;
  address: {
    id: string,
    street: string,
    houseNumber: string,
    postalCode: string,
    city: string,
    country: string,
  }
}

export interface UserPayloadInterface {
  username: string;
  password: string;
}
