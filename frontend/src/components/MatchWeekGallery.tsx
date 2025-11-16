import fs from 'fs';
import path from 'path';

const GALLERY_ROOT = path.join(process.cwd(), 'public/images/matchweek-gallery');

export function getAllWeeks() {
  return fs.readdirSync(GALLERY_ROOT).filter(name =>
    fs.lstatSync(path.join(GALLERY_ROOT, name)).isDirectory()
  );
}

export function getPhotosForWeek(week: string) {
  const folderPath = path.join(GALLERY_ROOT, week);
  if (!fs.existsSync(folderPath)) return [];

  return fs.readdirSync(folderPath).filter(file =>
    file.match(/\.(jpg|jpeg|png|webp)$/i)
  ).map(file => `/images/matchweek-gallery/${week}/${file}`);
}
