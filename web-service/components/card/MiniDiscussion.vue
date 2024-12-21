<template>
  <v-card
    flat
    class="message-card d-flex flex-column pa-2"
    :class="[themeStore.isDark ? 'bg-surface' : 'bg-grey-lighten-3']"
  >
    <div class="pa-3 pt-2 pb-3 d-flex align-center justify-space-between">
      <div class="d-flex align-center ga-3" >
        <v-avatar :image="photoUrl" size="50"></v-avatar>
        <div class="message-user">{{ listing.title }}</div>
      </div>
      <v-btn
        icon="mdi-close"
        @click="messageStore.close"
        class="message-card__btn--close"
        variant="text"
      ></v-btn>
    </div>
    <CardDiscussion />
  </v-card>
</template>

<script lang="ts" setup>
const themeStore = useThemeStore();
const messageStore = useMessageStore();
const { listing } = storeToRefs(useMessageStore());
import anime from "animejs";

const props = defineProps<{
}>();

import photos from "~/data/photos.json";
const getRandomPhoto = (photos: any): string => {
  if (!photos || photos.length === 0) {
    return '';
  }

  const randomIndex = Math.floor(Math.random() * photos.length);
  return photos[randomIndex].source || '';
};
const photoUrl = getRandomPhoto(photos);

onMounted(() => {
  anime({
    targets: ".message-card",
    opacity: [0, 1],
    translateY: [200, 0],
    delay: anime.stagger(200),
  });
});
</script>

<style lang="scss" scoped>
.message-card {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  // width: 350px;
  aspect-ratio: 2/3;
  height: 600px;
  z-index: 10;
  opacity: 0;
}

.message-user {
  font-size: medium;
  font-weight: 600;
  @include paragraph-overflow-hidden(1);
}
</style>
