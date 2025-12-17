import { jsPDF } from 'jspdf';
import { AnalysisResult } from '@/types/agent';

export function generatePDFReport(result: AnalysisResult): void {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;
  let y = 20;

  const addText = (text: string, fontSize: number = 10, isBold: boolean = false) => {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    const lines = doc.splitTextToSize(text, contentWidth);
    
    lines.forEach((line: string) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, margin, y);
      y += fontSize * 0.4 + 2;
    });
  };

  const addSection = (title: string) => {
    y += 5;
    if (y > 260) {
      doc.addPage();
      y = 20;
    }
    doc.setDrawColor(59, 130, 246);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;
    addText(title, 12, true);
    y += 3;
  };

  const addBullet = (text: string) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(`• ${text}`, contentWidth - 5);
    lines.forEach((line: string) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, margin + 3, y);
      y += 6;
    });
  };

  // Header
  doc.setFillColor(59, 130, 246);
  doc.rect(0, 0, pageWidth, 35, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('AGENTIC AI DRUG REPURPOSING REPORT', pageWidth / 2, 15, { align: 'center' });
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('AI-Assisted Decision Support Platform', pageWidth / 2, 25, { align: 'center' });
  
  doc.setTextColor(0, 0, 0);
  y = 45;

  // Disclaimer Box
  doc.setFillColor(254, 243, 199);
  doc.setDrawColor(251, 191, 36);
  doc.roundedRect(margin, y, contentWidth, 35, 2, 2, 'FD');
  y += 8;
  doc.setTextColor(146, 64, 14);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('IMPORTANT DISCLAIMER', margin + 5, y);
  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  const disclaimerText = 'This report contains AI-generated indicative insights for early-stage drug repurposing analysis. All data, estimates, and recommendations are simulated and require validation by qualified experts before any clinical, business, or regulatory decisions.';
  const disclaimerLines = doc.splitTextToSize(disclaimerText, contentWidth - 10);
  disclaimerLines.forEach((line: string) => {
    doc.text(line, margin + 5, y);
    y += 4;
  });
  y += 3;
  doc.setFont('helvetica', 'bold');
  doc.text('For decision-support only. Human-in-the-loop validation required.', margin + 5, y);
  
  doc.setTextColor(0, 0, 0);
  y += 15;

  // Molecule Info
  doc.setFillColor(239, 246, 255);
  doc.roundedRect(margin, y, contentWidth, 20, 2, 2, 'F');
  y += 8;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(`Molecule: ${result.moleculeName.toUpperCase()}`, margin + 5, y);
  y += 6;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Generated: ${new Date(result.timestamp).toLocaleString()}  |  Report ID: ${result.id}`, margin + 5, y);
  y += 15;

  // Executive Summary
  addSection('EXECUTIVE SUMMARY');
  addText(result.synthesis.recommendation);
  y += 3;
  doc.setFillColor(220, 252, 231);
  doc.roundedRect(margin, y, 80, 12, 2, 2, 'F');
  y += 8;
  doc.setTextColor(22, 101, 52);
  doc.setFont('helvetica', 'bold');
  doc.text(`Confidence Level (Indicative): ~${(result.synthesis.confidenceScore * 100).toFixed(0)}%`, margin + 5, y);
  doc.setTextColor(0, 0, 0);
  y += 3;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('Note: This is an AI-estimated confidence range, not a validated metric.', margin, y + 5);
  y += 15;

  // Market Insights
  addSection('MARKET INSIGHTS (Indicative)');
  addText(`Indicative Market Scope: ${result.market.marketSize} (AI-estimated, broader segment)`);
  addText(`Estimated Growth Trend: ${result.market.cagr}`);
  y += 3;
  addText('Key Market Players (Illustrative):', 10, true);
  result.market.leadingCompetitors.forEach(c => addBullet(c));
  y += 2;
  addText(`Summary: ${result.market.summary}`);
  y += 2;
  addText('Growth Drivers:', 10, true);
  result.market.growthDrivers.forEach(d => addBullet(d));

  // Clinical Trials
  addSection('CLINICAL TRIALS (Indicative)');
  addText(`Est. Related Trials: ~${result.clinical.totalTrials} (Includes exploratory & repurposing-oriented studies)`);
  y += 2;
  addText('Trial Distribution by Phase:', 10, true);
  result.clinical.phases.forEach(p => addBullet(`${p.phase}: ${p.count} trials`));
  y += 2;
  addText('Key Sponsors:', 10, true);
  result.clinical.sponsors.forEach(s => addBullet(s));
  y += 2;
  addText(`Clinical Insights: ${result.clinical.insights}`);
  y += 2;
  addText('Target Indications:', 10, true);
  result.clinical.indications.forEach(i => addBullet(i));

  // Patent Landscape
  addSection('PATENT LANDSCAPE (Indicative)');
  addText(`Est. Related Patents: ~${result.patent.totalPatents} (Approximate count)`);
  addText(`Potential Expiry Window: ${result.patent.expiryYears.join(', ')} (Subject to verification)`);
  y += 2;
  addText('Potential Patent Holders (Illustrative):', 10, true);
  result.patent.holders.forEach(h => addBullet(h));
  y += 2;
  addText(`Preliminary FTO Signal: ${result.patent.ftoStatus}`);
  doc.setFontSize(8);
  doc.setTextColor(107, 114, 128);
  addText('Note: Requires formal legal review for actual FTO determination.');
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  y += 2;
  addText(`Notes: ${result.patent.notes}`);

  // Research Publications
  addSection('RESEARCH & PUBLICATIONS (Indicative)');
  addText(`Est. Publications: ~${result.research.publicationsCount}+ (Approximate)`);
  addText(`Literature Sentiment: ${result.research.sentiment} (AI-assessed)`);
  y += 2;
  doc.setFontSize(8);
  doc.setTextColor(107, 114, 128);
  addText('Illustrative examples based on thematic literature patterns:');
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  result.research.publications.forEach(p => addBullet(`"${p.title}" (${p.year}) - ${p.journal}`));
  y += 2;
  addText('Key Research Findings:', 10, true);
  result.research.keyFindings.forEach(f => addBullet(f));

  // Key Opportunities
  addSection('KEY OPPORTUNITIES');
  result.synthesis.keyOpportunities.forEach((o, i) => addBullet(`${o}`));

  // Risk Considerations
  addSection('RISK CONSIDERATIONS (Requires Review)');
  result.synthesis.risks.forEach((r, i) => addBullet(`${r}`));
  y += 2;
  doc.setFontSize(8);
  doc.setTextColor(107, 114, 128);
  addText('Note: These risk factors are AI-identified and should be validated by domain experts.');
  doc.setTextColor(0, 0, 0);

  // Next Steps
  addSection('RECOMMENDED NEXT STEPS');
  result.synthesis.nextSteps.forEach((s, i) => addBullet(`${s}`));

  // Footer on last page
  doc.addPage();
  y = 20;
  
  // Final Disclaimer
  doc.setFillColor(254, 226, 226);
  doc.setDrawColor(239, 68, 68);
  doc.roundedRect(margin, y, contentWidth, 55, 2, 2, 'FD');
  y += 10;
  doc.setTextColor(153, 27, 27);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('DISCLAIMER', margin + 5, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  
  const finalDisclaimer = [
    'This report is generated by an AI-assisted decision-support platform for early-stage drug repurposing analysis. The insights, estimates, and recommendations contained herein are:',
    '',
    '• AI-simulated and indicative in nature',
    '• Not validated clinical or regulatory data',
    '• Subject to significant uncertainty and require expert verification',
    '• Not intended as medical, legal, or investment advice',
    '',
    'Human-in-the-loop: Final decisions remain with R&D experts and qualified professionals.'
  ];
  
  finalDisclaimer.forEach(line => {
    doc.text(line, margin + 5, y);
    y += 5;
  });

  // Footer branding
  y = 250;
  doc.setDrawColor(59, 130, 246);
  doc.setLineWidth(1);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;
  doc.setTextColor(59, 130, 246);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Generated by Agentic AI – Hackathon Prototype', pageWidth / 2, y, { align: 'center' });
  y += 6;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('AI-Assisted Drug Repurposing Decision-Support Platform', pageWidth / 2, y, { align: 'center' });
  y += 5;
  doc.setFontSize(8);
  doc.setTextColor(107, 114, 128);
  doc.text('For demonstration purposes only.', pageWidth / 2, y, { align: 'center' });

  // Save
  doc.save(`${result.moleculeName.replace(/\s+/g, '_')}_Repurposing_Report_${new Date().toISOString().split('T')[0]}.pdf`);
}
