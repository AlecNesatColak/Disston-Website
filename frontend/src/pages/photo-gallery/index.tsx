import Link from "next/link";
import { getAllWeeks } from "../../components/MatchWeekGallery";

function slugify(name: string) {
  return encodeURIComponent(name.replace(/\s+/g, "-").toLowerCase());
}

export async function getStaticProps() {
  const weeks = getAllWeeks();

  return {
    props: { weeks },
  };
}

export default function PhotoGalleryIndex({ weeks }) {
  return (
    <div className="p-8">
      <h1 className="text-4xl mb-6">Matchweek Galleries</h1>

      <ul className="space-y-4">
        {weeks.map((week) => (
          <li key={week}>
            <Link
              href={`/photo-gallery/${slugify(week)}`}
              className="text-blue-600 underline"
            >
              {week}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
