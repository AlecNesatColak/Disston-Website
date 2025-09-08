// API service for match data
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_PROD_BASE_URL || "http://localhost:8000";

export interface Match {
  id: string;
  match_date: string;
  match_time?: string;
  home_team_id: string;
  away_team_id: string;
  league_id: string;
  venue_name?: string;
  field_name?: string;
  full_location?: string;
  match_type?: string;
  division?: string;
  home_score?: number;
  away_score?: number;
  status: "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "POSTPONED" | "CANCELLED";
  notes?: string;
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

export interface MatchWithTeams extends Match {
  home_team: Team;
  away_team: Team;
  league: League;
}

// Fetch all matches
export async function fetchMatches(): Promise<MatchWithTeams[]> {
  const response = await fetch(`${API_BASE_URL}/api/matches/`);
  if (!response.ok) {
    throw new Error("Failed to fetch matches");
  }
  return response.json();
}

// Fetch upcoming matches
export async function fetchUpcomingMatches(
  limit: number = 10
): Promise<MatchWithTeams[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/matches/upcoming?limit=${limit}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch upcoming matches");
  }
  return response.json();
}

// Fetch recent matches
export async function fetchRecentMatches(
  limit: number = 10
): Promise<MatchWithTeams[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/matches/recent?limit=${limit}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch recent matches");
  }
  return response.json();
}

// Fetch matches by league
export async function fetchMatchesByLeague(
  leagueId: string
): Promise<MatchWithTeams[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/matches/league/${leagueId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch matches by league");
  }
  return response.json();
}

// Fetch matches by team
export async function fetchMatchesByTeam(
  teamId: string
): Promise<MatchWithTeams[]> {
  const response = await fetch(`${API_BASE_URL}/api/matches/team/${teamId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch matches by team");
  }
  return response.json();
}

// Fetch a specific match
export async function fetchMatch(matchId: string): Promise<MatchWithTeams> {
  const response = await fetch(`${API_BASE_URL}/api/matches/${matchId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch match");
  }
  return response.json();
}
