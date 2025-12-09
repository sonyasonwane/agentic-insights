import { PatentData } from '@/types/agent';
import { FileText, Calendar, Shield, Building } from 'lucide-react';

interface PatentLandscapeProps {
  data: PatentData;
}

export function PatentLandscape({ data }: PatentLandscapeProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-secondary/50 p-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <FileText className="h-3 w-3" />
            Total Patents
          </div>
          <p className="font-display text-xl font-bold text-agent-patent">{data.totalPatents}</p>
        </div>
        <div className="rounded-lg bg-secondary/50 p-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <Calendar className="h-3 w-3" />
            Key Expiry Years
          </div>
          <p className="font-display text-lg font-bold">{data.expiryYears.join(', ')}</p>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <Building className="h-3 w-3" />
          Patent Holders
        </div>
        <div className="flex flex-wrap gap-2">
          {data.holders.map((holder) => (
            <span
              key={holder}
              className="px-2 py-1 text-xs rounded-full bg-agent-patent/10 text-agent-patent font-medium"
            >
              {holder}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-lg bg-agent-patent/5 border border-agent-patent/20 p-3">
        <div className="flex items-center gap-2 text-xs font-medium text-agent-patent mb-1">
          <Shield className="h-3 w-3" />
          FTO Status
        </div>
        <p className="text-sm">{data.ftoStatus}</p>
      </div>

      <div className="pt-3 border-t border-border/50">
        <p className="text-sm text-muted-foreground">{data.notes}</p>
      </div>
    </div>
  );
}
