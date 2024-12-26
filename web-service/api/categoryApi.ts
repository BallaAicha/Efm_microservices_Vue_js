import type { CategoryInterface } from "~/interfaces/listing/category.interface";

const getConfig = () => {
  const config = useRuntimeConfig();
  const token = useCookie("access_token");
  return {
    apiUrl: config.public.apiUrlCategory + '/api',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.value}`,
    },
  };
};

export const getCategoriesAll = async (): Promise<CategoryInterface[]> => {
  try {
    const { apiUrl, headers } = getConfig();

    return await $fetch<CategoryInterface[]>(`${apiUrl}/categories`, {
      method: "GET",
      headers,
    });
  } catch (err: any) {
    console.error("Erreur lors de la récupération des catégories :", err);
    throw new Error(err?.data?.message || "Erreur inconnue");
  }
};

export const getCategory = async (id: number): Promise<CategoryInterface> => {
  try {
    const { apiUrl, headers } = getConfig();

    return await $fetch<CategoryInterface>(`${apiUrl}/categories/${id}`, {
      method: "GET",
      headers,
    });
  } catch (err: any) {
    console.error(`Erreur lors de la récupération de la catégorie ID ${id} :`, err);
    throw new Error(err?.data?.message || "Erreur inconnue");
  }
};

export const addCategory = async (
  data: CategoryInterface
): Promise<CategoryInterface> => {
  try {
    const { apiUrl, headers } = getConfig();

    return await $fetch<CategoryInterface>(`${apiUrl}/categories`, {
      method: "POST",
      headers,
      body: data,
    });
  } catch (err: any) {
    console.error("Erreur lors de l'ajout de la catégorie :", err);
    throw new Error(err?.data?.message || "Erreur inconnue");
  }
};

export const editCategory = async (
  data: CategoryInterface
): Promise<CategoryInterface> => {
  try {
    const { apiUrl, headers } = getConfig();

    return await $fetch<CategoryInterface>(`${apiUrl}/categories/${data.id}`, {
      method: "PUT",
      headers,
      body: data,
    });
  } catch (err: any) {
    console.error(`Erreur lors de la mise à jour de la catégorie ID ${data.id} :`, err);
    throw new Error(err?.data?.message || "Erreur inconnue");
  }
};

export const deleteCategory = async (id: number): Promise<void> => {
  try {
    const { apiUrl, headers } = getConfig();

    await $fetch<void>(`${apiUrl}/categories/${id}`, {
      method: "DELETE",
      headers,
    });
  } catch (err: any) {
    console.error(`Erreur lors de la suppression de la catégorie ID ${id} :`, err);
    throw new Error(err?.data?.message || "Erreur inconnue");
  }
};
