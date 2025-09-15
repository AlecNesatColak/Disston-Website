/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/home.tsx
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import MiniLeagueTableTabs from "../components/homepage/MiniLeagueTableTabs";
import HOMEPAGE_CONSTANTS from "../components/homepage/constants/homepage-constants";
import type Player from "@/models/interfaces/player";
import { getActivePlayers } from "@/lib/http/adminApi";
import {
  fetchLeaguesByType,
  fetchLeagueStandings,
  LeagueStandingsWithTeam,
} from "../lib/leagueApi";
import {
  fetchUpcomingMatches,
  fetchRecentMatches,
  MatchWithTeams,
} from "../lib/matchApi";

export default function HomePage() {
  const [topSuncoast, setTopSuncoast] = useState<LeagueStandingsWithTeam[]>([]);
  const [topMexican, setTopMexican] = useState<LeagueStandingsWithTeam[]>([]);
  const [leagueLoading, setLeagueLoading] = useState(true);
  const [leagueError, setLeagueError] = useState<string | null>(null);
  const [upcomingMatches, setUpcomingMatches] = useState<MatchWithTeams[]>([]);
  const [recentMatches, setRecentMatches] = useState<MatchWithTeams[]>([]);
  const [matchLoading, setMatchLoading] = useState(true);
  const [matchError, setMatchError] = useState<string | null>(null);

  const {
    data: players = [],
    isLoading,
    error,
  } = useQuery<Player[]>({
    queryKey: ["players", "active"],
    queryFn: ({ signal }) => getActivePlayers(signal),
  });

  const playerCount = players.length;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLeagueLoading(true);
        setMatchLoading(true);
        setLeagueError(null);
        setMatchError(null);

        // Fetch league data
        const suncoastLeagues = await fetchLeaguesByType("SUNCOAST");
        if (suncoastLeagues.length > 0) {
          const suncoastStandings = await fetchLeagueStandings(
            suncoastLeagues[0].id
          );
          setTopSuncoast(suncoastStandings.slice(0, 4)); // Top 4 teams
        }

        const mexicanLeagues = await fetchLeaguesByType("MEXICAN");
        if (mexicanLeagues.length > 0) {
          const mexicanStandings = await fetchLeagueStandings(
            mexicanLeagues[0].id
          );
          setTopMexican(mexicanStandings.slice(0, 4)); // Top 4 teams
        }

        // Fetch match data
        const upcoming = await fetchUpcomingMatches(5);
        setUpcomingMatches(upcoming);

        const recent = await fetchRecentMatches(5);
        setRecentMatches(recent);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch data";
        setLeagueError(errorMessage);
        setMatchError(errorMessage);
        console.error("Error fetching data:", err);
      } finally {
        setLeagueLoading(false);
        setMatchLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #2563eb 0%, #facc15 100%)",
      }}
    >
      {/* Optional error banner */}
      {error && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-red-600 text-white px-4 py-2 rounded shadow">
          {(error as any)?.message ?? "Failed to load players."}
        </div>
      )}

      {/* SVG Pattern Overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        fill="none"
        viewBox="0 0 1440 900"
      >
        <defs>
          <pattern
            id="circles"
            x="0"
            y="0"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="40" cy="40" r="32" fill="#fff" fillOpacity="0.08" />
          </pattern>
        </defs>
        <rect width="1440" height="900" fill="url(#circles)" />
      </svg>

      {/* Animated Gradient Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl animate-pulse"
          style={{ opacity: 0.3 }}
        />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-2xl animate-pulse"
          style={{ opacity: 0.3, animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-2xl animate-pulse"
          style={{ opacity: 0.15, animationDelay: "4s" }}
        />
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
        <div
          className="absolute top-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-0 left-0 w-96 h-96 bg-green-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Soccer Ball Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-8 h-8 bg-black rounded-full" />
        <div className="absolute top-40 right-20 w-6 h-6 bg-black rounded-full" />
        <div className="absolute bottom-40 left-1/4 w-10 h-10 bg-black rounded-full" />
        <div className="absolute bottom-20 right-1/3 w-7 h-7 bg-black rounded-full" />
      </div>

      {/* Floating Team Photos (unchanged) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 rounded-lg transform rotate-3 animate-float-slow overflow-hidden">
          <Image
            src="/images/Disston-team-pic.jpg"
            alt="Team Photo 2018"
            fill
            className="object-cover"
          />
        </div>
        <div
          className="absolute top-1/4 right-12 w-96 h-96 rounded-lg shadow-lg transform -rotate-2 animate-float-slow overflow-hidden"
          style={{ animationDelay: "3s" }}
        >
          <Image
            src="/images/Disston-team-pic2.jpg"
            alt="Team Photo 2019"
            fill
            className="object-cover"
          />
        </div>
        <div
          className="absolute top-1/3 left-4 w-96 h-96 rounded-lg shadow-lg transform rotate-1 animate-float-slow overflow-hidden"
          style={{ animationDelay: "1.5s" }}
        >
          <Image
            src="/images/gaffer.jpg"
            alt="Team Photo 2020"
            fill
            className="object-cover"
          />
        </div>
        <div
          className="absolute top-1/2 right-8 w-96 h-96 rounded-lg shadow-lg transform -rotate-1 animate-float-slow overflow-hidden"
          style={{ animationDelay: "4.5s" }}
        >
          <Image
            src="/images/Disston-Crests.jpg"
            alt="Team Photo 2021"
            fill
            className="object-cover"
          />
        </div>
        <div
          className="absolute bottom-1/4 left-8 w-96 h-96 rounded-lg shadow-lg transform -rotate-2 animate-float-slow overflow-hidden"
          style={{ animationDelay: "6s" }}
        >
          <Image
            src="/images/Banner.jpg"
            alt="Team Photo 2022"
            fill
            className="object-cover"
          />
        </div>
        <div
          className="absolute bottom-16 right-12 w-96 h-96 rounded-lg shadow-lg transform rotate-2 animate-float-slow overflow-hidden"
          style={{ animationDelay: "7.5s" }}
        >
          <Image
            src="/images/Banner.jpg"
            alt="Team Photo 2023"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Top Banner */}
      <div className="w-full h-64 relative shadow-lg rounded-b-3xl overflow-hidden">
        <Image
          src="/images/Banner.jpg"
          alt="Disston City Soccer Club Banner"
          fill
          priority
          className="object-contain"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto py-8 px-4 relative z-10">
        <div className="rounded-3xl bg-white/80 backdrop-blur-lg shadow-2xl border-2 border-blue-200/60 p-6 md:p-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-yellow-400 bg-clip-text text-transparent">
              {HOMEPAGE_CONSTANTS.hero.title}
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              {HOMEPAGE_CONSTANTS.hero.subtitle}
            </p>
            <div className="flex justify-center space-x-4 text-sm text-gray-500">
              <span className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                {HOMEPAGE_CONSTANTS.hero.badges.suncoastLeague}
              </span>
              <span className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                {HOMEPAGE_CONSTANTS.hero.badges.mexicanLeague}
              </span>
              <span className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                {HOMEPAGE_CONSTANTS.hero.badges.location}
              </span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="group bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 text-center border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-blue-600">
              <Link href="/roster" className="block">
                <div className="text-3xl font-bold text-blue-600 mb-2 group-hover:text-white transition-colors duration-300">
                  {isLoading ? "…" : playerCount}
                </div>
                <div className="text-gray-600 group-hover:text-white transition-colors duration-300">
                  {HOMEPAGE_CONSTANTS.quickStats.players.label}
                </div>
              </Link>
            </div>
            <Link
              href="/leagues"
              className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 text-center border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className="text-3xl font-bold text-green-600 mb-2">2</div>
              <div className="text-gray-600">
                {HOMEPAGE_CONSTANTS.quickStats.leagues.label}
              </div>
            </Link>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 text-center border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl font-bold text-purple-600 mb-2">1</div>
              <div className="text-gray-600">
                {HOMEPAGE_CONSTANTS.quickStats.titles.label}
              </div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 text-center border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl font-bold text-orange-600 mb-2">3</div>
              <div className="text-gray-600">
                {HOMEPAGE_CONSTANTS.quickStats.seasons.label}
              </div>
            </div>
          </div>

          {/* Latest Results */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 border border-white/20">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {HOMEPAGE_CONSTANTS.sections.latestResults.title}
            </h2>
            {matchLoading ? (
              <div className="flex justify-center items-center py-8">
                <div className="text-blue-600 font-semibold">
                  Loading match data...
                </div>
              </div>
            ) : matchError ? (
              <div className="flex justify-center items-center py-8">
                <div className="text-red-600 font-semibold">
                  Error: {matchError}
                </div>
              </div>
            ) : recentMatches.length === 0 ? (
              <div className="flex justify-center items-center py-8">
                <div className="text-gray-600 font-semibold">
                  No recent matches found
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {recentMatches.map((match) => (
                  <div
                    key={match.id}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-sm font-semibold text-gray-700">
                        {new Date(match.match_date).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-600">
                        {match.home_team.name} vs {match.away_team.name}
                      </div>
                      <div className="text-sm font-bold text-green-600">
                        {match.home_score !== null && match.away_score !== null
                          ? `${match.home_score}-${match.away_score}`
                          : "TBD"}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {match.match_time} - {match.league.name}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Upcoming Matches */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 border border-white/20">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {HOMEPAGE_CONSTANTS.sections.upcomingMatches.title}
            </h2>

            {matchLoading ? (
              <div className="flex justify-center items-center py-8">
                <div className="text-blue-600 font-semibold">
                  Loading match data...
                </div>
              </div>
            ) : matchError ? (
              <div className="flex justify-center items-center py-8">
                <div className="text-red-600 font-semibold">
                  Error: {matchError}
                </div>
              </div>
            ) : upcomingMatches.length === 0 ? (
              <div className="flex justify-center items-center py-8">
                <div className="text-gray-600 font-semibold">
                  No upcoming matches found
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Header (hidden on small screens) */}
                <div
                  className="
          hidden md:grid items-center px-4 py-2 rounded-lg border bg-gray-50 border-gray-200
          /* Wider Match, then Location, Time pinned right */
          md:grid-cols-[120px,2.2fr,1.4fr,130px]
          lg:grid-cols-[120px,3fr,2fr,140px]
          text-xs font-semibold tracking-wide text-gray-600
          min-w-0
        "
                >
                  <div className="uppercase">Date</div>
                  <div className="uppercase">Match</div>
                  <div className="uppercase">Location</div>
                  <div className="uppercase text-right justify-self-end">
                    Time
                  </div>
                </div>

                {upcomingMatches.map((match, index) => {
                  const gradientColors = [
                    "from-blue-50 to-blue-100 border-blue-200",
                    "from-green-50 to-green-100 border-green-200",
                    "from-purple-50 to-purple-100 border-purple-200",
                    "from-yellow-50 to-yellow-100 border-yellow-200",
                    "from-red-50 to-red-100 border-red-200",
                  ];
                  const colorClass =
                    gradientColors[index % gradientColors.length];

                  const date = new Date(match.match_date);
                  const dateStr = date.toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  });

                  return (
                    <div
                      key={match.id}
                      className={`
              bg-gradient-to-r ${colorClass} rounded-lg border transition-shadow hover:shadow-md p-4
              /* Grid on md+, stacked on mobile */
              md:grid md:items-center md:gap-4
              md:grid-cols-[120px,2.2fr,1.4fr,130px]
              lg:grid-cols-[120px,3fr,2fr,140px]
              min-w-0
            `}
                    >
                      {/* Mobile stacked */}
                      <div className="md:hidden mb-2">
                        <div className="text-xs font-semibold text-gray-600">
                          Date
                        </div>
                        <div className="text-sm font-semibold text-gray-800">
                          {dateStr}
                        </div>
                      </div>
                      <div className="md:hidden mb-2">
                        <div className="text-xs font-semibold text-gray-600">
                          Match
                        </div>
                        <div className="text-sm text-gray-700">
                          {match.home_team.name} vs {match.away_team.name}
                        </div>
                      </div>
                      <div className="md:hidden mb-2">
                        <div className="text-xs font-semibold text-gray-600">
                          Location
                        </div>
                        <div className="text-sm text-gray-700">
                          {match.field_name}
                        </div>
                      </div>
                      <div className="md:hidden">
                        <div className="text-xs font-semibold text-gray-600">
                          Time
                        </div>
                        <div className="text-sm text-gray-700">
                          {match.match_time}
                        </div>
                      </div>

                      {/* Desktop aligned columns */}
                      <div className="hidden md:block text-sm font-semibold text-gray-800 whitespace-nowrap">
                        {dateStr}
                      </div>

                      {/* Match — give it room, enable truncation with tooltip via title */}
                      <div
                        className="hidden md:block text-sm text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis min-w-0"
                        title={`${match.home_team.name} vs ${match.away_team.name}`}
                      >
                        {match.home_team.name} vs {match.away_team.name}
                      </div>

                      {/* Location */}
                      <div
                        className="hidden md:block text-sm text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis min-w-0"
                        title={match.field_name}
                      >
                        {match.field_name}
                      </div>

                      {/* Time pinned far right */}
                      <div className="hidden md:block text-sm text-gray-700 text-right justify-self-end whitespace-nowrap">
                        {match.match_time}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Top Performers (data-driven from players) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {HOMEPAGE_CONSTANTS.sections.topScorers.title}
              </h3>
              <div className="space-y-3">
                {(isLoading
                  ? []
                  : players
                      .slice()
                      .sort((a, b) => (b.goals ?? 0) - (a.goals ?? 0))
                      .slice(0, 3)
                ).map((player, index) => (
                  <div
                    key={player.id ?? index}
                    className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-semibold">{player.first_name}</div>
                        <div className="text-sm text-gray-500">
                          {player.position}
                        </div>
                      </div>
                    </div>
                    <div className="font-bold text-green-600">
                      {player.goals}
                    </div>
                  </div>
                ))}
              </div>
              <div />
            </div>

                        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {HOMEPAGE_CONSTANTS.sections.assists.title}
              </h3>
              <div className="space-y-3">
                {(isLoading
                  ? []
                  : players
                      .slice()
                      .sort((a, b) => (b.assists ?? 0) - (a.assists ?? 0))
                      .slice(0, 3)
                ).map((player, index) => (
                  <div
                    key={player.id ?? index}
                    className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-yellow-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-semibold">{player.first_name}</div>
                        <div className="text-sm text-gray-500">
                          {player.position}
                        </div>
                      </div>
                    </div>
                    <div className="font-bold text-green-600">
                      {player.assists}
                    </div>
                  </div>
                ))}
              </div>
              <div />
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {HOMEPAGE_CONSTANTS.sections.cleanSheets.title}
              </h3>
              <div className="space-y-3">
                {(isLoading
                  ? []
                  : players
                      .filter((p) =>
                        ["GK", "LB", "RB", "CB"].includes(p.position ?? "")
                      )
                      .slice()
                      .sort(
                        (a, b) => (b.clean_sheets ?? 0) - (a.clean_sheets ?? 0)
                      )
                      .slice(0, 3)
                ).map((player, index) => (
                  <div
                    key={player.id ?? index}
                    className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-semibold">{player.first_name}</div>
                        <div className="text-sm text-gray-500">
                          {player.position}
                        </div>
                      </div>
                    </div>
                    <div className="font-bold text-blue-600">
                      {player.clean_sheets}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* League Tables */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 border border-white/20">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              🏆 League Tables
            </h2>
            <MiniLeagueTableTabs
              topSuncoast={topSuncoast}
              topMexican={topMexican}
              loading={leagueLoading}
              error={leagueError}
            />
            <div className="mt-4 text-right">
              <Link
                href="/leagues"
                className="text-blue-600 hover:underline font-semibold"
              >
                View Full Tables →
              </Link>
            </div>
          </div>

          {/* FPL (unchanged) */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 border border-white/20">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">FPL</h2>
            <div className="space-y-4" />
            <Link
              href="https://fantasy.premierleague.com/leagues/your-league-id-here"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 border border-yellow-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <h2 className="text-2xl font-bold text-yellow-600 mb-2">
                    📊 Disston City FPL League
                  </h2>
                  <p className="text-gray-600">
                    Think you know football? Compete with teammates all season
                    long!
                  </p>
                </div>
                <button className="mt-4 md:mt-0 bg-yellow-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition-all duration-300">
                  View & Join League →
                </button>
              </div>
            </Link>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-xl shadow-2xl p-8 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16" />
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-12 translate-y-12" />
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full" />

            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">
                {HOMEPAGE_CONSTANTS.sections.joinClub.title}
              </h2>
              <p className="text-xl mb-6">
                {HOMEPAGE_CONSTANTS.sections.joinClub.subtitle}
              </p>
              <div className="flex justify-center space-x-4">
                <Link
                  href="/player-request"
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg inline-block"
                >
                  Join Team
                </Link>
                <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105">
                  View Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
