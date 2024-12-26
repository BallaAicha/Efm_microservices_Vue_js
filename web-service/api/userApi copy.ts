import type { AddressInterface } from "~/interfaces/user/address.interface";
import type {
  UserInterface,
  UserWithAddressInterface,
} from "~/interfaces/user/user.interface";

export const getUsers = async (): Promise<UserInterface> => {
  try {
    const config = useRuntimeConfig();
    const access_token = useCookie("access_token");

    const response = await $fetch<UserInterface>(
      `${config.public.apiUrl}/users`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token.value}`,
        },
      }
    );

    return response as UserInterface;
  } catch (err) {
    console.error("Erreur lors de la requête.", err);
    throw err;
  }
};

export const getUser = async (): Promise<UserWithAddressInterface>=> {
  try {
    const config = useRuntimeConfig();
    const access_token = useCookie("access_token");

    const response = await $fetch<any>(
      `${config.public.apiUrl}/auth/users/me`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token.value}`,
        },
      }
    );

    return response.user as UserWithAddressInterface;
  } catch (err) {
    console.error("Erreur lors de la requête.", err);
    throw err;
  }
};

export const addUser = async (data: UserInterface): Promise<any> => {
  try {
    const config = useRuntimeConfig();
    // const access_token = useCookie("access_token");

    const response = await $fetch<UserInterface>(
      `${config.public.apiUrl}/auth/users`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${access_token.value}`,
        },
        body: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          phoneNumber: data.phoneNumber,
        },
      }
    );

    return response;
  } catch (err) {
    console.error("Erreur lors de la requête.", err);
    throw err;
  }
};

export const editUser = async (data: UserInterface): Promise<UserInterface> => {
  try {
    const config = useRuntimeConfig();
    const access_token = useCookie("access_token");

    const response = await $fetch<any>(
      `${config.public.apiUrl}/users/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token.value}`,
        },
        body: {
          name: data.name,
          email: data.email,
          password: data.password,
          phoneNumber: data.phoneNumber,
        },
      }
    );

    return response.data as UserInterface;
  } catch (err) {
    console.error("Erreur lors de la requête.", err);
    throw err;
  }
};

export const deleteUser = async (id: number): Promise<UserInterface> => {
  try {
    const config = useRuntimeConfig();
    const access_token = useCookie("access_token");

    const response = await $fetch<any>(`${config.public.apiUrl}/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token.value}`,
      },
    });

    return response.data as UserInterface;
  } catch (err) {
    console.error("Erreur lors de la requête.", err);
    throw err;
  }
};
