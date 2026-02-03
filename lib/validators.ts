/**
 * Validates a civic ID format
 * @param civicId - The civic ID to validate
 * @returns true if valid, false otherwise
 */
export function validateCivicIdFormat(civicId: string): boolean {
  // Matches KE-NNNNNNNN (8 digits) OR KE-YYYY-NNNNNN (old format, 10 digits total numeric)
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
