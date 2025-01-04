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
          <CardInbox :listings @selected-recipient="handleRecipient" />
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
              <!-- <div>
                {{
                  selectedListing.internalUser.firstName +
                  " " +
                  selectedListing.internalUser.lastName
                }}
              </div>
              <div class="text-caption text-grey">
                {{ selectedListing.userId }}
              </div> -->
              <div class="text-h5">{{ selectedRecipient }}</div>
            </div>
          </div>

          <!-- Section discussion -->
          <section class="content__body"
          :class="[themeStore.isDark ? 'bg-surface' : 'bg-grey-lighten-2']"
          >
            <BaseReceiver @selected-recipient="sendResponseTo" :messages="messages" />
            <BaseSender :recipient-id="selectedRecipient" />
          </section>
        </div>
      </div>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
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
import { getMessages } from "~/api/messageApi";
import type { ListingInterface } from "~/interfaces/listing/listing.interface";
import type { MessageInterface } from "~/interfaces/message.interface";

const selectedRecipient = ref<string>("");

const sendResponseTo = (recipientId: string) => {
  selectedRecipient.value = recipientId;
};

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

const messages = ref<MessageInterface[]>([]);
const channelName = ref<string>("");

const handleRecipient = async (recipientId: string) => {
  selectedRecipient.value = recipientId;

  const id1 = user.value?.id;
  const id2 = recipientId;

  if (id1 && id1 > id2) {
    channelName.value = id2 + "-" + id1;
    console.log(channelName.value);
  } else {
    channelName.value = id1 + "-" + id2;
    console.log(channelName.value);
  }

  try {
    messages.value = await getMessages(channelName.value);
  } catch (error) {
    console.error("Erreur lors de la récupération des messages :", error);
  }
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
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}
</style>
