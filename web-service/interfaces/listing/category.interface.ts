// Category
export interface CategoryInterface {
  id?: string | undefined; // UUID
  name: string;
  description: string;
  parentCategoryId?: string; // UUID (relation récursive pour les sous-catégories)
}
