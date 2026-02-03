import { createClient } from "./supabase";

/**
 * Generates a unique civic ID in the format KE-YYYY-NNNNNN
 * KE = Kenya country code
 * YYYY = Current year
 * NNNNNN = Sequential 6-digit number (padded with zeros)
 *
 * @returns Promise resolving to a unique civic ID
 */
export async function generateCivicId(): Promise<string> {
  const supabase = createClient();
  const maxRetries = 10; // Increased retries for random generation

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
        throw checkError;
      }

      if (!existing) {
        console.log(`[CivicID] Success: ${newCivicId}`);
        return newCivicId;
      }

      // If ID exists, retry
      console.warn(`Civic ID collision detected: ${newCivicId}. Retrying...`);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : JSON.stringify(err);
      console.error(
        "Error generating civic ID (attempt " + (attempt + 1) + "):",
        errorMessage,
      );
      if (attempt === maxRetries - 1) {
        throw new Error(
          "Failed to generate unique civic ID after multiple attempts",
        );
      }
      // Wait a bit before retrying, but no delay needed for random clashes usually
      // Random wait just in case of intense contention
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 50));
    }
  }

  throw new Error("Failed to generate unique civic ID");
}

/**
 * Validates a civic ID format
 * @param civicId - The civic ID to validate
 * @returns true if valid, false otherwise
 */
export function validateCivicIdFormat(civicId: string): boolean {
  // Matches KE-NNNNNNNN (8 digits) OR KE-YYYY-NNNNNN (old format, 10 digits total numeric)
  // We allow old format for backward compatibility if needed, but strict request was 8 digits for NEW ones.
  // The validator might need to be strict or lenient. Let's make it support BOTH to avoid breaking existing users in UI.
  // New format: KE-12345678
  // Old format: KE-2023-123456
  return /^KE-(\d{8}|\d{4}-\d{6})$/.test(civicId);
}

/**
 * Validates a username format
 * @param username - The username to validate
 * @returns Object with isValid flag and optional error message
 */
export function validateUsername(username: string): {
  isValid: boolean;
  error?: string;
} {
  if (!username || username.length < 3) {
    return { isValid: false, error: "Username must be at least 3 characters" };
  }

  if (username.length > 20) {
    return { isValid: false, error: "Username must be 20 characters or less" };
  }

  const pattern = /^[a-z0-9_]+$/;
  if (!pattern.test(username)) {
    return {
      isValid: false,
      error:
        "Username can only contain lowercase letters, numbers, and underscores",
    };
  }

  return { isValid: true };
}

/**
 * Checks if a username is available
 * @param username - The username to check
 * @returns Promise resolving to true if available, false if taken
 */
export async function checkUsernameAvailability(
  username: string,
): Promise<boolean> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("username")
    .eq("username", username.toLowerCase())
    .single();

  if (error && error.code === "PGRST116") {
    // No rows returned means username is available
    return true;
  }

  return !data;
}
