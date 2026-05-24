export type CaseType = "history" | "examination" | "communication" | "psychiatry" | "counselling" | "procedural";

export type Difficulty = "Year 3" | "Year 4" | "Year 5" | "Intern" | "AMC";

export type Specialty =
  | "General Medicine"
  | "Cardiology"
  | "Respiratory"
  | "Gastroenterology"
  | "Neurology"
  | "Psychiatry"
  | "Paediatrics"
  | "Obstetrics & Gynaecology"
  | "Emergency Medicine"
  | "General Practice"
  | "Surgery"
  | "Dermatology"
  | "Endocrinology"
  | "Haematology"
  | "Infectious Disease";

export interface PatientResponse {
  keywords: string[];
  response: string;
  revealsKey?: string; // marks this answer as revealing a key symptom
}

export interface MarkingItem {
  id: string;
  description: string;
  detail?: string;
  marks: number;
  teachingPoint?: string;
}

export interface MarkingCategory {
  id: string;
  name: string;
  items: MarkingItem[];
}

export interface DebriefSection {
  heading: string;
  content: string;
  type: "info" | "warning" | "tip" | "diagnosis";
}

export interface OSCECase {
  id: string;
  title: string;
  specialty: Specialty;
  type: CaseType;
  difficulty: Difficulty;
  timeMinutes: number;
  tags: string[];
  thumbnail?: string;

  // Briefing
  candidateBrief: string;
  patientName: string;
  patientAge: number;
  patientGender: "male" | "female" | "non-binary";
  patientOccupation: string;
  settingDescription: string;

  // For AI mode — system prompt for Claude
  patientSystemPrompt: string;

  // For scripted mode — keyword-matched Q&A
  scriptedResponses: PatientResponse[];
  defaultResponse: string;

  // Marking
  markingCategories: MarkingCategory[];
  passMark: number; // percentage

  // Debrief
  diagnosis: string;
  differentialDiagnoses: string[];
  debriefSections: DebriefSection[];
  keyLearningPoints: string[];
  australianContext?: string;
  relevantGuidelines?: string[];
}

export interface CaseAttempt {
  caseId: string;
  startedAt: string;
  completedAt?: string;
  markedItems: Record<string, number>; // itemId -> marks awarded
  totalScore?: number;
  maxScore?: number;
  mode: "study" | "exam";
  chatHistory?: ChatMessage[];
}

export interface ChatMessage {
  role: "student" | "patient" | "system";
  content: string;
  timestamp: string;
}

export interface UserProgress {
  attempts: CaseAttempt[];
  totalCasesAttempted: number;
  totalCasesCompleted: number;
  averageScore: number;
  specialtyBreakdown: Record<string, { attempted: number; avgScore: number }>;
}
