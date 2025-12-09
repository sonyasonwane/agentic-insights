export interface MarketData {
  cagr: string;
  marketSize: string;
  leadingCompetitors: string[];
  summary: string;
  growthDrivers: string[];
}

export interface ClinicalData {
  totalTrials: number;
  phases: { phase: string; count: number }[];
  sponsors: string[];
  insights: string;
  indications: string[];
}

export interface PatentData {
  totalPatents: number;
  expiryYears: number[];
  holders: string[];
  notes: string;
  ftoStatus: string;
}

export interface ResearchData {
  publicationsCount: number;
  publications: { title: string; year: number; journal: string }[];
  sentiment: string;
  keyFindings: string[];
}

export interface SynthesisResult {
  recommendation: string;
  confidenceScore: number;
  keyOpportunities: string[];
  risks: string[];
  nextSteps: string[];
}

export interface AnalysisResult {
  id: string;
  moleculeName: string;
  timestamp: Date;
  market: MarketData;
  clinical: ClinicalData;
  patent: PatentData;
  research: ResearchData;
  synthesis: SynthesisResult;
}

export type AgentStatus = 'idle' | 'running' | 'complete' | 'error';

export interface AgentState {
  market: AgentStatus;
  clinical: AgentStatus;
  patent: AgentStatus;
  research: AgentStatus;
  synthesis: AgentStatus;
}
