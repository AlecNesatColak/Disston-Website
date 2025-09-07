import React, { useState, useEffect } from "react";
import {
  fetchLeaguesByType,
  fetchLeagueStandings,
  League,
  LeagueStandingsWithTeam,
} from "../lib/leagueApi";

export default function LeagueTableTabs() {
  const [activeTab, setActiveTab] = useState("Suncoast League");
  const [suncoastLeague, setSuncoastLeague] = useState<
    LeagueStandingsWithTeam[]
  >([]);
  const [mexicanLeague, setMexicanLeague] = useState<LeagueStandingsWithTeam[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const tabs = ["Suncoast League", "Mexican League"];

  useEffect(() => {
    const fetchLeagueData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch Suncoast leagues
        const suncoastLeagues = await fetchLeaguesByType("SUNCOAST");
        if (suncoastLeagues.length > 0) {
          const suncoastStandings = await fetchLeagueStandings(
            suncoastLeagues[0].id
          );
          setSuncoastLeague(suncoastStandings);
        }

        // Fetch Mexican leagues
        const mexicanLeagues = await fetchLeaguesByType("MEXICAN");
        if (mexicanLeagues.length > 0) {
          const mexicanStandings = await fetchLeagueStandings(
            mexicanLeagues[0].id
          );
          setMexicanLeague(mexicanStandings);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch league data"
        );
        console.error("Error fetching league data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeagueData();
  }, []);

  const tableData =
    activeTab === "Suncoast League" ? suncoastLeague : mexicanLeague;

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-blue-600 font-semibold">
          Loading league data...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-red-600 font-semibold">Error: {error}</div>
      </div>
    );
  }

  return (
    <div>
      {/* Tab Switcher */}
      <div className="flex space-x-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-t-lg font-semibold transition-colors duration-200 ${
              activeTab === tab
                ? "bg-blue-600 text-white shadow"
                : "bg-gray-100 text-gray-600 hover:bg-blue-100"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="bg-blue-50">
              <th className="px-3 py-2 font-bold">Pos</th>
              <th className="px-3 py-2 font-bold">Team</th>
              <th className="px-3 py-2 font-bold">P</th>
              <th className="px-3 py-2 font-bold">W</th>
              <th className="px-3 py-2 font-bold">D</th>
              <th className="px-3 py-2 font-bold">L</th>
              <th className="px-3 py-2 font-bold">GF</th>
              <th className="px-3 py-2 font-bold">GA</th>
              <th className="px-3 py-2 font-bold">GD</th>
              <th className="px-3 py-2 font-bold">Pts</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr
                key={row.team.id}
                className={
                  row.team.name === "Disston City Soccer Club"
                    ? "bg-green-50 font-bold"
                    : "hover:bg-gray-50"
                }
              >
                <td className="px-3 py-2">{row.position || "-"}</td>
                <td className="px-3 py-2">{row.team.name}</td>
                <td className="px-3 py-2">{row.matches_played}</td>
                <td className="px-3 py-2">{row.wins}</td>
                <td className="px-3 py-2">{row.draws}</td>
                <td className="px-3 py-2">{row.losses}</td>
                <td className="px-3 py-2">{row.goals_for}</td>
                <td className="px-3 py-2">{row.goals_against}</td>
                <td className="px-3 py-2">{row.goal_difference}</td>
                <td className="px-3 py-2">{row.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
