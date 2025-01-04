import type { MessageInterface } from "~/interfaces/message.interface";

const getConfig = () => {
  const config = useRuntimeConfig();
  const token = useCookie("access_token");
  return {
    apiUrl: config.public.apiUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.value}`,
    },
  };
};

export const getMessages = async (channelName: string): Promise<MessageInterface[]> => {
  try {
    const { apiUrl, headers } = getConfig();

    return await $fetch<MessageInterface[]>(`${apiUrl}/auth/api/chat/${channelName}`, {
      method: "GET",
      headers,
    });
  } catch (err: any) {
    console.error("Erreur lors de la récupération des messages :", err);
    throw new Error(err?.data?.message || "Erreur inconnue");
  }
};
