import { useUserStore } from '@/lib/store';
import { Coins, Diamond } from 'lucide-react';

export function Header() {
  const { coins, diamonds } = useUserStore();

  return (
    <div className="fixed top-0 left-0 right-0 glassmorphism border-b border-border px-4 py-3 z-50">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-card px-3 py-1.5 rounded-lg shadow-md">
              <Coins size={16} className="text-accent" />
              <span className="text-white font-semibold text-sm">{coins.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-card px-3 py-1.5 rounded-lg shadow-md">
              <Diamond size={16} className="text-blue-400 fill-blue-400" />
              <span className="text-white font-semibold text-sm">{diamonds}</span>
            </div>
          </div>
        </div>

        <div className="text-accent font-bold text-lg glow-gold">
          EazyBet
        </div>
      </div>
    </div>
  );
}
