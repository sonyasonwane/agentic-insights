import { ClinicalData } from '@/types/agent';
import { FlaskConical, Users, Target } from 'lucide-react';

interface ClinicalTrialsProps {
  data: ClinicalData;
}

export function ClinicalTrials({ data }: ClinicalTrialsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex-1 rounded-lg bg-secondary/50 p-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <FlaskConical className="h-3 w-3" />
            Total Trials
          </div>
          <p className="font-display text-2xl font-bold text-agent-clinical">{data.totalTrials}</p>
        </div>
      </div>

      <div>
        <p className="text-xs font-medium mb-2">Trial Distribution by Phase:</p>
        <div className="grid grid-cols-4 gap-2">
          {data.phases.map((phase) => (
            <div key={phase.phase} className="text-center p-2 rounded-lg bg-agent-clinical/5 border border-agent-clinical/20">
              <p className="text-lg font-bold text-agent-clinical">{phase.count}</p>
              <p className="text-xs text-muted-foreground">{phase.phase}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <Users className="h-3 w-3" />
          Key Sponsors
        </div>
        <div className="flex flex-wrap gap-2">
          {data.sponsors.map((sponsor) => (
            <span
              key={sponsor}
              className="px-2 py-1 text-xs rounded-full bg-agent-clinical/10 text-agent-clinical font-medium"
            >
              {sponsor}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-border/50">
        <p className="text-sm text-muted-foreground">{data.insights}</p>
      </div>

      <div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <Target className="h-3 w-3" />
          Target Indications
        </div>
        <ul className="space-y-1">
          {data.indications.map((indication, i) => (
            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-agent-clinical">•</span>
              {indication}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
