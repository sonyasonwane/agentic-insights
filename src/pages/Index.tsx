import { useState, useCallback } from 'react';
import { BarChart2, FlaskConical, Brain, Globe, Sparkles, Download, PanelLeftOpen, PanelLeftClose } from 'lucide-react';
import { Header } from '@/components/Header';
import { MoleculeInput } from '@/components/MoleculeInput';
import { AgentCard } from '@/components/AgentCard';
import { MarketInsights } from '@/components/MarketInsights';
import { ClinicalTrials } from '@/components/ClinicalTrials';
import { PatentLandscape } from '@/components/PatentLandscape';
import { ResearchPublications } from '@/components/ResearchPublications';
import { SynthesisResult } from '@/components/SynthesisResult';
import { HistorySidebar } from '@/components/HistorySidebar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { AnalysisResult, AgentState } from '@/types/agent';
import {
  simulateMarketAgent,
  simulateClinicalAgent,
  simulatePatentAgent,
  simulateResearchAgent,
  synthesizeOpportunity,
} from '@/lib/mockAgents';
import { generatePDFReport } from '@/lib/pdfGenerator';

export default function Index() {
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [agentStatus, setAgentStatus] = useState<AgentState>({
    market: 'idle',
    clinical: 'idle',
    patent: 'idle',
    research: 'idle',
    synthesis: 'idle',
  });

  const runAnalysis = useCallback(async (molecule: string) => {
    setIsLoading(true);
    setCurrentResult(null);
    setAgentStatus({
      market: 'running',
      clinical: 'running',
      patent: 'running',
      research: 'running',
      synthesis: 'idle',
    });

    try {
      // Run all agents in parallel
      const [market, clinical, patent, research] = await Promise.all([
        simulateMarketAgent(molecule).then((data) => {
          setAgentStatus((prev) => ({ ...prev, market: 'complete' }));
          return data;
        }),
        simulateClinicalAgent(molecule).then((data) => {
          setAgentStatus((prev) => ({ ...prev, clinical: 'complete' }));
          return data;
        }),
        simulatePatentAgent(molecule).then((data) => {
          setAgentStatus((prev) => ({ ...prev, patent: 'complete' }));
          return data;
        }),
        simulateResearchAgent(molecule).then((data) => {
          setAgentStatus((prev) => ({ ...prev, research: 'complete' }));
          return data;
        }),
      ]);

      // Synthesize results
      setAgentStatus((prev) => ({ ...prev, synthesis: 'running' }));
      const synthesis = await synthesizeOpportunity(molecule, market, clinical, patent, research);
      setAgentStatus((prev) => ({ ...prev, synthesis: 'complete' }));

      const result: AnalysisResult = {
        id: crypto.randomUUID(),
        moleculeName: molecule,
        timestamp: new Date(),
        market,
        clinical,
        patent,
        research,
        synthesis,
      };

      setCurrentResult(result);
      setHistory((prev) => [result, ...prev]);

      toast({
        title: 'Analysis Complete',
        description: `AI-simulated insights generated for ${molecule}. Confidence level: ~${Math.round(synthesis.confidenceScore * 100)}% (indicative).`,
      });
    } catch (error) {
      toast({
        title: 'Analysis Failed',
        description: 'An error occurred during the analysis. Please try again.',
        variant: 'destructive',
      });
      setAgentStatus({
        market: 'error',
        clinical: 'error',
        patent: 'error',
        research: 'error',
        synthesis: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const handleSelectHistory = (result: AnalysisResult) => {
    setCurrentResult(result);
    setAgentStatus({
      market: 'complete',
      clinical: 'complete',
      patent: 'complete',
      research: 'complete',
      synthesis: 'complete',
    });
  };

  const handleDeleteHistory = (id: string) => {
    setHistory((prev) => prev.filter((r) => r.id !== id));
    if (currentResult?.id === id) {
      setCurrentResult(null);
      setAgentStatus({
        market: 'idle',
        clinical: 'idle',
        patent: 'idle',
        research: 'idle',
        synthesis: 'idle',
      });
    }
    toast({
      title: 'Report Deleted',
      description: 'The analysis report has been removed from history.',
    });
  };

  const handleDownloadPDF = () => {
    if (currentResult) {
      generatePDFReport(currentResult);
      toast({
        title: 'Report Downloaded',
        description: 'Your PDF report has been generated and downloaded.',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'w-80' : 'w-0'
          } border-r border-border/50 bg-card/50 transition-all duration-300 overflow-hidden`}
        >
          <HistorySidebar
            history={history}
            currentId={currentResult?.id ?? null}
            onSelect={handleSelectHistory}
            onDelete={handleDeleteHistory}
          />
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="container py-8 max-w-4xl">
            {/* Sidebar Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="mb-4"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? (
                <PanelLeftClose className="h-5 w-5" />
              ) : (
                <PanelLeftOpen className="h-5 w-5" />
              )}
            </Button>

            {/* Input Section */}
            <section className="mb-8">
              <MoleculeInput onAnalyze={runAnalysis} isLoading={isLoading} />
            </section>

            {/* Results Section */}
            {(isLoading || currentResult) && (
              <section className="space-y-4 animate-fade-in">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-display text-2xl font-bold">
                      Analysis Results
                      {currentResult && (
                        <span className="ml-2 text-primary">
                          — {currentResult.moleculeName}
                        </span>
                      )}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      AI-simulated insights • For decision-support only
                    </p>
                  </div>
                  {currentResult && (
                    <Button onClick={handleDownloadPDF} className="gap-2">
                      <Download className="h-4 w-4" />
                      Download PDF Report
                    </Button>
                  )}
                </div>

                <div className="grid gap-4">
                  <AgentCard
                    icon={<BarChart2 className="h-5 w-5" />}
                    title="Market Insights"
                    status={agentStatus.market}
                    variant="market"
                    defaultOpen
                  >
                    {currentResult && <MarketInsights data={currentResult.market} />}
                  </AgentCard>

                  <AgentCard
                    icon={<FlaskConical className="h-5 w-5" />}
                    title="Clinical Trials"
                    status={agentStatus.clinical}
                    variant="clinical"
                    defaultOpen
                  >
                    {currentResult && <ClinicalTrials data={currentResult.clinical} />}
                  </AgentCard>

                  <AgentCard
                    icon={<Brain className="h-5 w-5" />}
                    title="Patent Landscape"
                    status={agentStatus.patent}
                    variant="patent"
                    defaultOpen
                  >
                    {currentResult && <PatentLandscape data={currentResult.patent} />}
                  </AgentCard>

                  <AgentCard
                    icon={<Globe className="h-5 w-5" />}
                    title="Research & Publications"
                    status={agentStatus.research}
                    variant="research"
                    defaultOpen
                  >
                    {currentResult && <ResearchPublications data={currentResult.research} />}
                  </AgentCard>

                  <AgentCard
                    icon={<Sparkles className="h-5 w-5" />}
                    title="AI Synthesis & Recommendation"
                    status={agentStatus.synthesis}
                    variant="synthesis"
                    defaultOpen
                  >
                    {currentResult && <SynthesisResult data={currentResult.synthesis} />}
                  </AgentCard>
                </div>
              </section>
            )}

            {/* Empty State */}
            {!isLoading && !currentResult && (
              <div className="text-center py-16 animate-fade-in">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
                  <div className="relative w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-10 w-10 text-primary animate-float" />
                  </div>
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">
                  Ready to Discover Opportunities
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Enter a molecule name above to run a comprehensive multi-agent analysis
                  and uncover drug repurposing opportunities.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Footer Disclaimer */}
      <footer className="border-t border-border/50 bg-muted/30 py-3">
        <div className="container flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <span>For decision-support only. Requires expert validation.</span>
          <span className="text-border">|</span>
          <span>Human-in-the-loop: Final decisions remain with R&D experts.</span>
          <span className="text-border">|</span>
          <span className="font-medium">Hackathon Prototype</span>
        </div>
      </footer>
    </div>
  );
}
