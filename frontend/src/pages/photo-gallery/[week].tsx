import { Galleria } from 'primereact/galleria';
import { getAllWeeks, getPhotosForWeek } from '../../components/MatchWeekGallery';
import { GetStaticPaths, GetStaticProps } from 'next';

// Convert folder name -> URL slug
function slugify(name: string) {
  return encodeURIComponent(name.replace(/\s+/g, '-').toLowerCase());
}

// Convert URL slug -> real folder name
function unslugify(slug: string) {
  return decodeURIComponent(slug); 
}

// Props
interface WeekGalleryProps {
  week: string;      // original folder name
  photos: string[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const weeks = getAllWeeks();

  return {
    paths: weeks.map((week: string) => ({
      params: { week: slugify(week) },    // safe URL version
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.week as string;
  const realFolderName = unslugify(slug);

  const photos = getPhotosForWeek(realFolderName);

  return {
    props: {
      week: realFolderName,
      photos,
    },
  };
};

export default function WeekGallery({ week, photos }: WeekGalleryProps) {
  const images = photos.map((src) => ({
    itemImageSrc: src,
    thumbnailImageSrc: src,
    alt: `${week} - photo`,
  }));

  const itemTemplate = (item: any) => (
    <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', height: 'auto', borderRadius: '12px' }} />
  );

  const thumbnailTemplate = (item: any) => (
    <img src={item.thumbnailImageSrc} alt={item.alt} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
  );

  const responsiveOptions = [
    { breakpoint: '1024px', numVisible: 5 },
    { breakpoint: '768px', numVisible: 3 },
    { breakpoint: '560px', numVisible: 1 },
  ];

  return (
    <div className="min-h-screen p-8 flex flex-col items-center gap-8 bg-gradient-to-b from-yellow-400 via-blue-500 to-yellow-300 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#1E90FF" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grad)" />
        </svg>
      </div>

      <h1 className="text-4xl font-bold text-white z-10">
        {week}
      </h1>

      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl p-6 z-10">
        <Galleria
          value={images}
          responsiveOptions={responsiveOptions}
          numVisible={5}
          circular
          showThumbnails
          showItemNavigators
          showIndicators
          item={itemTemplate}
          thumbnail={thumbnailTemplate}
        />
      </div>
    </div>
  );
}
