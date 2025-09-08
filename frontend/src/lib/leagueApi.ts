// API service for league data
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_PROD_BASE_URL || "http://localhost:8000";

export interface League {
  id: string;
  name: string;
  league_type: "SUNCOAST" | "MEXICAN";
  season: string;
  division?: string;
  is_active: number;
  created_at: string;
  updated_at?: string;
}

export interface Team {
  id: string;
  name: string;
  league_id: string;
  is_active: number;
  created_at: string;
  updated_at?: string;
}

export interface LeagueStandings {
  id: string;
  league_id: string;
  team_id: string;
  matches_played: number;
  wins: number;
  draws: number;
  losses: number;
  goals_for: number;
  goals_against: number;
  goal_difference: number;
  points: number;
  position?: number;
  created_at: string;
  updated_at?: string;
  team?: Team;
}

export interface LeagueStandingsWithTeam extends LeagueStandings {
  team: Team;
}

// Fetch all leagues
export async function fetchLeagues(): Promise<League[]> {
  const response = await fetch(`${API_BASE_URL}/api/leagues/`);
  if (!response.ok) {
    throw new Error("Failed to fetch leagues");
  }
  return response.json();
}

// Fetch standings for a specific league
export async function fetchLeagueStandings(
  leagueId: string
): Promise<LeagueStandingsWithTeam[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/standings/league/${leagueId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch league standings");
  }
  return response.json();
}

// Fetch leagues by type (SUNCOAST or MEXICAN)
export async function fetchLeaguesByType(
  leagueType: "SUNCOAST" | "MEXICAN"
): Promise<League[]> {
  const leagues = await fetchLeagues();
  return leagues.filter((league) => league.league_type === leagueType);
}

// Fetch active leagues
export async function fetchActiveLeagues(): Promise<League[]> {
  const leagues = await fetchLeagues();
  return leagues.filter((league) => league.is_active === 1);
}
