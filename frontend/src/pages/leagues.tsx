import LeagueTableTabs from '../components/LeagueTableTabs';
import Link from 'next/link';

export default function LeaguesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-white to-yellow-300 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-4xl bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border-2 border-blue-200/60 p-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-700">League Tables</h1>
          <Link href="/" className="text-blue-600 hover:underline font-semibold">← Back Home</Link>
        </div>
        <LeagueTableTabs />
      </div>
    </div>
  );
}