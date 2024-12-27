export const nameRules = [(v: string) => !!v || "Le nom est requis"];

export const emailRules = [
  (v: string) => !!v || "L'email est requis",
  (v: string) => /.+@.+\..+/.test(v) || "L'email doit être valide",
];

export const phoneRules = [
  (v: string) => !!v || "Le numéro de téléphone est requis",
  (v: string) =>
    v.length >= 10 ||
    "Le numéro de téléphone doit comporter au moins 10 caractères",
  (v: string) =>
    /^\+?\d+$/.test(v) ||
    "Le numéro de téléphone doit être numérique et peut commencer par '+'",
];

export const passwordRules = [
  (v: string) => !!v || "Le mot de passe est requis",
  (v: string) =>
    v.length >= 6 || "Le mot de passe doit comporter au moins 6 caractères",
];

export const passwordConfirmationRules = (password: string) => [
  (v: string) => !!v || "La confirmation du mot de passe est requise",
  (v: string) => v === password || "Les mots de passe ne correspondent pas",
];

// Règles de validation pour le formulaire de listing
export const titleRules = [
  (v: string) => !!v || "Le titre est requis",
  (v: string) => v.length >= 3 || "Le titre doit comporter au moins 3 caractères",
];

export const priceRules = [
  (v: number | string) => !!v || "Le prix est requis",
  (v: number | string) => Number(v) > 0 || "Le prix doit être supérieur à 0",
  (v: number | string) =>
    /^[0-9]+(\.[0-9]{1,2})?$/.test(v.toString()) ||
    "Le prix doit être un nombre valide (ex: 100 ou 99.99)",
];

export const locationRules = [
  (v: string) => !!v || "La localisation est requise",
  (v: string) => v.length >= 2 || "La localisation doit comporter au moins 2 caractères",
];

export const descriptionRules = [
  (v: string) => !!v || "La description est requise",
  (v: string) =>
    v.length <= 500 ||
    "La description ne doit pas dépasser 500 caractères",
];

export const categoryRules = [
  (v: any[]) =>
    !!v && v.length > 0 || "Veuillez sélectionner au moins une catégorie",
];

export const conditionRules = [
  (v: string) => !!v || "L'état est requis",
  (v: string) => ["NEW", "USED"].includes(v) || "L'état doit être valide",
];

export const statusRules = [
  (v: string) => !!v || "Le statut est requis",
  (v: string) =>
    ["ACTIVE", "SOLD", "REMOVED"].includes(v) || "Le statut doit être valide",
];

