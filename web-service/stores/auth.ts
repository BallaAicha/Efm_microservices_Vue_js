import { mapTokenToUser } from "../utils/tokenUtils";
import type {
  UserInterface,
  UserPayloadInterface,
} from "~/interfaces/user/user.interface";

import { useMessageStore } from "./message";
interface AccessTokenInterface {
  access_token: string;
  status?: string;
}

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    authenticated: false,
    loading: false,
    error: null as string | null,
    user: null as UserInterface | null,
  }),
  actions: {
    // LOGIN
    async authenticateUser(user: UserPayloadInterface) {
      const config = useRuntimeConfig();

      if (!user.username || !user.password) {
        this.error = "L'utilisateur et le mot de passe sont requis.";
        return;
      }

      try {
        this.loading = true;
        this.error = null;

        const data = await $fetch<AccessTokenInterface>(
          `${config.public.apiUrl}/auth/users/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: {
              username: user.username,
              password: user.password,
            },
          }
        );

        if (data?.access_token) {
          const access_token = useCookie("access_token", {
            httpOnly: false,
            maxAge: 3600, // Expire après 1 heure
            secure: process.env.NODE_ENV === "production",
          });
          access_token.value = data.access_token;
          this.authenticated = true;
          this.user = mapTokenToUser(access_token.value);

          // Redirection vers la page d'accueil
          navigateTo("/");
        } else {
          this.error = "Email ou mot de passe incorrect.";
        }
      } catch (error: any) {
        if (error?.response?.status === 401) {
          this.error = "Email ou mot de passe incorrect.";
        } else {
          this.error = "Une erreur est survenue. Veuillez réessayer plus tard.";
        }
        console.error("Authentication failed:", error);
      } finally {
        this.loading = false;
      }
    },

    // LOGOUT
    async logUserOut() {
      const token = useCookie("access_token");
      const config = useRuntimeConfig();
      const messageStore = useMessageStore();

      if (!token.value) {
        console.warn("Aucun token trouvé pour déconnexion.");
        return;
      }

      // Réinitialisation de l'état utilisateur
      this.authenticated = false;
      messageStore.close(); // Fermer le message d'erreur si ouvert
      this.user = null;
      useCookie("access_token").value = null; // Effacer le cookie

      // Redirection vers la page de connexion
      navigateTo("/login");

      // try {
      //   const res: any = await $fetch(`${config.public.apiUrl}/auth/logout`, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${token.value}`,
      //     },
      //   });

      //   if (res && res.message) {
      //     console.log(res.message); // Affiche "Successfully logged out" ou autre
      //   }

      //   // Réinitialisation de l'état utilisateur
      //   this.authenticated = false;
      //   this.user = null;
      //   useCookie("access_token").value = null; // Effacer le cookie

      //   // Redirection vers la page de connexion
      //   navigateTo("/login");
      // } catch (error) {
      //   console.error("Erreur lors de la déconnexion :", error);
      // }
    },

    // INITIALISATION DU STORE ET VERIFICATION DU TOKEN
    async initializeStore() {
      const access_token = useCookie("access_token").value;

      if (access_token) {
        this.authenticated = true;
        this.user = mapTokenToUser(access_token);
        console.log("Utilisateur authentifié avec le token.");
        // Optionnel : vous pouvez ajouter des traitements supplémentaires ici
      } else {
        console.warn("Aucun token détecté.");
        this.authenticated = false;
      }
    },
    // async initializeStore() {
    //   const access_token = useCookie("access_token").value;

    //   if (access_token) {
    //     try {
    //       const config = useRuntimeConfig();
    //       const response: any = await $fetch(
    //         `${config.public.apiUrl}/auth/verify-token`,
    //         {
    //           method: "POST",
    //           headers: {
    //             Authorization: `Bearer ${access_token}`,
    //           },
    //         }
    //       );

    //       if (response.valid) {
    //         this.authenticated = true;
    //         this.user = mapTokenToUser(access_token);
    //         // Optionnel : Vous pouvez ici charger les données utilisateur si nécessaire
    //         // Example: this.user = await fetchUserData(access_token);
    //         console.log("Token validé et utilisateur authentifié.");
    //       } else {
    //         console.warn("Token invalide, redirection vers login.");
    //         this.authenticated = false;
    //         useCookie("access_token").value = null; // Effacer le cookie
    //       }
    //     } catch (error) {
    //       console.error("Erreur lors de la vérification du token :", error);
    //       this.authenticated = false;
    //       useCookie("access_token").value = null; // Effacer le cookie
    //     }
    //   } else {
    //     console.warn("Aucun token détecté.");
    //     this.authenticated = false;
    //   }
    // },
  },
});
