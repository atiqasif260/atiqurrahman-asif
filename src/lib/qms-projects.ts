export interface QmsProject {
  title: string;
  organization: string;
  department: string;
  role: string;
  projectType?: string;
  objective: string;
  activitiesLabel: string;
  activities: string[];
  tools?: string;
  outcomeLabel: string;
  outcome: string;
  status?: string;
}

export const qmsProjects: QmsProject[] = [
  {
    title: "QMS Documentation & Performance Monitoring System",
    organization: "Micro Fibre Group",
    department: "Quality Management System (QMS)",
    role: "Junior Executive — QMS",
    objective: "To improve QMS documentation control, audit monitoring, corrective action tracking, and quality performance reporting through a structured Microsoft Excel-based system.",
    activitiesLabel: "Key Activities",
    activities: [
      "Maintaining the QMS document master list and revision records.",
      "Tracking internal audit findings and corrective actions.",
      "Monitoring quality KPIs and monthly performance.",
      "Preparing management reports and supporting audit readiness.",
    ],
    outcomeLabel: "Expected Outcome",
    outcome: "Improved document traceability, more organized quality records, timely follow-up of corrective actions, and better visibility of QMS performance.",
  },
  {
    title: "QMS Documentation Management System",
    organization: "Micro Fibre Group",
    department: "Quality Management System (QMS)",
    role: "Junior Executive — QMS",
    projectType: "Documentation Control and Process Improvement",
    objective: "To develop a structured Microsoft Excel-based documentation management system to improve document traceability, revision monitoring, periodic review scheduling, and controlled-document distribution within a garment manufacturing QMS.",
    activitiesLabel: "Key Responsibilities",
    activities: [
      "Develop and maintain a QMS Document Master Register.",
      "Monitor document revision history and approval status.",
      "Track periodic document reviews and identify overdue items.",
      "Maintain controlled-document distribution and retrieval records.",
      "Prepare a dashboard for document-control monitoring and reporting.",
      "Support document readiness for internal audits and management reviews.",
    ],
    tools: "Microsoft Excel, data validation, automated formulas, conditional formatting, document registers, revision tracking, and dashboard reporting.",
    outcomeLabel: "Expected Benefits",
    outcome: "Improved document traceability, more organized records, timely review follow-up, greater visibility of document status, and stronger support for audit readiness.",
    status: "Documentation management system template developed. Implementation, validation, and performance results are subject to company review and approval.",
  },
];