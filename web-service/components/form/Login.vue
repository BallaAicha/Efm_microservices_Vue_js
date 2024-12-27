<template>
  <div class="d-flex flex-column ga-6">
    <v-card class="pa-6 bg-transparent" flat>
      <TextTitle :value="'Connectez-vous'" class="mb-6" />
      <v-row>
        <!-- Informations utilisateur -->
        <v-col cols="12">
          <v-text-field
            v-model="user.username"
            label="Email"
            prepend-icon="mdi-account"
            variant="outlined"
            :rules="emailRules"
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
          <v-dialog max-width="500">
            <template v-slot:activator="{ props: activatorProps }">
              <div class="text-grey text-end mb-3 ">
                <span
                  v-bind="activatorProps"
                  class="text__pointer"
                  >Mot de passe oublié ?</span
                >
              </div>
            </template>

            <template v-slot:default="{ isActive }">
              <FormForgotPassword />
            </template>
          </v-dialog>
        </v-col>

        <v-col cols="12" class="text-end">
          <v-btn
            append-icon="mdi-login"
            text="Se connecter"
            color="primary"
            @click="authenticateUser(user)"
            :loading="loading"
            class="text-none"
            ></v-btn
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
  </div>
</template>

<script setup lang="ts">
const { authenticateUser } = useAuthStore();
const { loading, error } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const showPassword = ref(false);

const user = ref({
  username: "fernando@gmail.com",
  password: "password123",
});
</script>

<style lang="scss" scoped>
.text__pointer {
  cursor: pointer;
}
</style>
