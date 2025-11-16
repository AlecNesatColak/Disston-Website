import Link from "next/link";
import path from "path";
import fs from "fs";
import { Card, CardContent, CardTitle } from "../../components/ui/card";

export async function getStaticProps() {
  const GALLERY_ROOT = path.join(process.cwd(), "public/images/matchweek-gallery");

  const weeks = fs
    .readdirSync(GALLERY_ROOT)
    .filter((name) => fs.lstatSync(path.join(GALLERY_ROOT, name)).isDirectory());

  return { props: { weeks } };
}

interface GalleryIndexProps {
  weeks: string[];
}

export default function GalleryIndex({ weeks }: GalleryIndexProps) {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center py-12 px-4
        bg-gradient-to-b from-yellow-100 via-blue-100 to-yellow-50 relative overflow-hidden gap-8"
    >
      {/* SVG background for subtle polish */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none select-none">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="theme-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#1E90FF" stopOpacity="0.25" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#theme-gradient)" />
        </svg>
      </div>

      <h1 className="text-5xl font-black text-blue-900 drop-shadow z-10 text-center mb-6">
        Match Week Galleries
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 z-10 w-full max-w-5xl">
        {weeks.map((week: string) => (
          <Card key={week} className="transition transform hover:-translate-y-2 hover:shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="flex flex-col items-center py-8">
              <CardTitle className="mb-2 text-blue-800 text-2xl text-center">
                {week.replace(/-/g, " ")}
              </CardTitle>
              <Link
                className="inline-block mt-4 px-6 py-2 bg-blue-400 text-white font-bold rounded-full shadow hover:bg-blue-600 transition"
                href={`/photo-gallery/${week}`}
              >
                View Gallery
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
