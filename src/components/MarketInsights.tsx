import { MarketData } from '@/types/agent';
import { TrendingUp, Building2, BarChart3 } from 'lucide-react';

interface MarketInsightsProps {
  data: MarketData;
}

export function MarketInsights({ data }: MarketInsightsProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-secondary/50 p-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <TrendingUp className="h-3 w-3" />
            Estimated Growth Trend
          </div>
          <p className="font-display text-lg font-bold text-agent-market">{data.cagr}</p>
          <p className="text-[10px] text-muted-foreground">AI-estimated range</p>
        </div>
        <div className="rounded-lg bg-secondary/50 p-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <BarChart3 className="h-3 w-3" />
            Indicative Market Scope
          </div>
          <p className="font-display text-lg font-bold">{data.marketSize}</p>
          <p className="text-[10px] text-muted-foreground">Broader therapeutic segment</p>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <Building2 className="h-3 w-3" />
          Key Market Players (Illustrative)
        </div>
        <div className="flex flex-wrap gap-2">
          {data.leadingCompetitors.map((company) => (
            <span
              key={company}
              className="px-2 py-1 text-xs rounded-full bg-agent-market/10 text-agent-market font-medium"
            >
              {company}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-border/50">
        <p className="text-sm text-muted-foreground">{data.summary}</p>
      </div>

      <div>
        <p className="text-xs font-medium mb-2">Growth Drivers:</p>
        <ul className="space-y-1">
          {data.growthDrivers.map((driver, i) => (
            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-agent-market">•</span>
              {driver}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
