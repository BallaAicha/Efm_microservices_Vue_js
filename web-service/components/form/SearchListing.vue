<template>
  <!-- <div class="container">
    <input type="text" class="text" placeholder="Rechercher une annonce" />
    <div class="icon">
      <v-icon color="dark" icon="mdi-magnify" class="icon--content"></v-icon>
    </div>
  </div> -->
  <div>
    <v-text-field
      append-inner-icon="mdi-magnify"
      density="compact"
      label="Search templates"
      variant="outlined"
      hide-details
      single-line
      class="search"
      color="primary"
    ></v-text-field>
  </div>
</template>

<style lang="scss" scoped>
.search {
  height: 42px;
}

.container {
  border: 2px solid;
  border-radius: 2rem;
  padding: 0.25rem;
  height: 42px;
  display: flex;
  align-items: center;

  &:hover {
    border-color: $secondary;
  }
}

.text {
  border: none;
  background-color: transparent;
  width: 100%;
  // height: 100%;
  padding: 0.5rem;
  font-size: 1rem;

  &:focus {
    outline: none;
  }
}

.icon {
  position: relative;
  background-color: $secondary;
  height: 100%;
  aspect-ratio: 1/1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  .icon--content {
    position: absolute;
  }
}
</style>
