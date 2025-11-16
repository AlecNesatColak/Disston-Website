import { Galleria } from 'primereact/galleria';

export default function WeekGallery({ week, photos }) {
    const images = photos.map((src) => ({
      itemImageSrc: src,
      thumbnailImageSrc: src,
      alt: `${week} - photo`,
    }));
  
    const itemTemplate = (item) => (
      <img
        src={item.itemImageSrc}
        alt={item.alt}
        style={{ width: '100%', height: 'auto', borderRadius: '12px' }}
      />
    );
  
    const thumbnailTemplate = (item) => (
      <img
        src={item.thumbnailImageSrc}
        alt={item.alt}
        style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
      />
    );
  
    const responsiveOptions = [
      { breakpoint: '1024px', numVisible: 5 },
      { breakpoint: '768px', numVisible: 3 },
      { breakpoint: '560px', numVisible: 1 },
    ];
  
    return (
      <div className="min-h-screen p-8 flex flex-col items-center gap-8
        bg-gradient-to-b from-yellow-400 via-blue-500 to-yellow-300
        relative overflow-hidden"
      >
        {/* Optional subtle background shapes */}
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
  
        <h1 className="text-4xl font-bold text-white z-10">{week.replace(/-/g, ' ')}</h1>
  
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