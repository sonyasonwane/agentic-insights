import { SynthesisResult as SynthesisResultType } from '@/types/agent';
import { Star, TrendingUp, AlertTriangle, ArrowRight, ShieldAlert, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SynthesisResultProps {
  data: SynthesisResultType;
}

export function SynthesisResult({ data }: SynthesisResultProps) {
  const confidencePercent = Math.round(data.confidenceScore * 100);
  const confidenceLevel = confidencePercent >= 80 ? 'High' : confidencePercent >= 70 ? 'Strong' : 'Moderate';
  const confidenceColor = confidencePercent >= 80 ? 'text-agent-clinical' : confidencePercent >= 70 ? 'text-primary' : 'text-agent-research';

  return (
    <div className="space-y-6">
      {/* Disclaimer Banner */}
      <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
        <Info className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-amber-700 dark:text-amber-400">
          <strong>For decision-support only.</strong> AI-generated insights require expert validation before any clinical or business decisions.
        </p>
      </div>

      {/* Confidence Level (Indicative) */}
      <div className="flex items-center justify-center gap-6 p-4 rounded-xl bg-gradient-to-r from-primary/5 via-agent-clinical/5 to-agent-patent/5">
        <div className="relative">
          <svg className="w-24 h-24 transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-muted/30"
            />
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={251.2}
              strokeDashoffset={251.2 * (1 - data.confidenceScore)}
              className={cn('transition-all duration-1000', confidenceColor)}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={cn('font-display text-2xl font-bold', confidenceColor)}>
              {confidencePercent}%
            </span>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">Confidence Level</p>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
              Indicative
            </span>
          </div>
          <p className={cn('font-display text-xl font-bold', confidenceColor)}>
            {confidenceLevel} Potential
          </p>
          <p className="text-xs text-muted-foreground mt-1">AI-estimated range</p>
        </div>
      </div>

      {/* Recommendation */}
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
        <div className="flex items-center gap-2 text-primary mb-2">
          <Star className="h-4 w-4" />
          <span className="font-medium text-sm">AI Recommendation</span>
        </div>
        <p className="text-sm leading-relaxed">{data.recommendation}</p>
      </div>

      {/* Key Opportunities */}
      <div>
        <div className="flex items-center gap-2 text-sm font-medium mb-3">
          <TrendingUp className="h-4 w-4 text-agent-clinical" />
          Key Opportunities
        </div>
        <ul className="space-y-2">
          {data.keyOpportunities.map((opp, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className="text-agent-clinical mt-1">✓</span>
              <span className="text-muted-foreground">{opp}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Risk Considerations */}
      <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/20">
        <div className="flex items-center gap-2 text-sm font-medium mb-3">
          <ShieldAlert className="h-4 w-4 text-destructive" />
          Risk Considerations
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-destructive/10 text-destructive">
            Requires Review
          </span>
        </div>
        <ul className="space-y-2">
          {data.risks.map((risk, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className="text-destructive mt-1">⚠</span>
              <span className="text-muted-foreground">{risk}</span>
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-destructive/20">
          These risk factors are AI-identified and should be validated by domain experts before proceeding.
        </p>
      </div>

      {/* Next Steps */}
      <div className="pt-4 border-t border-border/50">
        <div className="flex items-center gap-2 text-sm font-medium mb-3">
          <ArrowRight className="h-4 w-4 text-primary" />
          Recommended Next Steps
        </div>
        <ol className="space-y-2">
          {data.nextSteps.map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center">
                {i + 1}
              </span>
              <span className="text-muted-foreground">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
