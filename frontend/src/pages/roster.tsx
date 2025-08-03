import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Player from '@/models/interfaces/player';
import { getPositionColor } from '@/models/helpers/position-color';



export default function RosterPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch roster data from backend
  useEffect(() => {
    const fetchRoster = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/players/roster');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setPlayers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch roster');
      } finally {
        setLoading(false);
      }
    };

    fetchRoster();
  }, []);



  if (loading) {
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
          <p className="text-gray-600 mb-4">{error}</p>
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
            <Link 
              href="/"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
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
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Player
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Apps
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Goals
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assists
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Clean Sheets
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cards
                  </th>
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
                              src={player.profile_image_url}
                              alt={`${player.first_name} ${player.last_name}`}
                              width={40}
                              height={40}
                              className="rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                              <span className="text-gray-600 font-semibold">
                                {player.first_name[0]}{player.last_name[0]}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {player.first_name} {player.last_name}
                            {player.is_captain && (
                              <span className="ml-2 text-yellow-600">©</span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            Joined {player.joined_at ? new Date(player.joined_at).getFullYear() : 'N/A'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPositionColor(player.position)}`}>
                        {player.position}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {player.jersey_number || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {player.appearances}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {player.goals}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {player.assists}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {player.clean_sheets || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex space-x-1">
                        {player.yellow_cards > 0 && (
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                            🟨 {player.yellow_cards}
                          </span>
                        )}
                        {player.red_cards > 0 && (
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                            🟥 {player.red_cards}
                          </span>
                        )}
                        {player.yellow_cards === 0 && player.red_cards === 0 && (
                          <span className="text-gray-400">-</span>
                        )}
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
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 text-center border border-white/20">
            <div className="text-2xl font-bold text-blue-600">{players.length}</div>
            <div className="text-gray-600">Total Players</div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 text-center border border-white/20">
            <div className="text-2xl font-bold text-green-600">
              {players.reduce((sum, player) => sum + player.goals, 0)}
            </div>
            <div className="text-gray-600">Total Goals</div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 text-center border border-white/20">
            <div className="text-2xl font-bold text-purple-600">
              {players.reduce((sum, player) => sum + player.assists, 0)}
            </div>
            <div className="text-gray-600">Total Assists</div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 text-center border border-white/20">
            <div className="text-2xl font-bold text-yellow-600">
              {players.filter(player => player.is_captain).length}
            </div>
            <div className="text-gray-600">Captains</div>
          </div>
        </div>
      </div>
    </div>
  );
}