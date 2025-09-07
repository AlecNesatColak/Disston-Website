import React from "react";

// Accept data as props for reusability
function MiniLeagueTableTabs({ topSuncoast, topMexican, loading, error }) {
  const [activeTab, setActiveTab] = React.useState("Suncoast League");
  const tabs = ["Suncoast League", "Mexican League"];
  const tableData = activeTab === "Suncoast League" ? topSuncoast : topMexican;

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
                <td className="px-3 py-2">{row.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MiniLeagueTableTabs;
