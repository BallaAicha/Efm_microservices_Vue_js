<template>
  <v-card
    flat
    class="message-card d-flex flex-column pa-2"
    :class="[themeStore.isDark ? 'bg-surface' : 'bg-grey-lighten-3']"
  >
    <div class="pa-3 pt-2 pb-3 d-flex align-center justify-space-between">
      <div class="d-flex align-center ga-3">
        <v-avatar :image="photoStore.getRandomPhoto()" size="50"></v-avatar>
        <div class="message-user">{{ listing.userId }}</div>
      </div>
      <v-btn
        icon="mdi-close"
        @click="handleClose"
        class="message-card__btn--close"
        variant="text"
      ></v-btn>
    </div>
    <CardDiscussion :recipient-id="listing.userId" />
  </v-card>
</template>

<script lang="ts" setup>
const themeStore = useThemeStore();
const messageStore = useMessageStore();
const photoStore = usePhotoStore();
const { listing } = storeToRefs(useMessageStore());
import anime from "animejs";

const props = defineProps<{}>();

onMounted(() => {
  anime({
    targets: ".message-card",
    opacity: [0, 1],
    translateY: [200, 0],
    easing: "easeOutExpo",
    duration: 500,
  });
});

const handleClose = () => {
  anime({
    targets: ".message-card",
    opacity: [1, 0],
    translateY: [0, 200],
    easing: "easeInExpo",
    duration: 500,
    complete: () => {
      messageStore.close(); // Fermer la carte une fois l'animation terminée
    },
  });
};
</script>

<style lang="scss" scoped>
.message-card {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  aspect-ratio: 2/3;
  height: 600px;
  z-index: 10;
}

.message-user {
  font-size: medium;
  font-weight: 600;
  @include paragraph-overflow-hidden(1);
}
</style>
