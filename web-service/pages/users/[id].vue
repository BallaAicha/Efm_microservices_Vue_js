<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" class="d-flex flex-column align-end ga-4">
        <CardUserProfile :user="user" :change-photo="hasPhoto" />
        <!-- <FormProfilePicture /> -->
      </v-col>
      <v-col class="ps-0 ps-md-6">
        <FormUserAdresse :user="user" @edit="hasPhoto = !hasPhoto" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import type { UserWithAddressInterface } from "~/interfaces/user/user.interface";
import { getUser } from "~/api/userApi";
import { emptyUserWithAddress } from "~/utils/userUtils";

const user = ref<UserWithAddressInterface>(emptyUserWithAddress())
const hasPhoto = ref(false)

const fetchUserData = async () => {
  try {
    const data = await getUser();
    user.value = data;
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
  }
};



onMounted(() => fetchUserData());
</script>
