import Link from 'next/link';
import { GetStaticProps } from 'next';
import { getAllWeeks } from '../../components/MatchWeekGallery';

interface PhotoGalleryIndexProps {
  weeks: string[];
}

export const getStaticProps: GetStaticProps<PhotoGalleryIndexProps> = async () => {
  const weeks = getAllWeeks(); // must return string[]
  return {
    props: { weeks },
  };
};

export default function PhotoGalleryIndex({ weeks }: PhotoGalleryIndexProps) {
  return (
    <div className="p-8">
      <h1 className="text-4xl mb-6">Matchweek Galleries</h1>
      <ul className="space-y-3">
        {weeks.map((week) => (
          <li key={week}>
            <Link
              href={`/photo-gallery/${encodeURIComponent(week.replace(/\s+/g, '-').toLowerCase())}`}
              className="text-blue-600 hover:underline"
            >
              {week}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
