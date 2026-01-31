export interface Petition {
  id: string;
  title: string;
  description: string;
  category: string;
  signatures: number;
  threshold: number;
  author: string;
  status: "Active" | "Goal Reached" | "Closed";
}

export const MOCK_PETITIONS: Petition[] = [
  {
    id: "pet-1",
    title: "Stop the 3% Digital Content Tax",
    description: "The proposed 3% tax on digital content creators is too high and will stifle the youth-led gig economy.",
    category: "Economy",
    signatures: 12450,
    threshold: 15000,
    author: "Digital Creators Association",
    status: "Active"
  },
  {
    id: "pet-2",
    title: "Audit of Kenya Power Billing system",
    description: "Request for an independent forensic audit of the KPLC billing system due to unexplained power cost spikes.",
    category: "Energy",
    signatures: 8200,
    threshold: 10000,
    author: "Consumer Rights Watch",
    status: "Active"
  },
  {
    id: "pet-3",
    title: "Implementation of SHIF Transparency Dashboard",
    description: "Demand for a real-time public dashboard showing hospital payments under the Social Health Insurance Fund.",
    category: "Health",
    signatures: 5000,
    threshold: 5000,
    author: "Health Workers Union",
    status: "Goal Reached"
  }
];

export class PetitionService {
  static signPetition(petitionId: string): number {
    const petition = MOCK_PETITIONS.find(p => p.id === petitionId);
    if (petition) {
      petition.signatures += 1;
      return petition.signatures;
    }
    return 0;
  }

  static generateAILetter(petitionTitle: string, userLocation: string): string {
    return `To the Honorable Representative of ${userLocation},\n\nI am writing to you as a concerned citizen regarding "${petitionTitle}". Our collective voice demands attention to this matter...`;
  }
}
