<template>
  <div class="text-center pa-4">
    <v-dialog v-model="notification" max-width="400" persistent>
      <v-card
        prepend-icon="mdi-map-marker"
        text="Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running."
        title="Use Google's location service?"
      >
        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn
            append-icon="mdi-login"
            color="primary"
            @click="authenticateUser(userPayload), (notification = false)"
            class="text-none"
            >Se connecter</v-btn
          >
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
};
</script>
