import type { ListingInterface } from "~/interfaces/listing/listing.interface";

const getConfig = () => {
  const config = useRuntimeConfig();
  const token = useCookie("access_token");
  return {
    apiUrl: config.public.apiUrlListing,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.value}`,
    },
  };
};

export const getListings = async (): Promise<ListingInterface[]> => {
  try {
    const { apiUrl, headers } = getConfig();

    return await $fetch<ListingInterface[]>(`${apiUrl}/api/listings`, {
      method: "GET",
      headers,
    });
  } catch (err: any) {
    console.error("Erreur lors de la récupération des listings :", err);
    throw new Error(err?.data?.message || "Erreur inconnue");
  }
};

export const getListing = async (id: string): Promise<ListingInterface> => {
  try {
    const { apiUrl, headers } = getConfig();

    return await $fetch<ListingInterface>(`${apiUrl}/api/listings/${id}`, {
      method: "GET",
      headers,
    });
  } catch (err: any) {
    console.error(
      `Erreur lors de la récupération du listing avec l'ID ${id}:`,
      err
    );
    throw new Error(err?.data?.message || "Erreur inconnue");
  }
};

export const addListing = async (
  data: ListingInterface
): Promise<ListingInterface> => {
  try {
    const { apiUrl, headers } = getConfig();

    return await $fetch<ListingInterface>(`${apiUrl}/api/listings`, {
      method: "POST",
      headers,
      body: data,
    });
  } catch (err: any) {
    console.error("Erreur lors de l'ajout d'un listing :", err);
    throw new Error(err?.data?.message || "Erreur inconnue");
  }
};

export const addListingToFavorite = async (
  listingId: string
): Promise<any> => {
  try {
    const { apiUrl, headers } = getConfig();

    return await $fetch<any>(`${apiUrl}/favorites/add`, {
      method: "POST",
      headers,
      params: {
        listingId: listingId,
      },
    });
  } catch (err: any) {
    console.error("Erreur lors de l'ajout d'un listing :", err);
    throw new Error(err?.data?.message || "Erreur inconnue");
  }
};

export const getListingsFavorite = async (): Promise<any> => {
  try {
    const { apiUrl, headers } = getConfig();

    return await $fetch<ListingInterface[]>(`${apiUrl}/favorites`, {
      method: "GET",
      headers,
    });
  } catch (err: any) {
    console.error("Erreur lors de la récupération des favoris :", err);
    throw new Error(err?.data?.message || "Erreur inconnue");
  }
};

export const editListing = async (
  data: ListingInterface
): Promise<ListingInterface> => {
  try {
    const { apiUrl, headers } = getConfig();

    return await $fetch<ListingInterface>(`${apiUrl}/listings/${data.id}`, {
      method: "PUT",
      headers,
      body: data,
    });
  } catch (err: any) {
    console.error(
      `Erreur lors de la mise à jour du listing avec l'ID ${data.id}:`,
      err
    );
    throw new Error(err?.data?.message || "Erreur inconnue");
  }
};

export const deleteListing = async (id: number): Promise<void> => {
  try {
    const { apiUrl, headers } = getConfig();

    await $fetch<void>(`${apiUrl}/listings/${id}`, {
      method: "DELETE",
      headers,
    });
  } catch (err: any) {
    console.error(
      `Erreur lors de la suppression du listing avec l'ID ${id}:`,
      err
    );
    throw new Error(err?.data?.message || "Erreur inconnue");
  }
};
