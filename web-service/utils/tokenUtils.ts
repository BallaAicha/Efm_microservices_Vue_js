import { jwtDecode } from "jwt-decode";
import type { UserInterface } from "~/interfaces/user/user.interface";

export function mapTokenToUser(token: string): UserInterface {
  const decodedToken = jwtDecode<any>(token);

  const user: UserInterface = {
    id: decodedToken.sub || "", // Utilisation de 'sub' comme ID de l'utilisateur
    firstName: decodedToken.given_name || "",
    lastName: decodedToken.family_name || "",
    email: decodedToken.email || "",
    phoneNumber: decodedToken.phoneNumber || "",
    rating: parseFloat(decodedToken.rating) || 0.0,
    numberOfReviews: decodedToken.numberOfViews || 0,
    profilePicture: decodedToken.picture || undefined, // Si vous avez une URL de photo dans le token
  };

  return user;
}
