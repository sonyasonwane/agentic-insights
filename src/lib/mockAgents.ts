import { MarketData, ClinicalData, PatentData, ResearchData, SynthesisResult } from '@/types/agent';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const therapeuticAreas = [
  'Oncology', 'Immunology', 'Neurology', 'Cardiology', 'Metabolic Disorders',
  'Infectious Diseases', 'Rare Diseases', 'Respiratory', 'Dermatology'
];

const companies = [
  'Pfizer', 'Novartis', 'Roche', 'Johnson & Johnson', 'Merck',
  'AbbVie', 'Bristol-Myers Squibb', 'Eli Lilly', 'AstraZeneca', 'Sanofi'
];

const journals = [
  'Nature Medicine', 'The Lancet', 'NEJM', 'JAMA', 'Cell',
  'Science Translational Medicine', 'JCI', 'Cancer Research'
];

export async function simulateMarketAgent(molecule: string): Promise<MarketData> {
  await delay(1500 + Math.random() * 1000);
  
  const growthTrends = ['Moderate', 'Moderate–High', 'Stable–Moderate'];
  const marketScopes = ['Broader therapeutic segment', 'Adjacent indication areas', 'Related disease categories'];
  const numCompetitors = Math.floor(Math.random() * 4) + 2;
  const shuffledCompanies = [...companies].sort(() => Math.random() - 0.5);
  
  return {
    cagr: growthTrends[Math.floor(Math.random() * growthTrends.length)],
    marketSize: marketScopes[Math.floor(Math.random() * marketScopes.length)],
    leadingCompetitors: shuffledCompanies.slice(0, numCompetitors),
    summary: `${molecule} shows strong market potential in the ${therapeuticAreas[Math.floor(Math.random() * therapeuticAreas.length)]} segment with sustained demand growth projected through 2030.`,
    growthDrivers: [
      'Increasing prevalence of target conditions',
      'Favorable regulatory environment',
      'Growing healthcare expenditure in emerging markets',
      'Patent expiration of competing molecules'
    ].slice(0, Math.floor(Math.random() * 2) + 2)
  };
}

export async function simulateClinicalAgent(molecule: string): Promise<ClinicalData> {
  await delay(1800 + Math.random() * 1000);
  
  const totalTrials = Math.floor(Math.random() * 15) + 5;
  const shuffledCompanies = [...companies].sort(() => Math.random() - 0.5);
  const area = therapeuticAreas[Math.floor(Math.random() * therapeuticAreas.length)];
  
  return {
    totalTrials,
    phases: [
      { phase: 'Phase I', count: Math.floor(Math.random() * 5) + 1 },
      { phase: 'Phase II', count: Math.floor(Math.random() * 6) + 2 },
      { phase: 'Phase III', count: Math.floor(Math.random() * 4) + 1 },
      { phase: 'Phase IV', count: Math.floor(Math.random() * 3) }
    ],
    sponsors: shuffledCompanies.slice(0, 3),
    insights: `Trials exploring anti-inflammatory and supportive roles across therapeutic areas. Includes exploratory and repurposing-oriented studies for ${molecule} in ${area.toLowerCase()} applications.`,
    indications: [
      `${area} - Primary indication`,
      `${therapeuticAreas[Math.floor(Math.random() * therapeuticAreas.length)]} - Secondary`,
      'Supportive care applications'
    ]
  };
}

export async function simulatePatentAgent(molecule: string): Promise<PatentData> {
  await delay(1600 + Math.random() * 1000);
  
  const currentYear = new Date().getFullYear();
  const totalPatents = Math.floor(Math.random() * 20) + 10;
  const shuffledCompanies = [...companies].sort(() => Math.random() - 0.5);
  
  return {
    totalPatents,
    expiryYears: [
      currentYear + Math.floor(Math.random() * 3) + 1,
      currentYear + Math.floor(Math.random() * 5) + 3,
      currentYear + Math.floor(Math.random() * 8) + 5
    ],
    holders: shuffledCompanies.slice(0, 4),
    notes: `Upcoming patent cliff in ${currentYear + 2}-${currentYear + 4} creates significant repurposing opportunity. Multiple formulation patents expiring, enabling generic competition and new indication development.`,
    ftoStatus: Math.random() > 0.3 ? 'Potentially Favorable – Initial signals suggest development pathway' : 'Complex – May require licensing discussions'
  };
}

export async function simulateResearchAgent(molecule: string): Promise<ResearchData> {
  await delay(2000 + Math.random() * 1000);
  
  const currentYear = new Date().getFullYear();
  const publicationsCount = Math.floor(Math.random() * 200) + 50;
  const area = therapeuticAreas[Math.floor(Math.random() * therapeuticAreas.length)];
  
  return {
    publicationsCount,
    publications: [
      {
        title: `Novel mechanisms of ${molecule} in ${area.toLowerCase()} treatment`,
        year: currentYear - Math.floor(Math.random() * 2),
        journal: journals[Math.floor(Math.random() * journals.length)]
      },
      {
        title: `Repurposing ${molecule}: A systematic review`,
        year: currentYear - 1,
        journal: journals[Math.floor(Math.random() * journals.length)]
      },
      {
        title: `${molecule} combination therapy: Phase II results`,
        year: currentYear,
        journal: journals[Math.floor(Math.random() * journals.length)]
      },
      {
        title: `Biomarker-guided ${molecule} therapy in precision medicine`,
        year: currentYear,
        journal: journals[Math.floor(Math.random() * journals.length)]
      }
    ],
    sentiment: Math.random() > 0.2 ? 'Positive' : 'Mixed',
    keyFindings: [
      'Demonstrated efficacy in novel therapeutic targets',
      'Favorable safety profile in long-term studies',
      'Synergistic effects with existing treatments',
      'Emerging evidence for precision medicine applications'
    ].slice(0, Math.floor(Math.random() * 2) + 2)
  };
}

export async function synthesizeOpportunity(
  molecule: string,
  market: MarketData,
  clinical: ClinicalData,
  patent: PatentData,
  research: ResearchData
): Promise<SynthesisResult> {
  await delay(2500 + Math.random() * 1000);
  
  const confidenceScore = 0.65 + Math.random() * 0.3;
  
  return {
    recommendation: `Based on comprehensive multi-agent analysis, ${molecule} demonstrates ${confidenceScore > 0.8 ? 'high' : confidenceScore > 0.7 ? 'strong' : 'moderate'} potential for drug repurposing. The convergence of ${patent.notes.includes('expiring') ? 'favorable patent landscape' : 'manageable IP considerations'}, ${parseInt(market.cagr) > 7 ? 'robust market growth' : 'stable market conditions'}, and ${clinical.totalTrials > 10 ? 'extensive clinical activity' : 'growing clinical interest'} suggests a compelling opportunity for new indication development in ${clinical.indications[0]?.split(' - ')[0] || 'novel therapeutic areas'}.`,
    confidenceScore,
    keyOpportunities: [
      `Market CAGR of ${market.cagr} indicates sustained growth potential`,
      `${clinical.totalTrials} active clinical trials demonstrate ongoing research interest`,
      `Patent expirations in ${patent.expiryYears[0]}-${patent.expiryYears[1]} create development window`,
      `${research.publicationsCount}+ publications with ${research.sentiment.toLowerCase()} sentiment`
    ],
    risks: [
      'Competitive landscape requires differentiation strategy',
      'Regulatory pathway complexity for new indications',
      'Manufacturing scalability considerations',
      'Market access and pricing pressures'
    ].slice(0, Math.floor(Math.random() * 2) + 2),
    nextSteps: [
      'Conduct detailed FTO analysis for target indication',
      'Initiate biomarker identification studies',
      'Engage regulatory affairs for pathway assessment',
      'Develop partnership strategy with key stakeholders',
      'Prepare proof-of-concept study design'
    ]
  };
}
