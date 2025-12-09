import { useState } from 'react';
import { Search, Loader2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface MoleculeInputProps {
  onAnalyze: (molecule: string) => void;
  isLoading: boolean;
}

export function MoleculeInput({ onAnalyze, isLoading }: MoleculeInputProps) {
  const [molecule, setMolecule] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (molecule.trim() && !isLoading) {
      onAnalyze(molecule.trim());
    }
  };

  const suggestions = ['Aspirin', 'Metformin', 'Ibuprofen', 'Sildenafil', 'Thalidomide'];

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full" />
      <div className="relative glass-card rounded-2xl p-8">
        <div className="text-center mb-6">
          <h2 className="font-display text-2xl font-bold mb-2">
            Discover Repurposing Opportunities
          </h2>
          <p className="text-muted-foreground">
            Enter a molecule name to analyze market, clinical, patent, and research data
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Enter molecule name (e.g., Metformin, Aspirin...)"
              value={molecule}
              onChange={(e) => setMolecule(e.target.value)}
              className="h-14 pl-12 pr-4 text-lg rounded-xl border-border/50 bg-background/50 focus:ring-2 focus:ring-primary/20"
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            disabled={!molecule.trim() || isLoading}
            className="w-full h-12 text-base font-semibold rounded-xl bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Running Multi-Agent Analysis...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-5 w-5" />
                Run Analysis
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-border/50">
          <p className="text-xs text-muted-foreground mb-3 text-center">Quick suggestions:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setMolecule(s)}
                disabled={isLoading}
                className="px-3 py-1.5 text-sm rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors disabled:opacity-50"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
