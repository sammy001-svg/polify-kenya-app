import { createClient } from "./supabase";

/**
 * Validates an image file for upload
 * @param file - The file to validate
 * @returns Object with isValid flag and optional error message
 */
export function validateImageFile(file: File): { isValid: boolean; error?: string } {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: "Invalid file type. Please upload a JPG, PNG, or WebP image.",
    };
  }

  if (file.size > maxSize) {
    return {
      isValid: false,
      error: "File size exceeds 5MB. Please upload a smaller image.",
    };
  }

  return { isValid: true };
}

/**
 * Compresses an image file before upload
 * @param file - The image file to compress
 * @param maxWidth - Maximum width for the compressed image
 * @returns Promise resolving to compressed File
 */
export async function compressImage(file: File, maxWidth: number = 800): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              reject(new Error("Failed to compress image"));
            }
          },
          file.type,
          0.85 // Quality
        );
      };

      img.onerror = () => reject(new Error("Failed to load image"));
    };

    reader.onerror = () => reject(new Error("Failed to read file"));
  });
}

/**
 * Uploads an avatar image to Supabase Storage
 * @param file - The image file to upload
 * @param userId - The user's ID
 * @returns Promise resolving to the public URL of the uploaded image
 */
export async function uploadAvatar(file: File, userId: string): Promise<string> {
  const supabase = createClient();

  // Validate file
  const validation = validateImageFile(file);
  if (!validation.isValid) {
    throw new Error(validation.error);
  }

  // Compress image
  const compressedFile = await compressImage(file);

  // Generate unique filename
  const fileExt = file.name.split(".").pop();
  const fileName = `${userId}/avatar.${fileExt}`;
  const filePath = fileName;

  // Upload to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, compressedFile, {
      upsert: true, // Replace if exists
      contentType: file.type,
    });

  if (uploadError) {
    throw new Error(`Failed to upload avatar: ${uploadError.message}`);
  }

  // Get public URL
  const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

  return data.publicUrl;
}

/**
 * Deletes a user's avatar from Supabase Storage
 * @param userId - The user's ID
 * @returns Promise resolving when deletion is complete
 */
export async function deleteAvatar(userId: string): Promise<void> {
  const supabase = createClient();

  // List all files in user's folder
  const { data: files, error: listError } = await supabase.storage
    .from("avatars")
    .list(userId);

  if (listError) {
    throw new Error(`Failed to list avatars: ${listError.message}`);
  }

  if (!files || files.length === 0) {
    return; // No avatar to delete
  }

  // Delete all files in the folder
  const filePaths = files.map((file) => `${userId}/${file.name}`);
  const { error: deleteError } = await supabase.storage
    .from("avatars")
    .remove(filePaths);

  if (deleteError) {
    throw new Error(`Failed to delete avatar: ${deleteError.message}`);
  }
}

/**
 * Uploads a petition image to Supabase Storage
 * @param file - The image file to upload
 * @param userId - The user's ID
 * @returns Promise resolving to the public URL of the uploaded image
 */
export async function uploadPetitionImage(file: File, userId: string): Promise<string> {
  const supabase = createClient();

  const validation = validateImageFile(file);
  if (!validation.isValid) {
    throw new Error(validation.error);
  }

  // Compress image (larger size for petitions)
  const compressedFile = await compressImage(file, 1200);

  // Generate unique filename
  const fileExt = file.name.split(".").pop();
  const fileName = `${userId}/${Date.now()}.${fileExt}`;

  // Upload to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from("petitions")
    .upload(fileName, compressedFile, {
      upsert: false,
      contentType: file.type,
    });

  if (uploadError) {
    throw new Error(`Failed to upload petition image: ${uploadError.message}`);
  }

  // Get public URL
  const { data } = supabase.storage.from("petitions").getPublicUrl(fileName);

  return data.publicUrl;
}
