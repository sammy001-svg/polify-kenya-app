export type CountyProjectStatus = 'Completed' | 'In Progress' | 'Stalled' | 'Planned';

export interface CountyProject {
  name: string;
  status: CountyProjectStatus;
  details?: string;
}

export interface CountyData {
  name: string;
  projects: CountyProject[];
}

export interface RegionData {
  region: string;
  counties: CountyData[];
}

export const COUNTY_PROJECTS_DATA: RegionData[] = [
  {
    region: "Nairobi Region",
    counties: [
      {
        name: "Nairobi",
        projects: [
          { name: "Nairobi Expressway", status: "Completed", details: "~KES 88B, China Road and Bridge Corporation" },
          { name: "Commuter Rail Upgrade", status: "In Progress", details: "multi-billion, Kenya Railways" },
          { name: "Affordable Housing", status: "In Progress", details: "KES 1–5B per site, multiple contractors" },
          { name: "ICT Digital Hubs", status: "In Progress", details: "Gov + private sector" },
          { name: "Sewerage Upgrade", status: "In Progress" }
        ]
      },
      {
        name: "Kiambu",
        projects: [
          { name: "Thika Road Expansion", status: "Completed", details: "~KES 32B" },
          { name: "Industrial Parks", status: "In Progress" },
          { name: "Last Mile Electricity", status: "In Progress" },
          { name: "Affordable Housing", status: "In Progress" },
          { name: "Water projects", status: "In Progress" }
        ]
      },
      {
        name: "Machakos",
        projects: [
          { name: "Konza Technopolis", status: "In Progress", details: "~KES 500B long-term, Gov + PPP" },
          { name: "Leather Industrial Park", status: "In Progress", details: "~KES 5B" },
          { name: "Housing Projects", status: "In Progress" },
          { name: "Road dualing (Athi River)", status: "In Progress" },
          { name: "ICT infrastructure", status: "In Progress" }
        ]
      },
      {
        name: "Kajiado",
        projects: [
          { name: "Namanga Highway", status: "Completed" },
          { name: "Inland logistics hub", status: "In Progress" },
          { name: "Power transmission lines", status: "In Progress" },
          { name: "Water pipelines", status: "In Progress" },
          { name: "Housing", status: "In Progress" }
        ]
      }
    ]
  },
  {
    region: "Coast Region",
    counties: [
      {
        name: "Mombasa",
        projects: [
          { name: "Dongo Kundu Bypass", status: "In Progress", details: "~KES 40B, Japan-funded" },
          { name: "Port expansion", status: "In Progress" },
          { name: "SGR terminus", status: "Completed" },
          { name: "Urban roads", status: "In Progress" },
          { name: "Sewer upgrade", status: "In Progress" }
        ]
      },
      {
        name: "Lamu",
        projects: [
          { name: "LAPSSET Port", status: "In Progress", details: "~KES 300B+" },
          { name: "Oil pipeline (planned)", status: "In Progress" },
          { name: "Resort city", status: "In Progress" },
          { name: "Highway corridor", status: "In Progress" },
          { name: "Airport upgrade", status: "In Progress" }
        ]
      },
      {
        name: "Kilifi",
        projects: [
          { name: "Tourism roads", status: "In Progress" },
          { name: "Electrification", status: "In Progress" },
          { name: "Water desalination", status: "In Progress" },
          { name: "Housing", status: "In Progress" },
          { name: "SME programs", status: "In Progress" }
        ]
      },
      {
        name: "Kwale",
        projects: [
          { name: "Dongo Kundu link", status: "In Progress" },
          { name: "Mining infrastructure", status: "In Progress" },
          { name: "Roads", status: "In Progress" },
          { name: "Power", status: "In Progress" },
          { name: "Water", status: "In Progress" }
        ]
      },
      {
        name: "Taita Taveta",
        projects: [
          { name: "Voi–Taveta road", status: "In Progress" },
          { name: "Mining logistics", status: "In Progress" },
          { name: "Power grid", status: "In Progress" },
          { name: "Irrigation", status: "In Progress" },
          { name: "Border trade infrastructure", status: "In Progress" }
        ]
      },
      {
        name: "Tana River",
        projects: [
          { name: "Irrigation schemes", status: "In Progress" },
          { name: "Galana-Kulalu food project", status: "In Progress", details: "~KES 7B+ phases" },
          { name: "Roads", status: "In Progress" },
          { name: "Water", status: "In Progress" },
          { name: "Solar energy", status: "In Progress" }
        ]
      }
    ]
  },
  {
    region: "North & ASAL Counties",
    counties: [
      {
        name: "Turkana",
        projects: [
          { name: "Lokichar oil", status: "In Progress", details: "~KES 200B est., Tullow Oil" },
          { name: "Wind/solar", status: "In Progress" },
          { name: "Roads", status: "In Progress" },
          { name: "Water", status: "In Progress" },
          { name: "LAPSSET pipeline", status: "In Progress" }
        ]
      },
      {
        name: "Marsabit",
        projects: [
          { name: "Isiolo–Marsabit road", status: "Completed" },
          { name: "Wind power", status: "In Progress" },
          { name: "Cross-border trade", status: "In Progress" },
          { name: "Water", status: "In Progress" },
          { name: "Electrification", status: "In Progress" }
        ]
      },
      {
        name: "Garissa",
        projects: [
          { name: "Irrigation", status: "In Progress" },
          { name: "Solar plants", status: "In Progress" },
          { name: "Roads", status: "In Progress" },
          { name: "Security infrastructure", status: "In Progress" },
          { name: "Water", status: "In Progress" }
        ]
      },
      {
        name: "Wajir",
        projects: [
          { name: "Roads", status: "In Progress" },
          { name: "Water projects", status: "In Progress" },
          { name: "Electrification", status: "In Progress" },
          { name: "ICT", status: "In Progress" },
          { name: "Health infrastructure", status: "In Progress" }
        ]
      },
      {
        name: "Mandera",
        projects: [
          { name: "Road corridor", status: "In Progress" },
          { name: "Border posts", status: "In Progress" },
          { name: "Water", status: "In Progress" },
          { name: "Power", status: "In Progress" },
          { name: "ICT", status: "In Progress" }
        ]
      },
      {
        name: "Isiolo",
        projects: [
          { name: "Resort city", status: "In Progress" },
          { name: "Airport", status: "Completed" },
          { name: "LAPSSET hub", status: "In Progress" },
          { name: "Roads", status: "In Progress" },
          { name: "Water", status: "In Progress" }
        ]
      },
      {
        name: "Samburu",
        projects: [
          { name: "Roads", status: "In Progress" },
          { name: "Tourism infrastructure", status: "In Progress" },
          { name: "Water", status: "In Progress" },
          { name: "Power", status: "In Progress" },
          { name: "Livestock programs", status: "In Progress" }
        ]
      }
    ]
  },
  {
    region: "Rift Valley",
    counties: [
      {
        name: "Nakuru",
        projects: [
          { name: "Naivasha ICD", status: "Completed" },
          { name: "Geothermal (Olkaria)", status: "In Progress", details: "~KES 150B cumulative" },
          { name: "Roads", status: "In Progress" },
          { name: "Housing", status: "In Progress" },
          { name: "Industrial parks", status: "In Progress" }
        ]
      },
      {
        name: "Uasin Gishu",
        projects: [
          { name: "Agro-processing", status: "In Progress" },
          { name: "Roads", status: "In Progress" },
          { name: "Housing", status: "In Progress" },
          { name: "ICT", status: "In Progress" },
          { name: "SME funds", status: "In Progress" }
        ]
      },
      {
        name: "Baringo",
        projects: [
          { name: "Geothermal exploration", status: "In Progress" },
          { name: "Irrigation", status: "In Progress" },
          { name: "Roads", status: "In Progress" },
          { name: "Water", status: "In Progress" },
          { name: "Livestock", status: "In Progress" }
        ]
      },
      {
        name: "Elgeyo Marakwet",
        projects: [
          { name: "Roads", status: "In Progress" },
          { name: "Irrigation", status: "In Progress" },
          { name: "Water", status: "In Progress" },
          { name: "Rural electrification", status: "In Progress" },
          { name: "Schools", status: "In Progress" }
        ]
      },
      {
        name: "West Pokot",
        projects: [
          { name: "Roads", status: "In Progress" },
          { name: "Water", status: "In Progress" },
          { name: "Irrigation", status: "In Progress" },
          { name: "Electrification", status: "In Progress" },
          { name: "Livestock", status: "In Progress" }
        ]
      },
      {
        name: "Narok",
        projects: [
          { name: "Tourism roads", status: "In Progress" },
          { name: "Water", status: "In Progress" },
          { name: "Power", status: "In Progress" },
          { name: "Irrigation", status: "In Progress" },
          { name: "Housing", status: "In Progress" }
        ]
      },
      {
        name: "Laikipia",
        projects: [
          { name: "Roads", status: "In Progress" },
          { name: "ICT", status: "In Progress" },
          { name: "Power", status: "In Progress" },
          { name: "Water", status: "In Progress" },
          { name: "Agriculture", status: "In Progress" }
        ]
      },
      {
        name: "Kericho / Bomet",
        projects: [
          { name: "Tea value chains", status: "In Progress" },
          { name: "Roads", status: "In Progress" },
          { name: "Water", status: "In Progress" },
          { name: "Power", status: "In Progress" },
          { name: "Housing", status: "In Progress" }
        ]
      }
    ]
  },
  {
    region: "Western",
    counties: [
      {
        name: "Kisumu",
        projects: [
          { name: "Port revival", status: "Completed", details: "~KES 3B" },
          { name: "Airport expansion", status: "In Progress" },
          { name: "Roads", status: "In Progress" },
          { name: "Housing", status: "In Progress" },
          { name: "ICT hubs", status: "In Progress" }
        ]
      },
      {
        name: "Kakamega",
        projects: [
          { name: "Airstrip", status: "In Progress" },
          { name: "Sugar factories", status: "In Progress" },
          { name: "Roads", status: "In Progress" },
          { name: "Water", status: "In Progress" },
          { name: "Electrification", status: "In Progress" }
        ]
      },
      {
        name: "Bungoma",
        projects: [
          { name: "Agro-processing", status: "In Progress" },
          { name: "Roads", status: "In Progress" },
          { name: "Water", status: "In Progress" },
          { name: "Power", status: "In Progress" },
          { name: "Housing", status: "In Progress" }
        ]
      },
      {
        name: "Busia",
        projects: [
          { name: "Border trade infrastructure", status: "In Progress" },
          { name: "Roads", status: "In Progress" },
          { name: "Water", status: "In Progress" },
          { name: "Power", status: "In Progress" },
          { name: "ICT", status: "In Progress" }
        ]
      }
    ]
  },
  {
    region: "Central",
    counties: [
      {
        name: "Nyeri",
        projects: [
          { name: "Irrigation", status: "In Progress" },
          { name: "Roads", status: "In Progress" },
          { name: "Agriculture", status: "In Progress" },
          { name: "ICT", status: "In Progress" },
          { name: "Housing", status: "In Progress" }
        ]
      },
      {
        name: "Murang’a",
        projects: [
          { name: "Water (Thiba Dam influence)", status: "In Progress", details: "~KES 20B" },
          { name: "Roads", status: "In Progress" },
          { name: "ICT", status: "In Progress" },
          { name: "Agriculture", status: "In Progress" },
          { name: "Power", status: "In Progress" }
        ]
      },
      {
        name: "Kirinyaga",
        projects: [
          { name: "Rice irrigation", status: "In Progress" },
          { name: "Roads", status: "In Progress" },
          { name: "Water", status: "In Progress" },
          { name: "Power", status: "In Progress" },
          { name: "Housing", status: "In Progress" }
        ]
      },
      {
        name: "Nyandarua",
        projects: [
          { name: "Roads", status: "In Progress" },
          { name: "Water", status: "In Progress" },
          { name: "Agriculture", status: "In Progress" },
          { name: "Power", status: "In Progress" },
          { name: "ICT", status: "In Progress" }
        ]
      },
      {
        name: "Embu",
        projects: [
          { name: "Housing", status: "In Progress" },
          { name: "Roads", status: "In Progress" },
          { name: "Irrigation", status: "In Progress" },
          { name: "Water", status: "In Progress" },
          { name: "ICT", status: "In Progress" }
        ]
      }
    ]
  },
  {
    region: "Eastern",
    counties: [
      {
        name: "Kitui",
        projects: [
          { name: "Thwake Dam", status: "In Progress", details: "~KES 80B" },
          { name: "Roads", status: "In Progress" },
          { name: "Water", status: "In Progress" },
          { name: "Power", status: "In Progress" },
          { name: "Coal project", status: "Stalled" }
        ]
      },
      {
        name: "Makueni",
        projects: [
          { name: "Thwake Dam", status: "In Progress" },
          { name: "Roads", status: "In Progress" },
          { name: "Water", status: "In Progress" },
          { name: "ICT", status: "In Progress" },
          { name: "Agriculture", status: "In Progress" }
        ]
      },
      {
        name: "Meru / Tharaka Nithi",
        projects: [
          { name: "Irrigation", status: "In Progress" },
          { name: "Roads", status: "In Progress" },
          { name: "Agriculture", status: "In Progress" },
          { name: "Power", status: "In Progress" },
          { name: "Water", status: "In Progress" }
        ]
      }
    ]
  }
];
