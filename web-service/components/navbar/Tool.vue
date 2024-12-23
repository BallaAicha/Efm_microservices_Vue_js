<template>
  <div class="d-flex align-center">
    <NuxtLink :to="`/users/${user?.firstName}_${user?.lastName}/favoris`">
      <v-btn
        prepend-icon="mdi-heart"
        variant="plain"
        stacked
        size="small"
        class="text-none"
        :ripple="false"
      >
        Favoris
      </v-btn>
    </NuxtLink>
    <NuxtLink :to="`/users/${user?.firstName}_${user?.lastName}/messages`">
      <v-btn
        prepend-icon="mdi-message-processing"
        variant="plain"
        stacked
        size="small"
        class="text-none"
        :ripple="false"
      >
        Messages
      </v-btn>
    </NuxtLink>

    <NuxtLink :to="`/users/${user?.firstName}_${user?.lastName}`">
      <v-btn
        prepend-icon="mdi-account"
        variant="plain"
        stacked
        size="small"
        class="text-none"
        :ripple="false"
      >
        {{ user?.firstName }}
      </v-btn>
    </NuxtLink>

    <v-btn
      prepend-icon="mdi-logout"
      variant="plain"
      stacked
      size="small"
      class="text-none"
      :ripple="false"
      @click="logUserOut"
    >
      Deconnexion
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

const { user } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const { logUserOut } = useAuthStore();
</script>

<style lang="scss" scoped></style>
