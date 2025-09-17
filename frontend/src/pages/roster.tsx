/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import type Player from "@/models/interfaces/player";
import { getPositionColor } from "@/models/helpers/position-color";
import { getRoster } from "@/lib/http/adminApi";

export default function RosterPage() {
  const {
    data: players = [],
    isLoading,
    error,
  } = useQuery<Player[]>({
    queryKey: ["players", "roster"],
    queryFn: ({ signal }) => getRoster(signal),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading roster...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">⚠️ Error loading roster</div>
          <p className="text-gray-600 mb-4">{(error as any)?.message ?? "Failed to load roster."}</p>
          <Link href="/" className="text-blue-600 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-white/20">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">🏆 Team Roster</h1>
              <p className="text-gray-600 mt-2">Disston City Soccer Club</p>
            </div>
            <Link href="/" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Roster Table */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apps</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Goals</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assists</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clean Sheets</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cards</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {players.map((player) => (
                  <tr key={player.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {player.profile_image_url ? (
                            <Image
                              src={
                                player.profile_image_url?.startsWith("http")
                                  ? player.profile_image_url
                                  : player.profile_image_url?.startsWith("/")
                                    ? player.profile_image_url
                                    : "/default-avatar.png" // fallback in public/
                              }
                              alt={`${player.first_name} ${player.last_name}`}
                              width={40}
                              height={40}
                              className="rounded-full object-cover"
/>
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                              <span className="text-gray-600 font-semibold">
                                {player.first_name?.[0]}
                                {player.last_name?.[0]}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {player.first_name} {player.last_name}
                            {player.is_captain && <span className="ml-2 text-yellow-600">©</span>}
                          </div>
                          <div className="text-sm text-gray-500">
                            Joined {player.joined_at ? new Date(player.joined_at).toLocaleDateString() : "—"}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPositionColor(player.position)}`}>
                        {player.position ?? "—"}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="inline-block px-2 py-1 rounded-full bg-gradient-to-r from-blue-400 via-yellow-200 to-green-400 text-white font-bold animate-spin-slow shadow-lg transition-transform duration-500" style={{ display: 'inline-flex', alignItems: 'center', minWidth: 40, justifyContent: 'center' }}>
                        <span style={{ fontSize: '1.2em', marginRight: '0.2em' }}>👕</span>{player.jersey_number ?? "-"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="inline-block px-2 py-1 rounded bg-blue-100 text-blue-700 font-bold animate-pulse shadow-md transition-transform duration-300">
                        👟 {player.appearances ?? 0}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="inline-block px-2 py-1 rounded bg-green-50 text-green-700 font-bold animate-pulse shadow-md transition-transform duration-300">
                        ⚽ {player.goals ?? 0}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="inline-block px-2 py-1 rounded bg-purple-50 text-purple-700 font-bold animate-bounce shadow-md transition-transform duration-300">
                        🎯 {player.assists ?? 0}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="inline-block px-2 py-1 rounded bg-yellow-50 text-yellow-700 font-bold animate-pulse shadow-md transition-transform duration-300">
                        🧤 {player.clean_sheets ?? 0}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex gap-2">
                        {player.yellow_cards > 0 && (
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">🟨 {player.yellow_cards}</span>
                        )}
                        {player.red_cards > 0 && (
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">🟥 {player.red_cards}</span>
                        )}
                        {(player.yellow_cards ?? 0) === 0 && (player.red_cards ?? 0) === 0 && <span className="text-gray-400">0</span>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <Stat label="Total Players" value={players.length} accent="text-blue-600" />
          <Stat label="Total Goals" value={players.reduce((s, p) => s + (p.goals ?? 0), 0)} accent="text-green-600" />
          <Stat label="Total Assists" value={players.reduce((s, p) => s + (p.assists ?? 0), 0)} accent="text-purple-600" />
          <Stat label="Captains" value={players.filter((p) => p.is_captain).length} accent="text-yellow-600" />
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent: string }) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 text-center border border-white/20">
      <div className={`text-2xl font-bold ${accent}`}>{value}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
}
