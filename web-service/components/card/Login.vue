<template>
  <div class="card" :class="theme.isDark ? 'dark' : 'light'">
    <NuxtImg :src="props.data.source" />
  </div>
</template>

<script setup lang="ts">
const theme = useThemeStore();

const props = defineProps<{
  data: any;
}>();
</script>

<style lang="scss" scoped>
.light {
  background-color: color.adjust($light, $lightness: -5%);

  &:hover {
    background-color: color.adjust($light, $lightness: -10%);
  }
}

.dark {
  background-image: linear-gradient(-45deg, $dark, $surface);

  &:hover {
    background-color: color.adjust($surface, $lightness: 10%);
  }
}

.card {
  flex: 1;
  overflow: hidden;
  border-radius: 0.25rem;
  aspect-ratio: 1/1;

  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
    display: block;
  }
}
</style>
