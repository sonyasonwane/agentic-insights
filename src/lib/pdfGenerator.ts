import { AnalysisResult } from '@/types/agent';

export function generatePDFReport(result: AnalysisResult): void {
  const content = `
================================================================================
                    AGENTIC AI DRUG REPURPOSING REPORT
                      AI-Assisted Decision Support Platform
================================================================================

⚠️  IMPORTANT DISCLAIMER
--------------------------------------------------------------------------------
This report contains AI-generated indicative insights for early-stage drug 
repurposing analysis. All data, estimates, and recommendations are simulated
and require validation by qualified experts before any clinical, business, 
or regulatory decisions.

For decision-support only. Human-in-the-loop validation required.
--------------------------------------------------------------------------------

Molecule: ${result.moleculeName.toUpperCase()}
Generated: ${new Date(result.timestamp).toLocaleString()}
Report ID: ${result.id}

--------------------------------------------------------------------------------
                              EXECUTIVE SUMMARY
--------------------------------------------------------------------------------

${result.synthesis.recommendation}

Confidence Level (Indicative): ~${(result.synthesis.confidenceScore * 100).toFixed(0)}%
Note: This is an AI-estimated confidence range, not a validated metric.

--------------------------------------------------------------------------------
                         MARKET INSIGHTS (Indicative)
--------------------------------------------------------------------------------

Est. Market Size: ~${result.market.marketSize} (AI-estimated range)
Est. CAGR: ~${result.market.cagr} (Approximate)

Key Market Players (Illustrative):
${result.market.leadingCompetitors.map(c => `  • ${c}`).join('\n')}

Summary: ${result.market.summary}

Growth Drivers:
${result.market.growthDrivers.map(d => `  • ${d}`).join('\n')}

--------------------------------------------------------------------------------
                       CLINICAL TRIALS (Indicative)
--------------------------------------------------------------------------------

Est. Active Trials: ~${result.clinical.totalTrials} (Approximate)

Trial Distribution by Phase:
${result.clinical.phases.map(p => `  • ${p.phase}: ${p.count} trials`).join('\n')}

Key Sponsors:
${result.clinical.sponsors.map(s => `  • ${s}`).join('\n')}

Clinical Insights: ${result.clinical.insights}

Target Indications:
${result.clinical.indications.map(i => `  • ${i}`).join('\n')}

--------------------------------------------------------------------------------
                      PATENT LANDSCAPE (Indicative)
--------------------------------------------------------------------------------

Est. Related Patents: ~${result.patent.totalPatents} (Approximate count)
Potential Expiry Window: ${result.patent.expiryYears.join(', ')} (Subject to verification)

Potential Patent Holders (Illustrative):
${result.patent.holders.map(h => `  • ${h}`).join('\n')}

Preliminary FTO Assessment: ${result.patent.ftoStatus}
Note: Requires formal legal review for actual FTO determination.

Notes: ${result.patent.notes}

--------------------------------------------------------------------------------
                   RESEARCH & PUBLICATIONS (Indicative)
--------------------------------------------------------------------------------

Est. Publications: ~${result.research.publicationsCount}+ (Approximate)
Literature Sentiment: ${result.research.sentiment} (AI-assessed)

Recent Key Publications:
${result.research.publications.map(p => `  • "${p.title}" (${p.year}) - ${p.journal}`).join('\n')}

Key Research Findings:
${result.research.keyFindings.map(f => `  • ${f}`).join('\n')}

--------------------------------------------------------------------------------
                         KEY OPPORTUNITIES
--------------------------------------------------------------------------------

${result.synthesis.keyOpportunities.map((o, i) => `${i + 1}. ${o}`).join('\n')}

--------------------------------------------------------------------------------
                    RISK CONSIDERATIONS (Requires Review)
--------------------------------------------------------------------------------

${result.synthesis.risks.map((r, i) => `${i + 1}. ${r}`).join('\n')}

Note: These risk factors are AI-identified and should be validated by 
domain experts before proceeding with any decisions.

--------------------------------------------------------------------------------
                         RECOMMENDED NEXT STEPS
--------------------------------------------------------------------------------

${result.synthesis.nextSteps.map((s, i) => `${i + 1}. ${s}`).join('\n')}

================================================================================
                              DISCLAIMER
================================================================================

This report is generated by an AI-assisted decision-support platform for 
early-stage drug repurposing analysis. The insights, estimates, and 
recommendations contained herein are:

• AI-simulated and indicative in nature
• Not validated clinical or regulatory data
• Subject to significant uncertainty and require expert verification
• Not intended as medical, legal, or investment advice

Human-in-the-loop: Final decisions remain with R&D experts and qualified 
professionals. All data should be independently verified before use in 
clinical, business, or regulatory contexts.

================================================================================

            Generated by Agentic AI – Hackathon Prototype
            AI-Assisted Drug Repurposing Decision-Support Platform
            
            For demonstration purposes only.

================================================================================
  `.trim();

  // Create and download the file
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${result.moleculeName.replace(/\s+/g, '_')}_Repurposing_Report_${new Date().toISOString().split('T')[0]}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
