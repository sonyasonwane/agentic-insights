import { Atom, Sparkles, Users, Zap } from 'lucide-react';

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
              Decision-Support Platform
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Parallel Execution Badge */}
          <div className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 border border-primary/20">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium text-primary">
              4 Agents Running in Parallel
            </span>
            <div className="flex -space-x-1">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
              ))}
            </div>
          </div>
          
          {/* Human-in-the-loop Badge */}
          <div className="flex items-center gap-2 rounded-full bg-agent-clinical/10 px-3 py-1.5 border border-agent-clinical/20">
            <Users className="h-4 w-4 text-agent-clinical" />
            <span className="text-xs font-medium text-agent-clinical">
              Human-in-the-Loop
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
