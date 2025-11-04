import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { useUserBetsStore } from '@/lib/store';
import { Gift, TrendingUp, Calendar } from 'lucide-react';

export default function Airdrop() {
  const { bets } = useUserBetsStore();

  const totalBets = bets.length;
  const wonBets = bets.filter(b => b.status === 'won').length;
  const winRate = totalBets > 0 ? ((wonBets / totalBets) * 100).toFixed(0) : '0';

  return (
    <>
      <Header />
      <div className="min-h-screen pt-20 pb-24">
        <div className="max-w-2xl mx-auto px-4">
          {/* Title */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-accent/20 to-yellow-500/20">
              <Gift className="w-8 h-8 text-accent" />
            </div>
            <div>
              <h1 className="text-white text-2xl font-bold">Mes Airdrop</h1>
              <p className="text-white/60 text-sm">Historique de vos paris</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-card border border-border rounded-2xl p-4 text-center card-shadow">
              <Calendar className="w-6 h-6 text-accent mx-auto mb-2" />
              <p className="text-white text-2xl font-bold">{totalBets}</p>
              <p className="text-white/60 text-xs">Paris totaux</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4 text-center card-shadow">
              <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <p className="text-white text-2xl font-bold">{wonBets}</p>
              <p className="text-white/60 text-xs">Gagnés</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4 text-center card-shadow">
              <TrendingUp className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <p className="text-white text-2xl font-bold">{winRate}%</p>
              <p className="text-white/60 text-xs">Taux</p>
            </div>
          </div>

          {/* Bets List */}
          <div className="space-y-3">
            {bets.length > 0 ? (
              bets.map((bet) => (
                <div
                  key={bet.id}
                  className="bg-card border border-border rounded-2xl p-4 card-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-white/60 text-xs mb-1">{bet.placedAt}</p>
                      <p className="text-white font-semibold">
                        Cote totale: {bet.totalOdds.toFixed(2)}
                      </p>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        bet.status === 'won'
                          ? 'bg-green-500/20 text-green-400'
                          : bet.status === 'lost'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {bet.status === 'won' ? 'Gagné' : bet.status === 'lost' ? 'Perdu' : 'En attente'}
                    </div>
                  </div>

                  <div className="space-y-2 mb-3">
                    {bet.selections.map((sel, idx) => (
                      <div key={idx} className="text-sm">
                        <p className="text-white/80">
                          {sel.match.homeTeam} vs {sel.match.awayTeam}
                        </p>
                        <p className="text-white/60 text-xs">
                          {sel.betType === 'home' ? '1' : sel.betType === 'draw' ? 'N' : '2'} - Cote: {sel.odds.toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div>
                      <p className="text-white/60 text-xs">Mise</p>
                      <p className="text-white font-semibold">{bet.stake} 💰</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/60 text-xs">Gain potentiel</p>
                      <p className="text-accent font-semibold">{bet.potentialWin.toFixed(0)} 💎</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-card rounded-2xl">
                <Gift className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/60 mb-2">Aucun pari placé</p>
                <p className="text-white/40 text-sm">Commencez à parier sur les matchs !</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <BottomNav />
    </>
  );
}
