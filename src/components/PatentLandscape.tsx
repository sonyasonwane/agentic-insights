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
            Est. Related Patents
          </div>
          <p className="font-display text-xl font-bold text-agent-patent">~{data.totalPatents}</p>
          <p className="text-[10px] text-muted-foreground">Approximate count</p>
        </div>
        <div className="rounded-lg bg-secondary/50 p-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <Calendar className="h-3 w-3" />
            Potential Expiry Window
          </div>
          <p className="font-display text-lg font-bold">{data.expiryYears.join(', ')}</p>
          <p className="text-[10px] text-muted-foreground">Subject to verification</p>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <Building className="h-3 w-3" />
          Potential Patent Holders (Illustrative)
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
          Preliminary FTO Assessment
        </div>
        <p className="text-sm">{data.ftoStatus}</p>
        <p className="text-[10px] text-muted-foreground mt-1">Requires formal legal review</p>
      </div>

      <div className="pt-3 border-t border-border/50">
        <p className="text-sm text-muted-foreground">{data.notes}</p>
      </div>
    </div>
  );
}
