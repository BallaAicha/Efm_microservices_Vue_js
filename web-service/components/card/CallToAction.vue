<template>
  <div class="cta">
    <img
      src="/assets/img/landscape.png"
      alt="Illustration de vente"
      class="cta__image"
    />
    <div class="cta__content">
      <div class="cta__text text-white mb-4">C'est le moment de vendre</div>
      <ButtonAddListing />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cta {
  position: relative;
  height: 15rem;
  @extend %flex-center-el;
  flex-direction: column;

  &__image {
    border-radius: 0.5rem;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  &__content {
    position: absolute;

    text-align: center;
  }

  &__text {
    font-size: 2.5rem; /* Ajuste la taille selon la typographie globale */
    font-weight: 500;
  }
}
</style>
