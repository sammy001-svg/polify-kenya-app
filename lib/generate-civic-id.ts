"use server";
// cspell:ignore supabase

import { createAdminClient } from "@/lib/supabase-admin";

/**
 * Generates a unique civic ID in the format KE-NNNNNNNN
 * KE = Kenya country code
 * NNNNNN = Random 8-digit number
 *
 * @returns Promise resolving to a unique civic ID
 */
export async function generateCivicId(): Promise<string> {
  const supabase = createAdminClient();
  const maxRetries = 10; 

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      // Generate a random 8-digit number
      const randomId = Math.floor(Math.random() * 100000000);
      const idStr = randomId.toString().padStart(8, "0");
      const newCivicId = `KE-${idStr}`;

      console.log(
        `[CivicID] Generated candidate: ${newCivicId}. Checking uniqueness...`,
      );

      // Verify uniqueness
      const { data: existing, error: checkError } = await supabase
        .from("profiles")
        .select("civic_id")
        .eq("civic_id", newCivicId)
        .single();

      if (checkError && checkError.code !== "PGRST116") {
        // PGRST116 is "Row not found" which is good here
        console.error(
          `[CivicID] Uniqueness Check Error:`,
          JSON.stringify(checkError, null, 2),
        );
        throw new Error(`Database error checking uniqueness: ${checkError.message}`);
      }

      if (!existing) {
        console.log(`[CivicID] Success: ${newCivicId}`);
        return newCivicId;
      }

      // If ID exists, retry
      console.warn(`Civic ID collision detected: ${newCivicId}. Retrying...`);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      console.error(
        "Error generating civic ID (attempt " + (attempt + 1) + "):",
        errorMessage,
      );
      if (attempt === maxRetries - 1) {
        throw new Error(
          "Failed to generate unique civic ID after multiple attempts"
        );
      }
      // Wait a bit before retrying
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 50));
    }
  }

  throw new Error("Failed to generate unique civic ID");
}

/**
 * Checks if a username is available
 * @param username - The username to check
 * @returns Promise resolving to true if available, false if taken
 */
export async function checkUsernameAvailability(
  username: string,
): Promise<boolean> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("username")
    .eq("username", username.toLowerCase())
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Error checking username availability:", error);
    throw new Error(`Database error checking username: ${error.message}`);
  }

  // If data exists, username is taken (return false). If data is null, username is available (return true).
  return !data;
}
