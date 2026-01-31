export interface AuditReport {
  id: string;
  title: string;
  entity: string; // Ministry or County
  fiscalYear: string;
  opinion: "Unmodified (Clean)" | "Qualified" | "Adverse" | "Disclaimer";
  summary: string;
  financialLoss?: string; // e.g. "KES 2.3B"
  downloadUrl: string; // Internal/Direct download
  officialUrl?: string; // Link to OAG website
  keyFindings: string[];
}

export const AUDIT_REPORTS: AuditReport[] = [
  {
    id: "audit-national-2024",
    title: "National Government Budget Implementation Review",
    entity: "National Government of Kenya",
    fiscalYear: "2023/2024",
    opinion: "Qualified",
    summary: "The government spent KES 3.88 Trillion against a revenue of KES 2.29 Trillion, resulting in a deficit of KES 1.59 Trillion funded by heavy borrowing. Service delivery was severely impacted by the late release of KES 49.5 Billion from the National Treasury.",
    financialLoss: "KES 1.59 Trillion (Deficit)",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke/audit-reports/national-government",
    keyFindings: [
        "Deficit of KES 1.59 Trillion funded by borrowing.",
        "Late release of KES 49.5 Billion affecting service delivery.",
        "Anomalies in the G-to-G oil importation framework."
    ]
  },
  {
    id: "audit-garissa-2023",
    title: "County Government of Garissa Revenue Statements",
    entity: "Garissa County",
    fiscalYear: "2022/2023",
    opinion: "Adverse",
    summary: "Significant under-collection of own-generated revenue and widespread unexplained variances in financial statements. Prior year audit matters remain largely unresolved.",
    financialLoss: "Undisclosed Variance",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke/audit-reports/county-government",
    keyFindings: [
        "Massive under-collection of local revenue.",
        "Unresolved prior year audit queries.",
        "Incomplete asset registers."
    ]
  },
  {
    id: "audit-moh-2023",
    title: "Ministry of Health - National & County Support",
    entity: "Ministry of Health",
    fiscalYear: "2022/2023",
    opinion: "Adverse",
    summary: "Procurement irregularities continue to plague the ministry. Special audit highlights KES 3.7B in questioned expenditures related to donor-funded projects.",
    financialLoss: "KES 3.7 Billion",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: [
        "Irregular procurement of medical equipment.",
        "Unsupported expenditure in donor projects.",
        "Stalled construction of improper facilities."
    ]
  },
  {
    id: "audit-nairobi-2023",
    title: "Nairobi City County Executive",
    entity: "Nairobi City County",
    fiscalYear: "2022/2023",
    opinion: "Disclaimer",
    summary: "The Auditor General could not express an opinion due to the chaotic state of financial records, particularly regarding the KES 100B+ pending bills portfolio inherited from NMS.",
    financialLoss: "KES 107 Billion (Pending Bills)",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: [
        "Lack of documentation for pending bills.",
        "Systemic failure in revenue collection systems.",
        "Missing title deeds for county properties."
    ]
  },
  {
    id: "audit-machakos-2023",
    title: "County Executive of Machakos",
    entity: "Machakos County",
    fiscalYear: "2022/2023",
    opinion: "Unmodified (Clean)",
    summary: "One of the few counties to receive a clean bill of health. Financial statements were fairly presented in all material respects.",
    downloadUrl: "#",
    officialUrl: "https://www.oagkenya.go.ke",
    keyFindings: [
        "Adherence to PFM Act regulations.",
        "Proper documentation of assets.",
        "High absorption of development budget."
    ]
  }
];

export const MOCK_AUDIT_COMMENTS = [
    {
        id: "c1",
        user: "Wanjiku Voice",
        text: "borrowing 1.5T to fill a hole? This is unsustainable. We need to cut waste, not borrow more!",
        timestamp: "2h ago",
        reportId: "audit-national-2024"
    },
    {
        id: "c2",
        user: "Garissa Watch",
        text: "Our revenue is being pocketed. How can we have 'under-collection' when businesses are paying daily?",
        timestamp: "5h ago",
        reportId: "audit-garissa-2023"
    },
    {
        id: "c3",
        user: "Nairobi Taxpayer",
        text: "The pending bills issue is used to steal. Verify them publicly!",
        timestamp: "1d ago",
        reportId: "audit-nairobi-2023"
    }
];
