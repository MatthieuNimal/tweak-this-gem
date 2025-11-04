export interface Match {
  id: string;
  league: string;
  datetime: string;
  homeTeam: string;
  awayTeam: string;
  homeOdds: number;
  drawOdds: number;
  awayOdds: number;
  status: 'upcoming' | 'played' | 'finished';
  homeScore?: number;
  awayScore?: number;
  imageUrl?: string;
}

export const mockMatches: Match[] = [
  {
    id: '1',
    league: 'Ligue 1 - France',
    datetime: '02/11/2025 19:00',
    homeTeam: 'PSG',
    awayTeam: 'Marseille',
    homeOdds: 1.75,
    drawOdds: 3.80,
    awayOdds: 4.50,
    status: 'upcoming',
    imageUrl: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
  },
  {
    id: '2',
    league: 'Ligue 1 - France',
    datetime: '02/11/2025 19:30',
    homeTeam: 'Lyon',
    awayTeam: 'Monaco',
    homeOdds: 2.10,
    drawOdds: 3.40,
    awayOdds: 3.30,
    status: 'upcoming',
    imageUrl: 'https://images.pexels.com/photos/262524/pexels-photo-262524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
  },
  {
    id: '3',
    league: 'Ligue 1 - France',
    datetime: '02/11/2025 20:00',
    homeTeam: 'Lille',
    awayTeam: 'Nice',
    homeOdds: 2.25,
    drawOdds: 3.20,
    awayOdds: 3.10,
    status: 'upcoming',
    imageUrl: 'https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
  },
  {
    id: '4',
    league: 'Premier League - England',
    datetime: '02/11/2025 20:30',
    homeTeam: 'Manchester United',
    awayTeam: 'Liverpool',
    homeOdds: 2.40,
    drawOdds: 3.30,
    awayOdds: 2.90,
    status: 'upcoming',
    imageUrl: 'https://images.pexels.com/photos/1657214/pexels-photo-1657214.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
  },
  {
    id: '5',
    league: 'La Liga - Spain',
    datetime: '02/11/2025 21:00',
    homeTeam: 'Real Madrid',
    awayTeam: 'Barcelona',
    homeOdds: 2.00,
    drawOdds: 3.50,
    awayOdds: 3.75,
    status: 'upcoming',
    imageUrl: 'https://images.pexels.com/photos/209841/pexels-photo-209841.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
  },
  {
    id: '6',
    league: 'Bundesliga - Germany',
    datetime: '02/11/2025 21:30',
    homeTeam: 'Bayern Munich',
    awayTeam: 'Borussia Dortmund',
    homeOdds: 1.65,
    drawOdds: 4.00,
    awayOdds: 5.50,
    status: 'upcoming',
    imageUrl: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
  },
];
