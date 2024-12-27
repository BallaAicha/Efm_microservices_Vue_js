<template>
  <div class="form mx-auto d-flex flex-column ga-6">
    <v-card class="pa-6 bg-transparent" flat>
      <TextTitle :value="'Créer un compte'" class="mb-6" />
      <v-row>
        <!-- Informations utilisateur -->
        <v-col cols="12" md="6">
          <v-text-field
            v-model="user.firstName"
            label="Nom"
            prepend-icon="mdi-account"
            variant="outlined"
            :rules="nameRules"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="user.lastName"
            label="Prénom"
            prepend-icon="mdi-account"
            variant="outlined"
            :rules="nameRules"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="user.email"
            label="Email"
            prepend-icon="mdi-email"
            variant="outlined"
            :rules="emailRules"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="user.phoneNumber"
            label="Numéro de téléphone"
            prepend-icon="mdi-phone"
            variant="outlined"
            :rules="phoneRules"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="user.password"
            label="Mot de passe"
            prepend-icon="mdi-key"
            variant="outlined"
            :type="showPassword ? 'text' : 'password'"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="showPassword = !showPassword"
            :rules="passwordRules"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="user.passwordConfirmation"
            label="Confirmer le mot de passe"
            prepend-icon="mdi-key"
            variant="outlined"
            :type="showPassword ? 'text' : 'password'"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="showPassword = !showPassword"
            :rules="passwordConfirmationRules(user.password || '')"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="text-end">
          <v-btn
            append-icon="mdi-account-plus"
            color="primary"
            @click="register"
            class="text-none"
            >S'inscrire</v-btn
          >
        </v-col>
        <v-col cols="12">
          <v-alert
            v-if="error"
            :text="error"
            type="error"
            dismissible
            class="mt-6"
          ></v-alert>
        </v-col>
      </v-row>
    </v-card>
    <v-dialog v-model="notification" max-width="400" persistent>
      <v-card prepend-icon="mdi-check" title="Inscription réussie" class="pa-6">
        <div class="pb-3">
          Votre compte a été créé avec succès. Vous pouvez maintenant vous
          connecter.
        </div>
        <div class="pb-6">
          Un mail de confirmation vous a été envoyé. Veuillez vérifier votre boîte de réception.
        </div>
        <div class="d-flex justify-end">
          <v-btn
            append-icon="mdi-login"
            color="primary"
            variant="outlined"
            @click="authenticateUser(userPayload), (notification = false)"
            class="text-none"
            >Se connecter</v-btn
          >
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { addUser } from "~/api/userApi";
import type {
  UserInterface,
  UserPayloadInterface,
} from "~/interfaces/user/user.interface";

const showPassword = ref(false);

// Utilisateur
const user = ref<UserInterface>({
  id: "",
  firstName: "Fernando",
  lastName: "David",
  email: "fernando@gmail.com",
  phoneNumber: "12345678910",
  password: "password123",
  passwordConfirmation: "password123",
  rating: 0,
  numberOfReviews: 0,
});

const userPayload = computed<UserPayloadInterface>(() => ({
  username: user.value.email,
  password: user.value.password || "",
}));

const { authenticateUser } = useAuthStore();
const error = ref<string | null>(null);

const notification = ref(false);

// Fonction d'enregistrement
const register = async () => {
  try {
    await addUser(user.value).then(async () => {
      notification.value = true;
      // setTimeout(() => {
      //   authenticateUser(userPayload.value);
      //   notification.value = false;
      // }, 5000);
      console.log("Utilisateur enregistré avec succès");
      error.value = null;
    });
  } catch (err: any) {
    error.value =
      err?.response?.data?.message ||
      "Une erreur est survenue. Veuillez réessayer.";
  }
};
</script>
