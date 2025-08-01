import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { suncoastLeague, mexicanLeague } from '../components/LeagueTableTabs';


export default function HomePage() {
  // Only show top 4 teams for homepage
  const topSuncoast = suncoastLeague.slice(0, 4);
  const topMexican = mexicanLeague.slice(0, 4);

  // Mini tab switcher for homepage
  function MiniLeagueTableTabs() {
    const [activeTab, setActiveTab] = React.useState("Suncoast League");
    const tabs = ["Suncoast League", "Mexican League"];
    const tableData = activeTab === "Suncoast League" ? topSuncoast : topMexican;

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

  return (
    <div className="min-h-screen relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #2563eb 0%, #facc15 100%)", // blue to yellow
      }}
    >
      {/* SVG Pattern Overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        fill="none"
        viewBox="0 0 1440 900"
      >
        <defs>
          <pattern id="circles" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <circle cx="40" cy="40" r="32" fill="#fff" fillOpacity="0.08" />
          </pattern>
        </defs>
        <rect width="1440" height="900" fill="url(#circles)" />
      </svg>

      {/* Animated Gradient Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl animate-pulse" style={{ opacity: 0.3 }}></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-2xl animate-pulse" style={{ opacity: 0.3, animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-2xl animate-pulse" style={{ opacity: 0.15, animationDelay: '4s' }}></div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Soccer Ball Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-8 h-8 bg-black rounded-full"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-black rounded-full"></div>
        <div className="absolute bottom-40 left-1/4 w-10 h-10 bg-black rounded-full"></div>
        <div className="absolute bottom-20 right-1/3 w-7 h-7 bg-black rounded-full"></div>
      </div>

      {/* Floating Team Photos */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {/* Top Left Team Photo */}
        <div className="absolute top-16 left-8 w-64 h-64 rounded-lg shadow-lg transform rotate-3 animate-float-slow overflow-hidden" style={{animationDelay: '0s'}}>
          <Image
            src="/images/Banner.jpg"
            alt="Team Photo 2018"
            fill
            className="object-cover"
          />
        </div>
        {/* Top Right Team Photo */}
        <div className="absolute top-24 right-12 w-64 h-64 rounded-lg shadow-lg transform -rotate-2 animate-float-slow overflow-hidden" style={{animationDelay: '3s'}}>
          <Image
            src="/images/Banner.jpg"
            alt="Team Photo 2019"
            fill
            className="object-cover"
          />
        </div>
        {/* Middle Left Team Photo */}
        <div className="absolute top-1/3 left-4 w-64 h-64 rounded-lg shadow-lg transform rotate-1 animate-float-slow overflow-hidden" style={{animationDelay: '1.5s'}}>
          <Image
            src="/images/Banner.jpg"
            alt="Team Photo 2020"
            fill
            className="object-cover"
          />
        </div>
        {/* Middle Right Team Photo */}
        <div className="absolute top-1/2 right-8 w-64 h-64 rounded-lg shadow-lg transform -rotate-1 animate-float-slow overflow-hidden" style={{animationDelay: '4.5s'}}>
          <Image
            src="/images/Banner.jpg"
            alt="Team Photo 2021"
            fill
            className="object-cover"
          />
        </div>
        {/* Bottom Left Team Photo */}
        <div className="absolute bottom-12 left-8 w-64 h-64 rounded-lg shadow-lg transform -rotate-2 animate-float-slow overflow-hidden" style={{animationDelay: '6s'}}>
          <Image
            src="/images/Banner.jpg"
            alt="Team Photo 2022"
            fill
            className="object-cover"
          />
        </div>
        {/* Bottom Right Team Photo */}
        <div className="absolute bottom-16 right-12 w-64 h-64 rounded-lg shadow-lg transform rotate-2 animate-float-slow overflow-hidden" style={{animationDelay: '7.5s'}}>
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
        {/* Banner Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto py-8 px-4 relative z-10">
        <div className="rounded-3xl bg-white/80 backdrop-blur-lg shadow-2xl border-2 border-blue-200/60 p-6 md:p-12">
          {/* --- all your content below here --- */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-yellow-400 bg-clip-text text-transparent">Disston City Soccer Club</h1>
            <p className="text-xl text-gray-600 mb-6">Suncoast & Mexican League Champions</p>
            <div className="flex justify-center space-x-4 text-sm text-gray-500">
              <span className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">🏆 Suncoast Soccer League</span>
              <span className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">⚽ Pinellas Park Mexican League</span>
              <span className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">📍 St. Petersburg, FL</span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="group bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 text-center border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-blue-600">
              <Link 
                href="/roster"
                className="block"
              >
                <div className="text-3xl font-bold text-blue-600 mb-2 group-hover:text-white transition-colors duration-300">25</div>
                <div className="text-gray-600 group-hover:text-white transition-colors duration-300">Players</div>
              </Link>
            </div>
            <Link href="/leagues" className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 text-center border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <div className="text-3xl font-bold text-green-600 mb-2">2</div>
              <div className="text-gray-600">Leagues</div>
            </Link>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 text-center border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl font-bold text-purple-600 mb-2">15</div>
              <div className="text-gray-600">Titles</div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 text-center border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl font-bold text-orange-600 mb-2">8</div>
              <div className="text-gray-600">Seasons</div>
            </div>
          </div>

          {/* Latest Results */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 border border-white/20">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">🏆 Latest Results</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-500">Sun, Dec 15</div>
                  <div className="font-semibold">Disston City vs </div>
                </div>
                <div className="text-sm text-gray-500"> 1-0 W</div>
                <div className="text-sm text-gray-500">2:00 PM - Suncoast League</div>
              </div>
            </div>
          </div>
          

          {/* Upcoming Matches */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 border border-white/20">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">⚽ Upcoming Matches</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-500">Sun, Dec 15</div>
                  <div className="font-semibold">Disston City vs </div>
                </div>
                <div className="text-sm text-gray-500">2:00 PM - Suncoast League</div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-500">Sun, Dec 22</div>
                  <div className="font-semibold">Disston City vs </div>
                </div>
                <div className="text-sm text-gray-500">3:30 PM - Mexican League</div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-500">Sun, Dec 29</div>
                  <div className="font-semibold">Disston City vs </div>
                </div>
                <div className="text-sm text-gray-500">1:00 PM - Suncoast League</div>
              </div>
            </div>
          </div>

          {/* Top Performers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-800 mb-4">🏆 Top Scorers</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                    <div>
                      <div className="font-semibold"></div>
                      <div className="text-sm text-gray-500">Forward</div>
                    </div>
                  </div>
                  <div className="font-bold text-green-600">18 goals</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold">2</div>
                    <div>
                      <div className="font-semibold"></div>
                      <div className="text-sm text-gray-500">Midfielder</div>
                    </div>
                  </div>
                  <div className="font-bold text-green-600">15 goals</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                    <div>
                      <div className="font-semibold"></div>
                      <div className="text-sm text-gray-500">Striker</div>
                    </div>
                  </div>
                  <div className="font-bold text-green-600">12 goals</div>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-800 mb-4">🥅 Clean Sheets</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                    <div>
                      <div className="font-semibold"></div>
                      <div className="text-sm text-gray-500">Goalkeeper</div>
                    </div>
                  </div>
                  <div className="font-bold text-blue-600">8 clean sheets</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold">2</div>
                    <div>
                      <div className="font-semibold"></div>
                      <div className="text-sm text-gray-500">Defender</div>
                    </div>
                  </div>
                  <div className="font-bold text-blue-600">6 clean sheets</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                    <div>
                      <div className="font-semibold"></div>
                      <div className="text-sm text-gray-500">Defender</div>
                    </div>
                  </div>
                  <div className="font-bold text-blue-600">5 clean sheets</div>
                </div>
              </div>
            </div>
          </div>

          {/* League Tables Section with Tab Switcher */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 border border-white/20">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">🏆 League Tables</h2>
            {/* Only show top 4 teams */}
            <MiniLeagueTableTabs />
            <div className="mt-4 text-right">
              <Link href="/leagues" className="text-blue-600 hover:underline font-semibold">
                View Full Tables →
              </Link>
            </div>
          </div>

          {/* Club News */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 border border-white/20">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📰 Club News</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-r-lg border border-blue-200">
                <div className="text-sm text-gray-500 mb-1">Dec 10, 2024</div>
                <div className="font-semibold text-gray-800">New Season Registration Opens</div>
                <div className="text-gray-600">Registration for the 2025 season is now open. Players must submit their applications by January 15th.</div>
              </div>
              <div className="border-l-4 border-green-500 pl-4 p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-r-lg border border-green-200">
                <div className="text-sm text-gray-500 mb-1">Dec 8, 2024</div>
                <div className="font-semibold text-gray-800">Double League Challenge</div>
                <div className="text-gray-600">Disston City is leading both the Suncoast League and Mexican League with only 3 matchdays remaining in each.</div>
              </div>

            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-xl shadow-2xl p-8 text-center text-white relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-12 translate-y-12"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">Join Disston City!</h2>
              <p className="text-xl mb-6">Be part of the most successful soccer club in the region</p>
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
