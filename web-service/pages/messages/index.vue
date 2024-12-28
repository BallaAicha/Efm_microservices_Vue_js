<template>
  <v-container>
    <div class="websocket">
      <MessageReceiver />
      <MessageSender />
    </div>
  </v-container>
  <UiInbox />
</template>

<style lang="scss" scoped>
.websocket {
  width: 500px;
}
</style>
