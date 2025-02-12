<template>
  <div class="card d-flex flex-column justify-space-between">
    <div class="card__header" @click="goToListing">
      <div class="header__img d-flex justify-center">

        <img v-if="listing.images.length === 0" src="/assets/img/no_image.jpg" />
        <img v-else :src="getImageUrl(listing.images)" />
      </div>
      <div class="header__title">
        <div class="title--h5">{{ listing.title }}</div>
        <div class="text-caption">
          {{
            "Par : " +
            listing.internalUser.firstName +
            " " +
            listing.internalUser.lastName
          }}
        </div>
        <div class="title--h6">{{ listing.price }}</div>
      </div>
    </div>
    <div class="card__body d-flex flex-column" @click="goToListing">
      <div class="d-flex align-center justify-start ga-2">
        <v-icon
          :color="listing.isExchangeable ? 'primary' : 'grey'"
          icon="mdi-swap-horizontal"
        ></v-icon>
        <v-icon
          v-if="listing.condition === 'NEW'"
          color="success"
          icon=" mdi-new-box"
        ></v-icon>
        <v-icon
          v-if="listing.condition === 'USED'"
          color="grey"
          icon=" mdi-alert"
        ></v-icon>
      </div>
      <div class="text-body-2">{{ listing.location }}</div>
      <div class="text-caption">{{ formatDate(listing.updatedAt) }}</div>
    </div>

    <div class="card__action d-flex align-center justify-space-between ga-2">
      <v-btn
        :style="computedStyle"
        icon="mdi-email"
        color="secondary"
        size="x-small"
        flat
        @click="messageStore.open(props.listing)"
      ></v-btn>
      <!-- <v-btn
        :style="computedStyle"
        icon="mdi-email"
        color="secondary"
        size="x-small"
        :disabled="contact ? false : true"
        flat
        @click="messageStore.open(props.listing)"
      ></v-btn> -->
      <v-btn
        @click="props.listing.listingId && addFavorite(props.listing.listingId)"
        icon="mdi-heart"
        size="x-small"
        flat
        :color="isFav ? 'error' : 'white'"
      ></v-btn>
    </div>
  </div>
  <v-alert
    v-if="isFav && alertFav !== ''"
    :text="alertFav"
    type="success"
    class="alertFav"
  ></v-alert>
  <v-alert
    v-if="!isFav && alertFav !== ''"
    :text="alertFav"
    type="warning"
    class="alertFav"
  ></v-alert>
</template>

<script lang="ts" setup>
import { addListingToFavorite, isFavorite } from "~/api/listingApi";
import type { ListingInterface } from "~/interfaces/listing/listing.interface";
import { formatDate } from "~/utils/dateUtils";

const messageStore = useMessageStore();
const photoStore = usePhotoStore();

const contact = ref(false);
const isFav = ref(false);
const alertFav = ref("");

const getImageUrl = (images: any) => {
  // const lastIndex = images.length - 1; // Index du dernier élément
  return `data:${images[0].type};base64,${images[0].image}`;
};

function showAlert(message: string, type: "success" | "error" | "warning") {
  alertFav.value = message;
  isFav.value = type === "success";
  setTimeout(() => {
    alertFav.value = "";
  }, 3000); // L'alerte disparaît après 3 secondes
}

async function addFavorite(listingId: string) {
  try {
    if (await isFavorite(listingId)) {
      showAlert("Listing déjà ajouté dans les favoris", "warning");
      isFav.value = true;
    } else {
      await addListingToFavorite(listingId);
      showAlert("Listing ajouté aux favoris", "success");
    }
  } catch (error) {
    showAlert("Erreur lors de l'ajout aux favoris", "error");
    console.error("Erreur lors de l'ajout aux favoris : ", error);
  }
}

const props = defineProps<{
  listing: ListingInterface;
}>();
const computedStyle = computed(() => {
  return contact.value ? { opacity: "1" } : { opacity: "1" }; // TODO: change opacity to 0
});

const router = useRouter();
function goToListing() {
  router.push({ path: `/listings/${props.listing?.listingId}` });
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}

.card,
.title--h5,
.card__action {
  transition: ease all 0.3s;
}

.card {
  position: relative;
  border-radius: 1.5rem;
  height: auto;
  cursor: pointer;

  &:hover {
    transform: translateY(-1rem);

    .title--h5 {
      color: $primary;
    }

    .card__action {
      opacity: 1;
    }
  }

  img {
    width: 100%;
    height: 120px;
    object-fit: cover;
    border-radius: 1.25rem;
  }

  .card__action {
    position: absolute;
    right: 0.75rem;
    top: 0.75rem;
    opacity: 0.5;
  }
}

.title--h5 {
  font-weight: 400;
  margin-top: 0.75rem;
  @include paragraph-overflow-hidden(2);
}

.title--h6 {
  font-weight: 600;
  font-size: 1.1rem;
}

.alertFav {
  position: fixed;
  z-index: 100;
  right: 2rem;
  bottom: 2rem;
}
</style>
