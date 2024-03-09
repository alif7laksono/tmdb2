// MovieList.tsx
import React from "react";
import MovieCard from "../MovieCard";
import { Movie } from "../../types/Movie";

interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => (
  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:w-4/5 w-full mx-auto">
    {movies &&
      movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
  </div>
);

export default MovieList;
