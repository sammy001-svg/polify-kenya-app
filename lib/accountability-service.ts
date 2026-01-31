import { VOTING_RECORDS } from "./parliament-data";

export interface SyncScore {
  score: number;
  matchingVotes: number;
  totalCommonBills: number;
  divergentIssues: string[];
}

export class AccountabilityService {
  /**
   * Calculates the alignment between a user's votes and an MP's votes.
   * @param userVotes Record of billId to vote ('yay' | 'nay')
   * @param mpName Name of the MP to compare against
   */
  static calculateSyncScore(
    userVotes: Record<string, "yay" | "nay">,
    mpName: string
  ): SyncScore {
    const mpVotes = VOTING_RECORDS.filter((v) => v.mpName === mpName);
    let matches = 0;
    let common = 0;
    const divergentIssues: string[] = [];

    mpVotes.forEach((mpVote) => {
      const userVote = userVotes[mpVote.billId];
      if (userVote) {
        common++;
        const normalizedMpVote = mpVote.vote.toLowerCase() === "yes" ? "yay" : "nay";
        if (normalizedMpVote === userVote) {
          matches++;
        } else {
          // In a real app, we'd pull the bill category/tags here
          divergentIssues.push(mpVote.billId);
        }
      }
    });

    return {
      score: common > 0 ? Math.round((matches / common) * 100) : 0,
      matchingVotes: matches,
      totalCommonBills: common,
      divergentIssues,
    };
  }

  /**
   * Gets the local user votes from storage.
   * In a real app, this would be from a database.
   */
  static getUserVotes(): Record<string, "yay" | "nay"> {
    if (typeof window === "undefined") return {};
    const votes = localStorage.getItem("polify_user_votes");
    return votes ? JSON.parse(votes) : {};
  }

  /**
   * Saves a user vote locally.
   */
  static saveUserVote(billId: string, vote: "yay" | "nay") {
    if (typeof window === "undefined") return;
    const votes = this.getUserVotes();
    votes[billId] = vote;
    localStorage.setItem("polify_user_votes", JSON.stringify(votes));
    
    // Dispatch event for UI updates
    window.dispatchEvent(new CustomEvent("user-voted"));
  }
}
