import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Trophy } from 'lucide-react';
import { useUserStore } from '@/lib/store';

const mockPlayers = [
  { rank: 1, name: 'Player1', diamonds: 15420, avatar: '👑' },
  { rank: 2, name: 'CryptoKing', diamonds: 12350, avatar: '🔥' },
  { rank: 3, name: 'BetMaster', diamonds: 9870, avatar: '⚡' },
  { rank: 4, name: 'LuckyStrike', diamonds: 7650, avatar: '🎯' },
  { rank: 5, name: 'DiamondHands', diamonds: 6540, avatar: '💎' },
  { rank: 6, name: 'WinnerPro', diamonds: 5430, avatar: '🏆' },
  { rank: 7, name: 'GoldenBet', diamonds: 4320, avatar: '⭐' },
  { rank: 8, name: 'AcePlayer', diamonds: 3210, avatar: '🎲' },
  { rank: 9, name: 'TopGun', diamonds: 2100, avatar: '✨' },
  { rank: 10, name: 'StarBet', diamonds: 1500, avatar: '🌟' },
];

export default function Classement() {
  const { diamonds } = useUserStore();
  const currentUserRank = 42;

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-400';
    if (rank === 2) return 'text-gray-300';
    if (rank === 3) return 'text-orange-400';
    return 'text-white/60';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <>
      <Header />
      <div className="min-h-screen pt-20 pb-24">
        <div className="max-w-2xl mx-auto px-4">
          {/* Title */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20">
              <Trophy className="w-8 h-8 text-yellow-400" />
            </div>
            <div>
              <h1 className="text-white text-2xl font-bold">Classement</h1>
              <p className="text-white/60 text-sm">Top des meilleurs joueurs</p>
            </div>
          </div>

          {/* Current User Card */}
          <div className="bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 rounded-2xl p-4 mb-6 card-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-2xl">
                  E
                </div>
                <div>
                  <p className="text-white font-bold">Vous</p>
                  <p className="text-white/60 text-sm">Rang #{currentUserRank}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-accent font-bold text-xl">{diamonds} 💎</p>
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="space-y-2">
            {mockPlayers.map((player) => (
              <div
                key={player.rank}
                className="bg-card border border-border rounded-2xl p-4 card-shadow hover:border-primary/30 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`text-2xl font-bold ${getRankColor(player.rank)} min-w-[3rem]`}>
                      {getRankIcon(player.rank)}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center text-xl">
                      {player.avatar}
                    </div>
                    <div>
                      <p className="text-white font-semibold">{player.name}</p>
                      <p className="text-white/40 text-xs">Rang {player.rank}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-accent font-bold text-lg">{player.diamonds.toLocaleString()}</p>
                    <p className="text-white/40 text-xs">💎 Diamants</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </>
  );
}
