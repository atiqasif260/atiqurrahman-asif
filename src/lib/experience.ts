export interface ProfessionalExperience {
  period: string;
  startDate: string;
  endDate: string | null;
  title: string;
  company: string;
  group?: string;
  tasks: string[];
  suggestedResponsibilities?: boolean;
}

export const experiences: ProfessionalExperience[] = [
  {
    period: "09/2026 — Present",
    startDate: "2026-09-10",
    endDate: null,
    title: "Junior Executive – Quality Management System (QMS)",
    company: "A ONE POLAR LIMITED",
    group: "A Concern of Micro Fibre Group",
    tasks: [
      "Quality Documentation: Support controlled procedures, work instructions, inspection forms, and quality records",
      "Process & Product Quality: Assist with recording production checks against approved specifications and customer requirements",
      "Nonconformity & Corrective Action: Document quality deviations, escalate issues, and support corrective-action follow-up",
      "Audit Support: Organize quality records and assist with internal audit preparation and findings follow-up",
      "Quality Reporting: Compile inspection results, defect data, and recurring issue trends for review",
      "Continuous Improvement: Support quality awareness and coordinate with production teams on process improvements",
    ],
    suggestedResponsibilities: true,
  },
  {
    period: "04/2023 — 08/2026",
    startDate: "2023-04",
    endDate: "2026-08",
    title: "Executive, IT Department",
    company: "Ztrios Technologies LTD",
    tasks: [
      "System Administration: Install, configure, and maintain networks and software systems",
      "Strategic Planning: Align IT initiatives with business goals and develop strategies",
      "Security & Data Integrity: Implement and manage security policies & data backups",
      "Technical Support: Resolve user hardware/software issues and provide technical assistance",
      "Vendor Management: Negotiate contracts and collaborate with external vendors",
      "Budgeting & Reporting: Determine IT equipment needs and manage the budget",
      "Project Management: Lead IT projects, such as system upgrades or migrations",
    ],
  },
  {
    period: "02/2022 — 03/2023",
    startDate: "2022-02",
    endDate: "2023-03",
    title: "Jr. Executive, IT Department",
    company: "Circle Network",
    tasks: [
      "System Administration: Install, configure, and maintain networks and software systems",
      "Technical Support: Networking (LAN/WAN), server management, and security protocols",
      "Security & Data Integrity: Implement and manage security policies & data backups",
      "Technical Support: Resolve user hardware/software issues and provide technical assistance",
      "Budgeting & Reporting: Determine IT equipment needs and manage the budget",
    ],
  },
];

export const currentExperience = experiences.find((experience) => experience.endDate === null);