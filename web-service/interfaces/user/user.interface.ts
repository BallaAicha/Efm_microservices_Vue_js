// User
export interface UserInterface {
  id: string; // UUID
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password?: string;
  passwordConfirmation?: string;
  rating: number; // Float
  numberOfReviews: number;
  profilePictureUrl?: string;
}

export interface UserPayloadInterface {
  username: string;
  password: string;
}
