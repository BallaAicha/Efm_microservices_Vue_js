import type { AddressInterface } from "~/interfaces/user/address.interface";
import type { UserInterface, UserWithAddressInterface } from "~/interfaces/user/user.interface";

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

export const getUsers = async (): Promise<UserInterface[]> => {
  try {
    const { apiUrl, headers } = getConfig();

    return await $fetch<UserInterface[]>(`${apiUrl}/users`, {
      method: "GET",
      headers,
    });
  } catch (err: any) {
    console.error("Erreur lors de la récupération des utilisateurs :", err);
    throw new Error(err?.data?.message || "Erreur inconnue");
  }
};

export const getUser = async (): Promise<UserWithAddressInterface> => {
  try {
    const { apiUrl, headers } = getConfig();

    const response = await $fetch<any>(`${apiUrl}/auth/users/me`, {
      method: "GET",
      headers,
    });

    return response.user as UserWithAddressInterface
  } catch (err: any) {
    console.error("Erreur lors de la récupération de l'utilisateur :", err);
    throw new Error(err?.data?.message || "Erreur inconnue");
  }
};

export const addUser = async (data: UserInterface): Promise<UserInterface> => {
  try {
    const { apiUrl } = getConfig();

    return await $fetch<UserInterface>(`${apiUrl}/auth/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });
  } catch (err: any) {
    console.error("Erreur lors de l'ajout de l'utilisateur :", err);
    throw new Error(err?.data?.message || "Erreur inconnue");
  }
};

export const editUser = async (data: UserInterface): Promise<UserInterface> => {
  try {
    const { apiUrl, headers } = getConfig();

    return await $fetch<UserInterface>(`${apiUrl}/users/${data.id}`, {
      method: "PUT",
      headers,
      body: data,
    });
  } catch (err: any) {
    console.error(`Erreur lors de la mise à jour de l'utilisateur avec l'ID ${data.id}:`, err);
    throw new Error(err?.data?.message || "Erreur inconnue");
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  try {
    const { apiUrl, headers } = getConfig();

    await $fetch<void>(`${apiUrl}/users/${id}`, {
      method: "DELETE",
      headers,
    });
  } catch (err: any) {
    console.error(`Erreur lors de la suppression de l'utilisateur avec l'ID ${id}:`, err);
    throw new Error(err?.data?.message || "Erreur inconnue");
  }
};
