import { AnalysisResult } from '@/types/agent';
import { History, FileText, Clock, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface HistorySidebarProps {
  history: AnalysisResult[];
  currentId: string | null;
  onSelect: (result: AnalysisResult) => void;
  onDelete: (id: string) => void;
}

export function HistorySidebar({ history, currentId, onSelect, onDelete }: HistorySidebarProps) {
  if (history.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-6">
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
          <History className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="font-display font-semibold mb-1">No History Yet</h3>
        <p className="text-sm text-muted-foreground">
          Your analysis results will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center gap-2">
          <History className="h-4 w-4 text-primary" />
          <h2 className="font-display font-semibold">Analysis History</h2>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {history.length} report{history.length !== 1 ? 's' : ''}
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          {history.map((result) => (
            <div
              key={result.id}
              className={cn(
                'group relative rounded-lg border p-3 cursor-pointer transition-all duration-200',
                currentId === result.id
                  ? 'bg-primary/10 border-primary/30'
                  : 'border-border/50 hover:bg-muted/50 hover:border-border'
              )}
              onClick={() => onSelect(result)}
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  'p-2 rounded-lg',
                  currentId === result.id ? 'bg-primary/20' : 'bg-muted'
                )}>
                  <FileText className={cn(
                    'h-4 w-4',
                    currentId === result.id ? 'text-primary' : 'text-muted-foreground'
                  )} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{result.moleculeName}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <Clock className="h-3 w-3" />
                    {new Date(result.timestamp).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={cn(
                      'text-xs font-medium',
                      result.synthesis.confidenceScore >= 0.8 ? 'text-agent-clinical' :
                      result.synthesis.confidenceScore >= 0.7 ? 'text-primary' : 'text-agent-research'
                    )}>
                      {Math.round(result.synthesis.confidenceScore * 100)}% confidence
                    </span>
                  </div>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(result.id);
                }}
              >
                <Trash2 className="h-3 w-3 text-muted-foreground hover:text-destructive" />
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
