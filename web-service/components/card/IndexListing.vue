<template>
  <div class="card d-flex flex-column justify-space-between">
    <div class="card__header" @click="goToListing">
      <div class="header__img d-flex justify-center">
        <img :src="photoStore.getRandomPhoto()" />
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
        :color="contact ? 'error' : 'white'"
      ></v-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { addListingToFavorite, isFavorite } from "~/api/listingApi";
import type { ListingInterface } from "~/interfaces/listing/listing.interface";
import { formatDate } from "~/utils/dateUtils";

const messageStore = useMessageStore();
const photoStore = usePhotoStore();

const contact = ref(false);
const isFav = ref<boolean>(false);

async function addFavorite(listingId: string) {
  try {
    if (await isFavorite(listingId)) {
      alert("Listing deja ajouté dans les favoris");
    } else {
      alert("Listing ajouté au favoris");
      contact.value = !contact;
      addListingToFavorite(listingId);
    }

    //  await isFavorite(listingId).then(() => {
    // }).then(() => {
    //   addListingToFavorite(listingId)
    //   contact.value = !contact;
    //   alert("Listing ajouté au favoris")
    //   // TODO: change logic
    // });
  } catch (error) {
    alert("Listing deja ajouté dans les favoris");
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
</style>
