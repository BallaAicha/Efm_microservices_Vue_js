import type { UserWithAddressInterface } from "~/interfaces/user/user.interface";

export function emptyUserWithAddress(): UserWithAddressInterface {
  return {
    id: "", // UUID
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: undefined,
    passwordConfirmation: undefined,
    rating: 0, // Float
    status: "",
    images: [],
    imagePath: null,
    numberOfReviews: 0,
    profilePicture: null,
    address: {
      id: "", // UUID
      street: "",
      houseNumber: "",
      postalCode: "",
      city: "",
      country: "",
    },
  };
}
