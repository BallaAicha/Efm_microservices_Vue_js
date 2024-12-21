<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <CardUserProfile :user="user" />
      </v-col>
      <v-col class="ps-0 ps-md-6">
        <FormUserAdresse :user="user" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import type { UserWithAddressInterface } from "~/interfaces/user/user.interface";
import { getUser } from "~/api/userApi";

// const userId = useRoute().params.userId as string;

// Utilisateur
const user = ref<UserWithAddressInterface>({
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
  imagaPath: null,
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
});


const fetchUserData = async () => {
  try {
    const data = await getUser();
    user.value = data.user;
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
  }
};

onMounted(() => fetchUserData());
</script>
