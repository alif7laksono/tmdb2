export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  poster_path: string;
  title: string;
  overview: string;
  id: number;
  vote_average: number;
  release_date: string;
  runtime: number;
  genres: Genre[];
}

export interface Review {
  id: string;
  author: string;
  content: string;
  url: string;
}
