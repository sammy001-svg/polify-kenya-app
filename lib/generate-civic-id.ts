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
  const currentYear = new Date().getFullYear();
  const maxRetries = 5;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      console.log(`[CivicID] Attempt ${attempt+1}: Querying profiles...`);
      // Get the highest civic ID for the current year
      const { data: profiles, error } = await supabase
        .from("profiles")
        .select("civic_id")
        .like("civic_id", `KE-${currentYear}-%`)
        .order("civic_id", { ascending: false })
        .limit(1);

      if (error) {
        console.error(`[CivicID] Query Error:`, JSON.stringify(error, null, 2));
        throw error;
      }

      let nextSequence = 1;

      if (profiles && profiles.length > 0) {
        // Extract sequence number from the latest ID
        const latestId = profiles[0].civic_id;
        const sequencePart = latestId.split("-")[2];
        nextSequence = parseInt(sequencePart, 10) + 1;
      }

      // Format the new civic ID
      const sequenceStr = nextSequence.toString().padStart(6, "0");
      const newCivicId = `KE-${currentYear}-${sequenceStr}`;
      
      console.log(`[CivicID] Generated candidate: ${newCivicId}. Checking uniqueness...`);

      // Verify uniqueness (in case of race condition)
      const { data: existing, error: checkError } = await supabase
        .from("profiles")
        .select("civic_id")
        .eq("civic_id", newCivicId)
        .single();
        
      if (checkError && checkError.code !== 'PGRST116') {
         // PGRST116 is "Row not found" which is good here
         console.error(`[CivicID] Uniqueness Check Error:`, JSON.stringify(checkError, null, 2));
         throw checkError;
      }

      if (!existing) {
        console.log(`[CivicID] Success: ${newCivicId}`);
        return newCivicId;
      }

      // If ID exists, retry
      console.warn(`Civic ID collision detected: ${newCivicId}. Retrying...`);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : JSON.stringify(err);
      console.error("Error generating civic ID (attempt " + (attempt + 1) + "):", errorMessage);
      if (attempt === maxRetries - 1) {
        throw new Error("Failed to generate unique civic ID after multiple attempts");
      }
      // Wait a bit before retrying
      await new Promise(resolve => setTimeout(resolve, 100 * (attempt + 1)));
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
  const pattern = /^KE-\d{4}-\d{6}$/;
  return pattern.test(civicId);
}

/**
 * Validates a username format
 * @param username - The username to validate
 * @returns Object with isValid flag and optional error message
 */
export function validateUsername(username: string): { isValid: boolean; error?: string } {
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
      error: "Username can only contain lowercase letters, numbers, and underscores",
    };
  }

  return { isValid: true };
}

/**
 * Checks if a username is available
 * @param username - The username to check
 * @returns Promise resolving to true if available, false if taken
 */
export async function checkUsernameAvailability(username: string): Promise<boolean> {
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
