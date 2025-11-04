import { useState } from 'react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { MatchCard } from '@/components/MatchCard';
import { TapToEarnModal } from '@/components/TapToEarnModal';
import { mockMatches } from '@/lib/mock-data';
import { useBetStore, useUserStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Coins, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

type TabType = 'upcoming' | 'played' | 'finished';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('upcoming');
  const { selections, clearSelections } = useBetStore();
  const { coins, deductCoins, addDiamonds } = useUserStore();

  const filteredMatches = mockMatches.filter(match => match.status === activeTab);

  const totalOdds = selections.reduce((acc, sel) => acc * sel.odds, 1);
  const stake = 10;
  const potentialWin = selections.length > 0 ? stake * totalOdds : 0;

  const handlePlaceBet = () => {
    if (selections.length === 0) {
      toast.error('Sélectionnez au moins un match');
      return;
    }

    if (coins < stake) {
      toast.error('Vous n\'avez pas assez de jetons');
      return;
    }

    deductCoins(stake);
    
    // Simulation: 30% de chance de gagner
    const won = Math.random() < 0.3;
    
    if (won) {
      addDiamonds(Math.floor(potentialWin));
      toast.success(`Gagné ! +${Math.floor(potentialWin)} 💎`);
    } else {
      toast.error('Perdu ! Meilleure chance la prochaine fois');
    }

    clearSelections();
  };

  return (
    <>
      <Header />
      <div className="min-h-screen pt-20 pb-32">
        <div className="max-w-2xl mx-auto px-4">
          {/* Tabs */}
          <div className="flex gap-2 mb-6 bg-card rounded-2xl p-1">
            {[
              { key: 'upcoming' as TabType, label: 'À venir' },
              { key: 'played' as TabType, label: 'Joués' },
              { key: 'finished' as TabType, label: 'Résultats' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 py-2 px-4 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === tab.key
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Matches */}
          <div className="space-y-4 mb-6">
            {filteredMatches.length > 0 ? (
              filteredMatches.map(match => (
                <MatchCard key={match.id} match={match} />
              ))
            ) : (
              <div className="text-center py-12 bg-card rounded-2xl">
                <p className="text-white/60">Aucun match disponible</p>
              </div>
            )}
          </div>

          {/* Tap to Earn Button */}
          <Button
            onClick={() => setModalOpen(true)}
            className="w-full bg-accent hover:bg-accent/90 text-black font-bold py-6 rounded-2xl glow-gold shadow-lg text-lg"
          >
            <Coins className="mr-2" />
            Cliquer pour gagner des jetons
          </Button>

          {/* Bet Slip */}
          {selections.length > 0 && (
            <div className="fixed bottom-20 left-0 right-0 px-4 z-40">
              <div className="max-w-2xl mx-auto bg-primary rounded-2xl p-4 shadow-2xl border border-primary/50">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-white/80 text-xs">Cote totale</p>
                    <p className="text-white font-bold text-2xl">{totalOdds.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/80 text-xs">Gain potentiel</p>
                    <p className="text-accent font-bold text-2xl">{potentialWin.toFixed(2)} 💎</p>
                  </div>
                </div>
                <Button
                  onClick={handlePlaceBet}
                  className="w-full bg-accent hover:bg-accent/90 text-black font-bold py-3 rounded-xl"
                >
                  <ShoppingCart className="mr-2" size={20} />
                  Parier {stake} jetons
                </Button>
                <p className="text-white/60 text-xs text-center mt-2">
                  {selections.length} sélection(s)
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <BottomNav />
      <TapToEarnModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}
