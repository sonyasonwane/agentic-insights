import { Atom, Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Atom className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          <div>
            <h1 className="font-display text-lg font-bold tracking-tight">
              Agentic AI
            </h1>
            <p className="text-xs text-muted-foreground">
              Drug Repurposing Assistant
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5">
          <Sparkles className="h-4 w-4 text-primary animate-pulse" />
          <span className="text-xs font-medium text-primary">
            Agent Parallel Mode
          </span>
        </div>
      </div>
    </header>
  );
}
