<template>
    <div>
        <!-- <p class="title" :class="themeStore.isDark ? 'dark' : 'light'">{{ props.title }}</p> -->
        <p class="title">{{ props.value }}</p>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    value: string
}>()

const themeStore = useThemeStore()
</script>

<style lang="scss" scoped>
.title {
    font-size: clamp(0.5rem, 5vw, 1.5rem);
    // font-weight: 600;
    // margin-bottom: 2rem;
    // background-size: 100%;
    // background-clip: text;
    // -moz-background-clip: text;
    // -webkit-text-fill-color: transparent;
    // -moz-text-fill-color: transparent;
}

.light {
    background-image: linear-gradient(45deg, $secondary, $primary, $primary, $primary);
}

.dark {
    background-image: linear-gradient(45deg, $primary, $secondary, $secondary, $secondary);
}
</style>