<template>
  <v-container>
    <v-card
      class="inbox"
      outlined
      elevation="0"
      :color="themeStore.isDark ? 'surface' : 'grey-lighten-3'"
    >
      <div class="inbox-wrapper">
        <!-- Drawer personnalisé -->
        <div class="custom-drawer" :class="{ open: drawer }">
          <CardInbox :listings @selected-listing="handleListing" />
        </div>

        <!-- Contenu Principal -->
        <div class="content">
          <!-- Bouton pour basculer le drawer -->
          <div
            class="pa-3 d-flex align-center justify-space-between content__header"
            :class="[
              themeStore.isDark ? 'bg-surface' : 'bg-grey-lighten-3',
              isSmallScreen ? 'justify-end' : 'justify-start',
            ]"
          >
            <v-btn
              @click.stop="drawer = !drawer"
              variant="text"
              icon="mdi-menu"
            >
            </v-btn>
            <div>
              <div>{{ selectedListing.title }}</div>
              <div class="text-caption text-grey">
                {{ selectedListing.userId }}
              </div>
            </div>
          </div>

          <!-- Section discussion -->
          <section class="content__body">
            <CardMaxiDiscussion :recipient-id="selectedListing.userId" />
          </section>
        </div>
      </div>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
const themeStore = useThemeStore();

// État pour contrôler le drawer
const drawer = ref(true); // Drawer masqué par défaut

const selectedListing = ref<ListingInterface>(emptyListing());

// Détecter si l'écran est petit
const isSmallScreen = ref(false);
const checkScreenSize = () => {
  isSmallScreen.value = window.innerWidth < 1200; // Exemple: écran < 1200px
};

import { getListings } from "~/api/listingApi";
import type { ListingInterface } from "~/interfaces/listing/listing.interface";

const listings = ref<ListingInterface[]>([]);

const { user } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const fetchListingsData = async () => {
  try {
    const data = await getListings();
    const filteredData = data.filter((item) => item.userId !== user.value?.id);
    listings.value = filteredData;
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
  }
};

const handleListing = (listing: ListingInterface) => {
  selectedListing.value = listing;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);
  fetchListingsData();
});
</script>

<style lang="scss" scoped>
.inbox {
  height: 75vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.12);
}

.inbox-wrapper {
  display: flex;
  height: 100%;
}

.custom-drawer {
  width: 0;
  overflow: auto;
  // transition: all 0.2s ease;
  opacity: 0;
  z-index: 1;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  /* Masquer scrollbar */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer */
}

.custom-drawer.open {
  min-width: 250px;
  opacity: 1;
}

.content {
  flex-grow: 1;
  // overflow: auto;
  display: flex;
  flex-direction: column;
}

.content__header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.content__body {
  overflow: auto;
  flex: 1;
}
</style>
