import Link from "next/link";
import path from "path";
import fs from "fs";

export async function getStaticProps() {
  const GALLERY_ROOT = path.join(process.cwd(), "public/images/matchweek-gallery");

  const weeks = fs.readdirSync(GALLERY_ROOT).filter(name =>
    fs.lstatSync(path.join(GALLERY_ROOT, name)).isDirectory()
  );

  return { props: { weeks } };
}

export default function GalleryIndex({ weeks }) {
  return (
    <div>
      <h1>Match Week Galleries</h1>
      <ul>
        {weeks.map(week => (
          <li key={week}>
            <Link href={`/photo-gallery/${week}`}>{week}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
