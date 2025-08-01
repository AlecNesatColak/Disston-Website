import React, { useState } from 'react';

export const suncoastLeague = Array.from({ length: 20 }, (_, i) => ({
  pos: i + 1,
  team: i === 0 ? "Disston City" : `Suncoast Team ${i + 1}`,
  played: 20,
  won: 20 - i,
  drawn: i % 3,
  lost: i,
  pts: 60 - i * 2,
}));

export const mexicanLeague = Array.from({ length: 20 }, (_, i) => ({
  pos: i + 1,
  team: i === 0 ? "Disston City" : `Mexican Team ${i + 1}`,
  played: 20,
  won: 19 - i,
  drawn: (i + 1) % 4,
  lost: i,
  pts: 58 - i * 2,
}));

export default function LeagueTableTabs() {
  const [activeTab, setActiveTab] = useState("Suncoast League");
  const tabs = ["Suncoast League", "Mexican League"];
  const tableData = activeTab === "Suncoast League" ? suncoastLeague : mexicanLeague;

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
              <th className="px-3 py-2 font-bold">Pts</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr
                key={row.team}
                className={
                  row.team === "Disston City"
                    ? "bg-green-50 font-bold"
                    : "hover:bg-gray-50"
                }
              >
                <td className="px-3 py-2">{row.pos}</td>
                <td className="px-3 py-2">{row.team}</td>
                <td className="px-3 py-2">{row.played}</td>
                <td className="px-3 py-2">{row.won}</td>
                <td className="px-3 py-2">{row.drawn}</td>
                <td className="px-3 py-2">{row.lost}</td>
                <td className="px-3 py-2">{row.pts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}