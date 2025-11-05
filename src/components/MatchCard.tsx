import { Match } from '@/lib/mock-data';
import { useBetStore, BetType } from '@/lib/store';

interface MatchCardProps {
  match: Match;
}

export function MatchCard({ match }: MatchCardProps) {
  const isFinished = match.status === 'finished' || match.status === 'played';
  const { selections, toggleSelection } = useBetStore();

  const handleOddsClick = (betType: BetType, odds: number) => {
    if (!isFinished) {
      toggleSelection({ match, betType, odds });
    }
  };

  const isSelected = (betType: any) => {
    return selections.some((s: any) => s.match.id === match.id && s.betType === betType);
  };

  return (
    <div className="relative rounded-3xl overflow-hidden card-shadow border border-border h-[360px]">
      <img
        src={match.imageUrl || 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg'}
        alt={`${match.homeTeam} vs ${match.awayTeam}`}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.8) 35%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.0) 70%)'
        }}
      />

      <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full z-10">
        <p className="text-white text-xs font-semibold">{match.league}</p>
      </div>

      <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-between p-4 z-10">
        <div></div>

        <div>
          <p className="text-white/70 text-xs mb-2">{match.datetime}</p>
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <p className="text-white font-bold text-xl mb-1">{match.homeTeam}</p>
              {match.homeScore !== undefined && (
                <p className="text-accent text-3xl font-bold">{match.homeScore}</p>
              )}
            </div>
            <div className="px-4">
              <p className="text-white/60 text-sm">VS</p>
            </div>
            <div className="flex-1 text-right">
              <p className="text-white font-bold text-xl mb-1">{match.awayTeam}</p>
              {match.awayScore !== undefined && (
                <p className="text-accent text-3xl font-bold">{match.awayScore}</p>
              )}
            </div>
          </div>

          {!isFinished && (
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleOddsClick('home', match.homeOdds)}
                className={`py-3 rounded-2xl transition-all backdrop-blur-sm ${
                  isSelected('home')
                    ? 'bg-accent text-black font-bold shadow-lg scale-105'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <p className="text-xs opacity-80 mb-1">1</p>
                <p className="text-lg font-bold">{match.homeOdds.toFixed(2)}</p>
              </button>

              <button
                onClick={() => handleOddsClick('draw', match.drawOdds)}
                className={`py-3 rounded-2xl transition-all backdrop-blur-sm ${
                  isSelected('draw')
                    ? 'bg-accent text-black font-bold shadow-lg scale-105'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <p className="text-xs opacity-80 mb-1">N</p>
                <p className="text-lg font-bold">{match.drawOdds.toFixed(2)}</p>
              </button>

              <button
                onClick={() => handleOddsClick('away', match.awayOdds)}
                className={`py-3 rounded-2xl transition-all backdrop-blur-sm ${
                  isSelected('away')
                    ? 'bg-accent text-black font-bold shadow-lg scale-105'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <p className="text-xs opacity-80 mb-1">2</p>
                <p className="text-lg font-bold">{match.awayOdds.toFixed(2)}</p>
              </button>
            </div>
          )}

          {isFinished && (
            <div className="text-center py-3 bg-card/50 backdrop-blur-sm rounded-2xl">
              <p className="text-white/60 text-sm">Match terminé</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
