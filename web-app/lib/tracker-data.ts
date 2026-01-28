export interface Project {
  id: string;
  title: string;
  description: string;
  constituency: string;
  ward: string;
  sector: "Roads" | "Water" | "Health" | "Agriculture" | "Education";
  status: "Planned" | "In Progress" | "Completed" | "Stalled";
  budget: number;
  spent: number;
  startDate: string;
  endDate?: string;
  beforeImage?: string;
  afterImage?: string;
  progress: number;
}

export interface ConstituencyStats {
  id: string;
  name: string;
  cdfAllocation: number;
  cdfUtilized: number;
  projectsCount: number;
  completionRate: number;
  sectorDistribution: Record<string, number>; // sector -> percentage
}

export const MOCK_PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Kibera Community Road Upgrade",
    description:
      "Tarmacking of the main access road to improved accessibility and drainage.",
    constituency: "Kibra",
    ward: "Sarang'ombe",
    sector: "Roads",
    status: "In Progress",
    budget: 50000000,
    spent: 25000000,
    startDate: "2023-01-15",
    endDate: "2023-12-01",
    beforeImage:
      "https://images.unsplash.com/photo-1519566335946-e6f65f084553?w=800&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1596733430284-f74377bc21a6?w=800&q=80", // Placeholder
    progress: 50,
  },
  {
    id: "p2",
    title: "Mbagathi Hospital Wing Expansion",
    description: "Construction of a new maternity wing with 50-bed capacity.",
    constituency: "Lang'ata",
    ward: "Nairobi West",
    sector: "Health",
    status: "Completed",
    budget: 120000000,
    spent: 118000000,
    startDate: "2022-06-01",
    endDate: "2023-08-15",
    beforeImage:
      "https://images.unsplash.com/photo-1516937941348-c09e554b984c?w=800&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&q=80",
    progress: 100,
  },
  {
    id: "p3",
    title: "Sustainable Water Borehole Project",
    description:
      "Drilling and solar pump installation for community water access.",
    constituency: "Ruaraka",
    ward: "Utalii",
    sector: "Water",
    status: "Planned",
    budget: 8000000,
    spent: 0,
    startDate: "2024-03-01",
    progress: 0,
  },
  {
    id: "p4",
    title: "Greenhouse Youth Initiative",
    description: "Empowering youth with modern urban farming techniques.",
    constituency: "Kasarani",
    ward: "Clay City",
    sector: "Agriculture",
    status: "In Progress",
    budget: 15000000,
    spent: 10000000,
    startDate: "2023-09-10",
    progress: 75,
  },
];

export const CONSTITUENCY_STATS: ConstituencyStats[] = [
  {
    id: "c1",
    name: "Kibra",
    cdfAllocation: 137000000,
    cdfUtilized: 95000000,
    projectsCount: 24,
    completionRate: 68,
    sectorDistribution: {
      Education: 40,
      Roads: 25,
      Health: 20,
      Water: 10,
      Agriculture: 5,
    },
  },
  {
    id: "c2",
    name: "Lang'ata",
    cdfAllocation: 140000000,
    cdfUtilized: 110000000,
    projectsCount: 30,
    completionRate: 85,
    sectorDistribution: {
      Education: 35,
      Roads: 30,
      Health: 25,
      Water: 5,
      Agriculture: 5,
    },
  },
];
