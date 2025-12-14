import { ReactNode } from 'react';
import { ChevronDown, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { AgentStatus } from '@/types/agent';

interface AgentCardProps {
  icon: ReactNode;
  title: string;
  status: AgentStatus;
  variant: 'market' | 'clinical' | 'patent' | 'research' | 'synthesis';
  children: ReactNode;
  defaultOpen?: boolean;
}

const variantStyles = {
  market: 'agent-card-market',
  clinical: 'agent-card-clinical',
  patent: 'agent-card-patent',
  research: 'agent-card-research',
  synthesis: 'agent-card-synthesis',
};

const iconBgStyles = {
  market: 'bg-agent-market/10 text-agent-market',
  clinical: 'bg-agent-clinical/10 text-agent-clinical',
  patent: 'bg-agent-patent/10 text-agent-patent',
  research: 'bg-agent-research/10 text-agent-research',
  synthesis: 'bg-agent-synthesis/10 text-agent-synthesis',
};

export function AgentCard({ icon, title, status, variant, children, defaultOpen = false }: AgentCardProps) {
  const isComplete = status === 'complete';
  const isRunning = status === 'running';
  const isError = status === 'error';

  return (
    <Collapsible defaultOpen={defaultOpen}>
      <div 
        className={cn(
          'glass-card rounded-xl overflow-hidden transition-all duration-300',
          variantStyles[variant],
          isRunning && 'animate-pulse-glow'
        )}
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between p-4 hover:bg-muted/50 transition-colors">
          <div className="flex items-center gap-3">
            <div className={cn('p-2 rounded-lg', iconBgStyles[variant])}>
              {icon}
            </div>
            <div className="text-left">
              <h3 className="font-display font-semibold">{title}</h3>
              <div className="flex items-center gap-2">
                <p className="text-xs text-muted-foreground">
                  {isRunning ? 'Analyzing...' : isComplete ? 'AI-Simulated Insights' : isError ? 'Analysis failed' : 'Waiting...'}
                </p>
                {isComplete && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                    Indicative
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {isRunning && (
              <Loader2 className="h-5 w-5 text-primary animate-spin" />
            )}
            {isComplete && (
              <CheckCircle2 className="h-5 w-5 text-agent-clinical" />
            )}
            {isError && (
              <AlertCircle className="h-5 w-5 text-destructive" />
            )}
            <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-200 [[data-state=open]>&]:rotate-180" />
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-4 pb-4 pt-2 border-t border-border/50">
            {isRunning ? (
              <div className="space-y-3">
                <div className="h-4 w-3/4 animate-shimmer rounded" />
                <div className="h-4 w-1/2 animate-shimmer rounded" />
                <div className="h-4 w-2/3 animate-shimmer rounded" />
              </div>
            ) : isComplete ? (
              <div className="animate-fade-in">
                {children}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Waiting for analysis to begin...
              </p>
            )}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
