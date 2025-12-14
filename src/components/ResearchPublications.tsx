import { ResearchData } from '@/types/agent';
import { BookOpen, ThumbsUp, Lightbulb } from 'lucide-react';

interface ResearchPublicationsProps {
  data: ResearchData;
}

export function ResearchPublications({ data }: ResearchPublicationsProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-secondary/50 p-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <BookOpen className="h-3 w-3" />
            Est. Publications
          </div>
          <p className="font-display text-xl font-bold text-agent-research">~{data.publicationsCount}+</p>
          <p className="text-[10px] text-muted-foreground">Approximate</p>
        </div>
        <div className="rounded-lg bg-secondary/50 p-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <ThumbsUp className="h-3 w-3" />
            Literature Sentiment
          </div>
          <p className={`font-display text-lg font-bold ${data.sentiment === 'Positive' ? 'text-agent-clinical' : 'text-agent-research'}`}>
            {data.sentiment}
          </p>
          <p className="text-[10px] text-muted-foreground">AI-assessed</p>
        </div>
      </div>

      <div>
        <p className="text-xs font-medium mb-1">Recent Key Publications:</p>
        <p className="text-[10px] text-muted-foreground mb-2 italic">Illustrative examples based on thematic literature patterns</p>
        <div className="space-y-2">
          {data.publications.map((pub, i) => (
            <div key={i} className="p-2 rounded-lg bg-agent-research/5 border border-agent-research/20">
              <p className="text-sm font-medium">{pub.title}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {pub.journal} • {pub.year}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <Lightbulb className="h-3 w-3" />
          Key Findings
        </div>
        <ul className="space-y-1">
          {data.keyFindings.map((finding, i) => (
            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-agent-research">•</span>
              {finding}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
