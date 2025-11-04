import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { useUserStore, useUserBetsStore, useMatchStatusStore } from '@/lib/store';
import { User, Trophy, TrendingUp, Calendar, Award, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function Profil() {
  const { coins, diamonds } = useUserStore();
  const betsStore = useUserBetsStore();
  const matchStatusStore = useMatchStatusStore();

  const totalBets = betsStore.bets.length;
  const wonBets = betsStore.bets.filter(b => b.status === 'won').length;
  const winRate = totalBets > 0 ? ((wonBets / totalBets) * 100).toFixed(0) : '0';

  const stats = [
    { icon: Trophy, label: 'Paris gagnés', value: wonBets.toString(), color: 'text-green-400' },
    { icon: TrendingUp, label: 'Taux de réussite', value: `${winRate}%`, color: 'text-blue-400' },
    { icon: Calendar, label: 'Paris totaux', value: totalBets.toString(), color: 'text-accent' },
    { icon: Award, label: 'Rang', value: '#42', color: 'text-purple-400' },
  ];

  const handleResetAll = () => {
    if (window.confirm('Voulez-vous vraiment réinitialiser toutes vos données ? Cette action est irréversible.')) {
      betsStore.clearAllBets();
      matchStatusStore.clearAllStatuses();
      toast.success('Données réinitialisées !');
      window.location.reload();
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen pt-20 pb-24">
        <div className="max-w-2xl mx-auto px-4">
          {/* Profile Card */}
          <div className="bg-gradient-to-br from-card to-background border border-border rounded-2xl p-6 mb-6 card-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                <User size={40} className="text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-1">Utilisateur</h2>
                <p className="text-white/60 text-sm">Membre depuis Nov 2025</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background/50 rounded-xl p-4 text-center">
                <p className="text-white/60 text-xs mb-1">Jetons</p>
                <p className="text-accent text-2xl font-bold">{coins.toFixed(2)} 💰</p>
              </div>
              <div className="bg-background/50 rounded-xl p-4 text-center">
                <p className="text-white/60 text-xs mb-1">Diamants</p>
                <p className="text-blue-400 text-2xl font-bold">{diamonds} 💎</p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-card border border-border rounded-2xl p-4 card-shadow"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-xl bg-background/50 ${stat.color}`}>
                    <stat.icon size={20} />
                  </div>
                </div>
                <p className="text-white text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-white/60 text-xs">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Achievements */}
          <div className="bg-card border border-border rounded-2xl p-6 mb-6 card-shadow">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <Trophy className="text-accent" size={20} />
              Réalisations
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {[
                { icon: '🏆', label: 'Gagnant', unlocked: wonBets > 0 },
                { icon: '🔥', label: 'En feu', unlocked: wonBets >= 3 },
                { icon: '💎', label: 'Riche', unlocked: diamonds >= 100 },
                { icon: '⭐', label: 'Star', unlocked: totalBets >= 10 },
                { icon: '🎯', label: 'Précis', unlocked: parseInt(winRate) >= 50 },
                { icon: '💪', label: 'Fort', unlocked: coins >= 500 },
                { icon: '🚀', label: 'Fusée', unlocked: false },
                { icon: '👑', label: 'Roi', unlocked: false },
              ].map((achievement, idx) => (
                <div
                  key={idx}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center ${
                    achievement.unlocked
                      ? 'bg-gradient-to-br from-accent/20 to-yellow-500/20 border border-accent/30'
                      : 'bg-background/50 border border-border/30'
                  }`}
                >
                  <span className={`text-3xl mb-1 ${!achievement.unlocked && 'opacity-30'}`}>
                    {achievement.icon}
                  </span>
                  <span className={`text-[10px] ${achievement.unlocked ? 'text-white' : 'text-white/40'}`}>
                    {achievement.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Reset Button */}
          <Button
            onClick={handleResetAll}
            variant="outline"
            className="w-full border-destructive text-destructive hover:bg-destructive hover:text-white"
          >
            <RotateCcw size={16} className="mr-2" />
            Réinitialiser toutes les données
          </Button>
        </div>
      </div>
      <BottomNav />
    </>
  );
}
