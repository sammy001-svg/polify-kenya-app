export interface ForensicQuery {
  id: string;
  category: "unsupported" | "misappropriation" | "irregularity" | "pending";
  description: string;
  amount: string;
  status: "flagged" | "resolved" | "investigating";
  page: number;
}

export interface AuditReport {
  id: string;
  title: string;
  entity: string; // Ministry or County
  region: "Nairobi" | "Coast" | "Rift Valley" | "Central" | "Western" | "Nyanza" | "North Eastern" | "Eastern" | "National";
  entityType: "National" | "County" | "Parastatal" | "Commission";
  fiscalYear: string;
  opinion: "Unmodified (Clean)" | "Qualified" | "Adverse" | "Disclaimer";
  summary: string;
  financialLoss?: string; // e.g. "KES 2.3B"
  downloadUrl: string; // Internal/Direct download
  officialUrl?: string; // Link to OAG website
  keyFindings: string[];
  forensicData?: ForensicQuery[];
  completionPct?: number;
}

export const AUDIT_REPORTS: AuditReport[] = [
  // National Government
  {
    id: "audit-national-2026",
    title: "National Government Budget Implementation Review",
    entity: "National Government",
    region: "National",
    entityType: "National",
    fiscalYear: "2025/2026",
    opinion: "Qualified",
    summary: "The government spent KES 4.2 Trillion against a revenue of KES 2.8 Trillion. Debt servicing costs have consumed 65% of ordinary revenue.",
    financialLoss: "KES 1.4T",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke/audit-reports/national-government",
    keyFindings: ["Debt servicing consumed 65% of revenue.", "Pending bills rose to KES 700B.", "Unbudgeted expenditures observed."],
    completionPct: 65,
    forensicData: [
      { id: "AQ-N-001", category: "unsupported", description: "Debt servicing allocation exceeds legislative cap by 12% without parliamentary approval.", amount: "150B", status: "flagged", page: 4 },
      { id: "AQ-N-002", category: "irregularity", description: "Opaque rollover of short-term loans with high-interest private lenders.", amount: "42B", status: "investigating", page: 28 }
    ]
  },
  // Ministries
  {
    id: "audit-moh-2026",
    title: "Ministry of Health - UHC Implementation",
    entity: "Ministry of Health",
    region: "National",
    entityType: "National",
    fiscalYear: "2025/2026",
    opinion: "Qualified",
    summary: "Implementation of SHIF transition marred by system failures and opaque tendering.",
    financialLoss: "KES 1.2B",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["Opaque tendering for SHIF technology.", "System downtime affecting claims.", "Improved county grant utilization."]
  },
  {
    id: "audit-education-2026",
    title: "Ministry of Education - CBC Infrastructure",
    entity: "Ministry of Education",
    region: "National",
    entityType: "National",
    fiscalYear: "2025/2026",
    opinion: "Adverse",
    summary: "Discrepancies in capitation disbursement to Junior Secondary Schools. Construction of Grade 9 classrooms delayed in 15 counties.",
    financialLoss: "KES 850M",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["Delayed capitation release.", "Substandard classroom construction.", "Ghost students in enrollment data."],
    completionPct: 45,
    forensicData: [
      { id: "AQ-EDU-001", category: "unsupported", description: "Ksh 4.2B in school infrastructure funds lack valid procurement documentation from various counties.", amount: "4.2B", status: "flagged", page: 12 },
      { id: "AQ-EDU-002", category: "misappropriation", description: "Ghost students detected in capitation records for 247 primary schools.", amount: "250M", status: "flagged", page: 89 }
    ]
  },
  {
    id: "audit-transport-2026",
    title: "Ministry of Roads and Transport",
    entity: "Ministry of Transport",
    region: "National",
    entityType: "National",
    fiscalYear: "2025/2026",
    opinion: "Qualified",
    summary: "Stalled road projects due to lack of funds. SGR operational costs remain opaque.",
    financialLoss: "KES 2.1B",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["Pending bills to contractors.", "SGR maintenance cost overruns.", "Unmaintained rural access roads."]
  },
  {
    id: "audit-energy-2026",
    title: "Ministry of Energy and Petroleum",
    entity: "Ministry of Energy",
    region: "National",
    entityType: "National",
    fiscalYear: "2025/2026",
    opinion: "Adverse",
    summary: "High transmission losses and questionable procurement of independent power producers (IPPs).",
    financialLoss: "KES 3.5B",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["High system losses.", "Expensive IPP contracts.", "Rural electrification delays."]
  },
  {
    id: "audit-interior-2026",
    title: "Ministry of Interior",
    entity: "Ministry of Interior",
    region: "National",
    entityType: "National",
    fiscalYear: "2025/2026",
    opinion: "Disclaimer",
    summary: "Unable to verify expenditure on confidential security votes and police modernization program.",
    financialLoss: "Undisclosed",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["Unsupported confidential expenditure.", "Police housing project stalls.", "Vehicle leasing irregularities."]
  },
  {
    id: "audit-agriculture-2026",
    title: "Ministry of Agriculture - Fertilizer Subsidy",
    entity: "Ministry of Agriculture",
    region: "National",
    entityType: "National",
    fiscalYear: "2025/2026",
    opinion: "Qualified",
    summary: "Fake fertilizer scandal aftermath. Discrepancies in beneficiary lists for subsidized inputs.",
    financialLoss: "KES 600M",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["Unverified fertilizer beneficiaries.", "Post-harvest losses management.", "NCPB storage inefficiencies."]
  },
  {
    id: "audit-water-2026",
    title: "Ministry of Water & Sanitation",
    entity: "Ministry of Water",
    region: "National",
    entityType: "National",
    fiscalYear: "2025/2026",
    opinion: "Adverse",
    summary: "Multiple stalled dam projects across the country. Procurement flaws in drilling equipment.",
    financialLoss: "KES 4.2B",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["Stalled dam construction.", "Procurement irregularities.", "Lack of value for money in drilled boreholes."],
    completionPct: 15,
    forensicData: [
      { id: "AQ-WAT-001", category: "misappropriation", description: "Advance payment of 30% for 'Earth Dam' project in Turkana with 0% site progress.", amount: "1.2B", status: "flagged", page: 15 },
      { id: "AQ-WAT-002", category: "irregularity", description: "Tendering for drilling rigs awarded to non-registered shell company.", amount: "300M", status: "flagged", page: 44 }
    ]
  },
  {
    id: "audit-ict-2026",
    title: "Ministry of ICT & Digital Economy",
    entity: "Ministry of ICT",
    region: "National",
    entityType: "National",
    fiscalYear: "2025/2026",
    opinion: "Unmodified (Clean)",
    summary: "Fairly accurate financial reporting. Constituency digital hubs rolled out successfully.",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["Successful digital hub rollout.", "Proper asset management.", "Adherence to procurement laws."]
  },
  {
    id: "audit-tourism-2026",
    title: "Ministry of Tourism",
    entity: "Ministry of Tourism",
    region: "National",
    entityType: "National",
    fiscalYear: "2025/2026",
    opinion: "Qualified",
    summary: "Under-collection of park entry fees and poor maintenance of lodges.",
    financialLoss: "KES 150M",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["Revenue leakages at park gates.", "Marketing fund accountability issues.", "Maintenance backlog."]
  },
  {
    id: "audit-lands-2026",
    title: "Ministry of Lands",
    entity: "Ministry of Lands",
    region: "National",
    entityType: "National",
    fiscalYear: "2025/2026",
    opinion: "Disclaimer",
    summary: "Missing green cards and chaotic digitization process records.",
    financialLoss: "Incalculable",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["Missing land records.", "Double allocation of title deeds.", "System failures in Ardhisasa."]
  },

  // Counties
  {
    id: "audit-nairobi-2026",
    title: "Nairobi City County Executive",
    entity: "Nairobi City County",
    region: "Nairobi",
    entityType: "County",
    fiscalYear: "2025/2026",
    opinion: "Adverse",
    summary: "Failed to account for KES 5B in claimed collections. Pending bills remain high.",
    financialLoss: "KES 5B",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["Unreconciled revenue.", "Illegal legal fees.", "Land encroachment."],
    completionPct: 88,
    forensicData: [
      { id: "AQ-NRB-001", category: "misappropriation", description: "Unauthorized withdrawal from revenue collection account during election week.", amount: "1.2B", status: "flagged", page: 5 },
      { id: "AQ-NRB-002", category: "irregularity", description: "Leasing of private vehicles for city inspection at 300% market rate.", amount: "450M", status: "investigating", page: 112 }
    ]
  },
  {
    id: "audit-mombasa-2026",
    title: "Mombasa County Executive",
    entity: "Mombasa County",
    region: "Coast",
    entityType: "County",
    fiscalYear: "2025/2026",
    opinion: "Qualified",
    summary: "Own source revenue dipped. Waste management contracts were not competitively awarded.",
    financialLoss: "KES 300M",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["Waste management tender flaws.", "Revenue dip.", "Casual worker payroll inflation."]
  },
  {
    id: "audit-kisumu-2026",
    title: "Kisumu County Executive",
    entity: "Kisumu County",
    region: "Nyanza",
    entityType: "County",
    fiscalYear: "2025/2026",
    opinion: "Qualified",
    summary: "Lakefront development projects stalled. Payroll audit revealed discrepancies.",
    financialLoss: "KES 120M",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["Stalled development projects.", "Payroll discrepancies.", "Asset register incomplete."]
  },
  {
    id: "audit-nakuru-2026",
    title: "Nakuru County Executive",
    entity: "Nakuru County",
    region: "Rift Valley",
    entityType: "County",
    fiscalYear: "2025/2026",
    opinion: "Unmodified (Clean)",
    summary: "Improved revenue collection and proper documentation of city status upgrade projects.",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["Enhanced revenue systems.", "Proper project documentation.", "Clean payroll."]
  },
  {
    id: "audit-uasingishu-2026",
    title: "Uasin Gishu County Executive",
    entity: "Uasin Gishu County",
    region: "Rift Valley",
    entityType: "County",
    fiscalYear: "2025/2026",
    opinion: "Adverse",
    summary: "Unresolved issues regarding the overseas education airlift program.",
    financialLoss: "KES 900M",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["Education airlift scandal reimbursals.", "Missing scholarship funds.", "Unprocedural bank accounts."]
  },
  {
    id: "audit-kiambu-2026",
    title: "Kiambu County Executive",
    entity: "Kiambu County",
    region: "Central",
    entityType: "County",
    fiscalYear: "2025/2026",
    opinion: "Qualified",
    summary: "High wage bill consuming development funds. Alcohol control fund misappropriation.",
    financialLoss: "KES 200M",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["Wage bill exceeds 35% limit.", "Alcohol fund misuse.", "Stalled market construction."]
  },
  {
    id: "audit-garissa-2026",
    title: "Garissa County Executive",
    entity: "Garissa County",
    region: "North Eastern",
    entityType: "County",
    fiscalYear: "2025/2026",
    opinion: "Adverse",
    summary: "Ghost workers consuming 20% of wage bill. Manual revenue collection.",
    financialLoss: "KES 800M",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["Ghost workers.", "Manual revenue leakage.", "Procurement flaws."]
  },
  {
    id: "audit-turkana-2026",
    title: "Turkana County Executive",
    entity: "Turkana County",
    region: "Rift Valley",
    entityType: "County",
    fiscalYear: "2025/2026",
    opinion: "Qualified",
    summary: "Discrepancies in relief food distribution logistics.",
    financialLoss: "KES 150M",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["Relief food logistics cost.", "Pending bills.", "Procurement of water trucks."]
  },
   {
    id: "audit-makueni-2026",
    title: "Makueni County Executive",
    entity: "Makueni County",
    region: "Eastern",
    entityType: "County",
    fiscalYear: "2025/2026",
    opinion: "Unmodified (Clean)",
    summary: "Exemplary public participation and budgeting.",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["High development absorption.", "Transparent procurement.", "Effective public participation."]
  },
  {
    id: "audit-nyeri-2026",
    title: "Nyeri County Executive",
    entity: "Nyeri County",
    region: "Central",
    entityType: "County",
    fiscalYear: "2025/2026",
    opinion: "Unmodified (Clean)",
    summary: "Consistent adherence to financial regulations.",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["Timely financial reporting.", "Asset tracking.", "Debt management."]
  },
    {
    id: "audit-kakamega-2026",
    title: "Kakamega County Executive",
    entity: "Kakamega County",
    region: "Western",
    entityType: "County",
    fiscalYear: "2025/2026",
    opinion: "Qualified",
    summary: "Stalled upgrade of Bukhungu Stadium. Questionable spending on ECD centers.",
    financialLoss: "KES 400M",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["Stalled stadium project.", "ECD capitation issues.", "Pending bills."]
  },
  {
    id: "audit-machakos-2026",
    title: "Machakos County Executive",
    entity: "Machakos County",
    region: "Eastern",
    entityType: "County",
    fiscalYear: "2025/2026",
    opinion: "Qualified",
    summary: "Delay in completion of county offices. Revenue targets missed.",
    financialLoss: "KES 100M",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["Project delays.", "Revenue shortfall.", "Staffing irregularities."]
  },
  {
    id: "audit-kilifi-2026",
    title: "Kilifi County Executive",
    entity: "Kilifi County",
    region: "Coast",
    entityType: "County",
    fiscalYear: "2025/2026",
    opinion: "Adverse",
    summary: "Massive irregular land allocation and procurement anomalies.",
    financialLoss: "KES 450M",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["Irregular land allocation.", "Procurement anomalies.", "Drought mitigation fund misuse."]
  },
  {
    id: "audit-meru-2026",
    title: "Meru County Executive",
    entity: "Meru County",
    region: "Eastern",
    entityType: "County",
    fiscalYear: "2025/2026",
    opinion: "Disclaimer",
    summary: "Political instability affected financial record keeping.",
    financialLoss: "KES 250M",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["Chaotic records.", "Unauthorized spending.", "Impeachment related costs."]
  },
  {
    id: "audit-kitui-2026",
    title: "Kitui County Executive",
    entity: "Kitui County",
    region: "Eastern",
    entityType: "County",
    fiscalYear: "2025/2026",
    opinion: "Qualified",
    summary: "KICOTEC textile factory profitability questions.",
    financialLoss: "KES 50M",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["Factory audit queries.", "Pending bills.", "Water project sustainability."]
  },

  // State Corporations & Agencies
  {
    id: "audit-kplc-2026",
    title: "Kenya Power & Lighting Company (KPLC)",
    entity: "Kenya Power",
    region: "National",
    entityType: "Parastatal",
    fiscalYear: "2025/2026",
    opinion: "Qualified",
    summary: "Forex losses and opaque token purchase tariffs.",
    financialLoss: "KES 3.2B",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["High system losses.", "Token tariff opacity.", "Aging infrastructure."]
  },
  {
    id: "audit-kengen-2026",
    title: "Kenya Electricity Generating Company (KenGen)",
    entity: "KenGen",
    region: "National",
    entityType: "Parastatal",
    fiscalYear: "2025/2026",
    opinion: "Unmodified (Clean)",
    summary: "Robust financial health. Geothermal expansion on track.",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["Geothermal revenue growth.", "Clean books.", "Proper debt management."]
  },
  {
    id: "audit-kpa-2026",
    title: "Kenya Ports Authority (KPA)",
    entity: "KPA",
    region: "National",
    entityType: "Parastatal",
    fiscalYear: "2025/2026",
    opinion: "Qualified",
    summary: "Disputes over port concessioning and procurement of tugboats.",
    financialLoss: "KES 1.8B",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["Concessioning opacity.", "Tugboat procurement.", "Cargo tracking system."]
  },
  {
    id: "audit-kaa-2026",
    title: "Kenya Airports Authority (KAA)",
    entity: "KAA",
    region: "National",
    entityType: "Parastatal",
    fiscalYear: "2025/2026",
    opinion: "Adverse",
    summary: "JKIA roof leakage repairs tendered irregularly. Greenfield terminal compensation disputes.",
    financialLoss: "KES 500M",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["Irregular repair tenders.", "Greenfield compensation.", "Concessionaire disputes."]
  },
  {
    id: "audit-kra-2026",
    title: "Kenya Revenue Authority (KRA)",
    entity: "KRA",
    region: "National",
    entityType: "Parastatal",
    fiscalYear: "2025/2026",
    opinion: "Qualified",
    summary: "Missed revenue targets. Systems audit of iTax and Sokoke integration.",
    financialLoss: "Revenue Shortfall",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["Revenue shortfall.", "System integration issues.", "Tax waiver irregularities."]
  },
  {
    id: "audit-nssf-2026",
    title: "National Social Security Fund (NSSF)",
    entity: "NSSF",
    region: "National",
    entityType: "Parastatal",
    fiscalYear: "2025/2026",
    opinion: "Qualified",
    summary: "Delays in Hazina Trade Centre completion and tenanting.",
    financialLoss: "KES 1B",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["Construction delays.", "Administration costs high.", "Investment returns."]
  },
  {
    id: "audit-nhif-2026",
    title: "National Health Insurance Fund (NHIF) / SHA",
    entity: "Parastatal",
    region: "National",
    entityType: "Parastatal",
    fiscalYear: "2025/2026",
    opinion: "Adverse",
    summary: "Fraudulent claims from non-existent hospitals. Transition to SHA chaotic.",
    financialLoss: "KES 4B",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["Fraudulent claims.", "Transition chaos.", "Unverified beneficiaries."],
    completionPct: 42,
    forensicData: [
      { id: "AQ-NHIF-001", category: "misappropriation", description: "Payment to 'ghost' clinic for 12,000 surgeries that never occurred.", amount: "800M", status: "flagged", page: 18 },
      { id: "AQ-NHIF-002", category: "unsupported", description: "Administrative travel budget for SHA board exceeds NHIF legacy cap by 450%.", amount: "120M", status: "flagged", page: 44 }
    ]
  },
  {
    id: "audit-homa-bay-2026",
    title: "Homa Bay County Executive",
    entity: "Homa Bay County",
    region: "Nyanza",
    entityType: "County",
    fiscalYear: "2025/2026",
    opinion: "Qualified",
    summary: "Revenue collection automation issues.",
    financialLoss: "KES 60M",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["Automation glitches.", "Fisheries department."]
  },
  {
    id: "audit-kisii-2026",
    title: "Kisii County Executive",
    entity: "Kisii County",
    region: "Nyanza",
    entityType: "County",
    fiscalYear: "2025/2026",
    opinion: "Adverse",
    summary: "Staff payroll ballooning.",
    financialLoss: "KES 200M",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["Payroll bloat.", "Market stalls."]
  },
  {
    id: "audit-nyamira-2026",
    title: "Nyamira County Executive",
    entity: "Nyamira County",
    region: "Nyanza",
    entityType: "County",
    fiscalYear: "2025/2026",
    opinion: "Qualified",
    summary: "Unfinished assembly chambers.",
    financialLoss: "KES 40M",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["Construction delays.", "Fuel levy."]
  },
  {
    id: "audit-narok-2026",
    title: "Narok County Executive",
    entity: "Narok County",
    region: "Rift Valley",
    entityType: "County",
    fiscalYear: "2025/2026",
    opinion: "Qualified",
    summary: "Maasai Mara revenue sharing formulation.",
    financialLoss: "KES 0",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["Revenue sharing.", "Park roads."]
  },
  {
    id: "audit-kajiado-2026",
    title: "Kajiado County Executive",
    entity: "Kajiado County",
    region: "Rift Valley",
    entityType: "County",
    fiscalYear: "2025/2026",
    opinion: "Qualified",
    summary: "Land valuation roll issues.",
    financialLoss: "KES 120M",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["Valuation roll.", "Water permits."]
  },
  {
    id: "audit-bomet-2026",
    title: "Bomet County Executive",
    entity: "Bomet County",
    region: "Rift Valley",
    entityType: "County",
    fiscalYear: "2025/2026",
    opinion: "Unmodified (Clean)",
    summary: "Proper books.",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["Clean books.", "Roads maintenance."]
  },
  {
    id: "audit-kericho-2026",
    title: "Kericho County Executive",
    entity: "Kericho County",
    region: "Rift Valley",
    entityType: "County",
    fiscalYear: "2025/2026",
    opinion: "Qualified",
    summary: "Londiani junction accident fund utilization.",
    financialLoss: "KES 10M",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["Fund utilization.", "Hospital equipment."]
  },
  {
    id: "audit-embu-2026",
    title: "Embu County Executive",
    entity: "Embu County",
    region: "Eastern",
    entityType: "County",
    fiscalYear: "2025/2026",
    opinion: "Qualified",
    summary: "Muguka levy collection efficiency.",
    financialLoss: "KES 15M",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["Levy collection.", "Market sheds."]
  },
  {
    id: "audit-tharaka-nithi-2026",
    title: "Tharaka Nithi County Executive",
    entity: "Tharaka Nithi County",
    region: "Eastern",
    entityType: "County",
    fiscalYear: "2025/2026",
    opinion: "Unmodified (Clean)",
    summary: "Strong internal controls.",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["Internal controls.", "Health supplies."]
  },
  {
    id: "audit-marsabit-2026",
    title: "Marsabit County Executive",
    entity: "Marsabit County",
    region: "Eastern",
    entityType: "County",
    fiscalYear: "2025/2026",
    opinion: "Adverse",
    summary: "Relief food distribution unaccounted.",
    financialLoss: "KES 90M",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["Relief food.", "Water tracking."]
  },
  {
    id: "audit-isiolo-2026",
    title: "Isiolo County Executive",
    entity: "Isiolo County",
    region: "Eastern",
    entityType: "County",
    fiscalYear: "2025/2026",
    opinion: "Disclaimer",
    summary: "Assets register missing.",
    financialLoss: "KES 0",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["Assets register.", "Pending bills."]
  },
  {
    id: "audit-mandera-2026",
    title: "Mandera County Executive",
    entity: "Mandera County",
    region: "North Eastern",
    entityType: "County",
    fiscalYear: "2025/2026",
    opinion: "Qualified",
    summary: "Security budget utilization.",
    financialLoss: "KES 30M",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["Security budget.", "Road contracts."]
  },
  {
    id: "audit-wajir-2026",
    title: "Wajir County Executive",
    entity: "Wajir County",
    region: "North Eastern",
    entityType: "County",
    fiscalYear: "2025/2026",
    opinion: "Adverse",
    summary: "Drought fund misappropriation.",
    financialLoss: "KES 70M",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["Drought fund.", "Health centers."]
  },
  {
    id: "audit-lamu-2026",
    title: "Lamu County Executive",
    entity: "Lamu County",
    region: "Coast",
    entityType: "County",
    fiscalYear: "2025/2026",
    opinion: "Qualified",
    summary: "Festival funds audit.",
    financialLoss: "KES 5M",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["Festival funds.", "Jetty repairs."]
  },
  {
    id: "audit-tana-river-2026",
    title: "Tana River County Executive",
    entity: "Tana River County",
    region: "Coast",
    entityType: "County",
    fiscalYear: "2025/2026",
    opinion: "Adverse",
    summary: "Irrigation scheme support lost.",
    financialLoss: "KES 40M",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["Irrigation support.", "Staffing."]
  },
  {
    id: "audit-taita-taveta-2026",
    title: "Taita Taveta County Executive",
    entity: "Taita Taveta County",
    region: "Coast",
    entityType: "County",
    fiscalYear: "2025/2026",
    opinion: "Qualified",
    summary: "Mine cess collection issues.",
    financialLoss: "KES 20M",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["Mine cess.", "Wildlife conflict fund."]
  },
  {
    id: "audit-kwale-2026",
    title: "Kwale County Executive",
    entity: "Kwale County",
    region: "Coast",
    entityType: "County",
    fiscalYear: "2025/2026",
    opinion: "Unmodified (Clean)",
    summary: "Mining royalties usage transparent.",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: ["Royalties usage.", "Bursaries."]
  }
];

export const MOCK_AUDIT_COMMENTS = [
  {
    id: "c1",
    user: "Wanjiku Voice",
    text: "Debt servicing taking 65%? This is slavery. Where is the development budget?",
    timestamp: "2h ago",
    reportId: "audit-national-2026"
  },
  {
    id: "c2",
    user: "Northern Watch",
    text: "Ghost workers in Garissa again? We need prosecutions, not just reports.",
    timestamp: "5h ago",
    reportId: "audit-garissa-2026"
  },
  {
    id: "c3",
    user: "City Resident",
    text: "Nairobi collected nothing? We pay everyday! Sakaja must answer.",
    timestamp: "1d ago",
    reportId: "audit-nairobi-2026"
  },
  {
    id: "c4",
    user: "Uasin Gishu Parent",
    text: "Where is our children's education money? Bringing our kids back from Finland in shame?",
    timestamp: "3h ago",
    reportId: "audit-uasingishu-2026"
  },
  {
    id: "c5",
    user: "Health Advocate",
    text: "SHIF is a disaster. Non-existent hospitals cleaning out the fund while public hospitals lack gloves.",
    timestamp: "30m ago",
    reportId: "audit-nhif-2026"
  },
  {
    id: "c6",
    user: "Energy Monitor",
    text: "IPPs are bleeding us dry. Why are we paying for power we don't use?",
    timestamp: "6h ago",
    reportId: "audit-energy-2026"
  },
  {
    id: "c7",
    user: "Makueni Proud",
    text: "Clean audit again! Other governors should come for bench marking.",
    timestamp: "2d ago",
    reportId: "audit-makueni-2026"
  }
];
