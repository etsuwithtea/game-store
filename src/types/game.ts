// Type สำหรับ Response จาก RAWG API
export type GamesResponse = {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: Game[];
};

// Type หลักสำหรับข้อมูลเกม
export type Game = {
  id: number;
  slug: string;
  name: string;
  released?: string;
  background_image: string;
  rating: number;
  rating_top: number;
  ratings: Rating[];
  ratings_count: number;
  metacritic?: number;
  playtime: number;
  genres: Genre[];
  platforms: PlatformDetail[];
  stores?: StoreDetail[];
  tags?: Tag[];
  esrb_rating?: ESRBRating;
  short_screenshots: Screenshot[];
  description_raw?: string; // จะได้จาก detail endpoint
};

export type Rating = {
  id: number;
  title: string;
  count: number;
  percent: number;
};

export type Genre = {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
};

export type PlatformDetail = {
  platform: Platform;
  released_at: string;
  requirements_en?: Requirements;
};

export type Platform = {
  id: number;
  name: string;
  slug: string;
};

export type Requirements = {
  minimum?: string;
  recommended?: string;
};

export type StoreDetail = {
  id: number;
  store: Store;
};

export type Store = {
  id: number;
  name: string;
  slug: string;
  domain: string;
  games_count: number;
  image_background: string;
};

export type Tag = {
  id: number;
  name: string;
  slug: string;
  language: string;
  games_count: number;
  image_background: string;
};

export type ESRBRating = {
  id: number;
  name: string;
  slug: string;
};

export type Screenshot = {
  id: number;
  image: string;
};