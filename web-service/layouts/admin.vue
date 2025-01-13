<template>
    <v-app id="app">
        <v-navigation-drawer v-model="drawer" app>
        </v-navigation-drawer>
        <v-app-bar app color="primary">
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-app-bar-title>Connect Troc</v-app-bar-title>
            <ButtonTheme class="mr-4" />
        </v-app-bar>
        <v-main>
            <slot />
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const drawer = ref(null)
</script>
