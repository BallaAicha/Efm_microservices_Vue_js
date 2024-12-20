import type { CategoryInterface } from "~/interfaces/listing/category.interface";

export const getCategoriesAll = async (): Promise<any> => {
  try {
    const config = useRuntimeConfig();
    const token = useCookie("access_token");

    const response = await $fetch<any>(
      `${config.public.apiUrlCategory}/api/categories`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
      }
    );
    return response;
  } catch (err) {
    console.error("Erreur lors de la requête.", err);
    throw err;
  }
};

export const getCategory = async (id: number): Promise<CategoryInterface> => {
  try {
    const config = useRuntimeConfig();
    const token = useCookie("token");

    const response = await $fetch<any>(
      `${config.public.apiUrl}/categorys/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
      }
    );

    return response.data as CategoryInterface;
  } catch (err) {
    console.error("Erreur lors de la requête.", err);
    throw err;
  }
};

export const addCategory = async (
  data: CategoryInterface
): Promise<CategoryInterface> => {
  try {
    const config = useRuntimeConfig();
    const token = useCookie("token");

    const response = await $fetch<any>(`${config.public.apiUrl}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: {
        name: data.name,
        // Attributs category
      },
    });

    return response.data as CategoryInterface;
  } catch (err) {
    console.error("Erreur lors de la requête.", err);
    throw err;
  }
};

export const editCategory = async (
  data: CategoryInterface
): Promise<CategoryInterface> => {
  try {
    const config = useRuntimeConfig();
    const token = useCookie("token");

    const response = await $fetch<any>(
      `${config.public.apiUrl}/categorys/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
        body: {
          description: data.name,
          // Attributs category
        },
      }
    );

    return response.data as CategoryInterface;
  } catch (err) {
    console.error("Erreur lors de la requête.", err);
    throw err;
  }
};

export const deleteCategory = async (
  id: number
): Promise<CategoryInterface> => {
  try {
    const config = useRuntimeConfig();
    const token = useCookie("token");

    const response = await $fetch<any>(
      `${config.public.apiUrl}/categorys/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
      }
    );

    return response.data as CategoryInterface;
  } catch (err) {
    console.error("Erreur lors de la requête.", err);
    throw err;
  }
};
