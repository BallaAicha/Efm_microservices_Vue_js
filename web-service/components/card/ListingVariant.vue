<template>
  <div class="card">
    <div class="card__header" @click="goToListing">
      <div class="header__img d-flex justify-center">
        <img :src="photoStore.getRandomPhoto()" />
      </div>
    </div>
    <div class="card__body d-flex flex-column" @click="goToListing">
      <div class="header__title">
        <div class="title--h5">{{ listing.title }}</div>
        <div class="title--h6">{{ listing.price }}</div>
      </div>
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

      <div class="text-body-2">{{ listing.location }}</div>
      <div class="text-caption">{{ formatDate(listing.createdAt) }}</div>
    </div>

    <div class="card__action d-flex align-center justify-space-between ga-2">
      <v-btn
        @click="contact = !contact"
        icon="mdi-heart"
        size="x-small"
        flat
        :color="contact ? 'error' : 'white'"
        class="action--favoris"
      ></v-btn>
      <v-btn
        :style="computedStyle"
        icon="mdi-email"
        color="secondary"
        size="x-small"
        :disabled="contact ? false : true"
        flat
        @click="messageStore.open(props.listing)"
      ></v-btn>
    </div>
  </div>
  <v-divider></v-divider>
</template>

<script lang="ts" setup>
import type { ListingInterface } from "~/interfaces/listing/listing.interface";
import { formatDate } from "~/utils/dateUtils";

const messageStore = useMessageStore();
const photoStore = usePhotoStore();

// const reveal = ref(false);
const contact = ref(false);

const props = defineProps<{
  listing: ListingInterface;
}>();
const computedStyle = computed(() => {
  return contact.value ? { opacity: "1" } : { opacity: "0" };
});

const router = useRouter();
function goToListing() {
  router.push(
    `categories/${props.listing.category[0].name}/listings/${props.listing?.title}`
  );
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
  cursor: pointer;
  display: flex;
  gap: 1rem;

  &:hover {
    transform: translateX(0.5rem);

    .title--h5 {
      color: $primary;
    }

    .card__action {
      opacity: 1;
    }
  }

  img {
    width: 200px;
    aspect-ratio: 5/3;
    object-fit: cover;
    border-radius: 1.25rem;
  }

  .card__action {
    position: absolute;
    left: 0.75rem;
    top: 0.75rem;
    opacity: 0.5;
  }
}

.title--h5 {
  font-weight: 400;
  @include paragraph-overflow-hidden(2);
}

.title--h6 {
  font-weight: 600;
  font-size: 1.1rem;
}
</style>
