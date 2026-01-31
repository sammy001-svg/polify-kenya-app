export interface MCAPerformance {
  id: string;
  name: string;
  ward: string;
  county: string;
  attendance: number; // percentage
  billsSponsored: number;
  wdfUtilization: number; // percentage (Ward Development Fund)
  rating: number; // 0-5
  lastAction: string;
}

export const MCA_PERFORMANCE_DATA: MCAPerformance[] = [
  {
    id: "mca-1",
    name: "Hon. Johnson Kamau",
    ward: "Upper Hill",
    county: "Nairobi",
    attendance: 92,
    billsSponsored: 4,
    wdfUtilization: 78,
    rating: 4.2,
    lastAction: "Proposed Ward-level Waste Management Bill"
  },
  {
    id: "mca-2",
    name: "Hon. Beatrice Atieno",
    ward: "Nyalenda B",
    county: "Kisumu",
    attendance: 85,
    billsSponsored: 2,
    wdfUtilization: 45,
    rating: 3.1,
    lastAction: "Motion to renovate Nyalenda Market"
  },
  {
    id: "mca-3",
    name: "Hon. Khalifa Juma",
    ward: "Old Town",
    county: "Mombasa",
    attendance: 65,
    billsSponsored: 0,
    wdfUtilization: 12,
    rating: 1.8,
    lastAction: "Absent for 3 consecutive sittings"
  }
];
