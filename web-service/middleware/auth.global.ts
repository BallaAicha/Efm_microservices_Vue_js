import { useMessageStore } from "../stores/message";

export default defineNuxtRouteMiddleware(async (to) => {
  const { authenticated } = storeToRefs(useAuthStore()); // Reactive store state
  const { initializeStore } = useAuthStore();
  // const { user } = storeToRefs(useAuthStore());
  const messageStore = useMessageStore();

  await initializeStore();

  if (to?.name === "messages") {
    //TODO add user.name
    // console.log(user.value?.firstName + '_' + user.value?.lastName + 'messages');
    messageStore.close(); // Fermer le message d'erreur si ouvert
  }

  // Redirect authenticated users from /login to /
  if (authenticated.value && to?.name === "login") {
    return navigateTo("/");
  }

  // Redirect unauthenticated users to /login
  if (!authenticated.value && to?.name !== "login") {
    abortNavigation(); // Prevent further navigation
    return navigateTo("/login");
  }
});
