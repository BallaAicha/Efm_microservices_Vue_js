<template>
  <div class="card d-flex flex-column justify-space-between">
    <div>
      <div class="card__img d-flex justify-center">
        <img
          :src="photoUrl"
        ></img>
      </div>
      <div class="card__content">
        <div class="card__title">{{ listing.title }}</div>
        <div class="text-h6">{{ listing.price }}</div>
        <div class="d-flex align-center justify-start ga-2">
        <v-icon :color="listing.isExchangeable ? 'primary' : 'grey'" icon="mdi-swap-horizontal"></v-icon>
        <v-icon v-if="listing.condition === 'NEW'" color="success" icon=" mdi-new-box"></v-icon>
        <v-icon v-if="listing.condition === 'USED'" color="grey" icon=" mdi-alert"></v-icon>
      </div>

          <div class="text-body-2">{{ listing.location }}</div>
          <div class="text-caption">{{ formatDate(listing.createdAt) }}</div>
        </div>
    </div>
          
      <div class="card__action d-flex align-center justify-space-between ga-2">
           
            <v-btn
            :style="computedStyle"
            icon="mdi-email"
            color="secondary"
            size="small"
            :disabled="contact ? false : true"
            flat
            @click="messageStore.open(props.listing)"     
          ></v-btn
        >
        <v-btn
        @click="contact = !contact"  
        icon="mdi-heart"
        size="small"
        flat
        :color="contact ? 'error' : 'white'"
          ></v-btn>
          </div> 
  </div>
</template>

<script lang="ts" setup>
import type { ListingInterface } from '~/interfaces/listing/listing.interface';
import { formatDate } from '~/utils/dateUtils';

import photos from "~/data/photos.json";

const getRandomPhoto = (photos: any): string => {
  if (!photos || photos.length === 0) {
    return '';
  }

  const randomIndex = Math.floor(Math.random() * photos.length);
  return photos[randomIndex].source || '';
};

// Utilisation dans votre composant:
const photoUrl = getRandomPhoto(photos);

const messageStore = useMessageStore();

// const reveal = ref(false);
const contact = ref(false);

const props = defineProps<{
  listing: ListingInterface
}>();
const computedStyle = computed(() => {
  return contact.value ? { opacity: '1' } : { opacity: '0' };
});
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}

.card {
  position: relative;
  // background-color: $light;
  // color: $dark;
  padding: 0.35rem;
  border-radius: 1.5rem;
  height: auto;

  .card__title {
    font-weight: 400;
    margin-top: 0.75rem;
    @include paragraph-overflow-hidden(2)
  }

  .card__img {
    img {
      width: 100%;
    height: 120px;
    object-fit: cover;
    border-radius: 1.25rem;
  }
    }

    .card__action {
      position: absolute;
right: .75rem;
top: .75rem
    }
}
</style>
