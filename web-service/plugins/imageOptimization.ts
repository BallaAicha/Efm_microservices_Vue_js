import imageCompression from "browser-image-compression";

export default defineNuxtPlugin(() => {
  const compressAndResizeImage = async (file: File): Promise<File> => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      console.error("Erreur lors de l'optimisation de l'image :", error);
      throw error;
    }
  };

  return {
    provide: {
      optimizeImage: compressAndResizeImage,
    },
  };
});
