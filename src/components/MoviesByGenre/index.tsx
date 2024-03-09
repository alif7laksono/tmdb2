// MoviesByGenre.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Movie } from "../../types/Movie";

interface MoviesByGenreProps {
  movies: Movie[];
}

const MoviesByGenre: React.FC<MoviesByGenreProps> = ({ movies }) => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto">
      {movies.map((movie) => (
        <div key={movie.id} className="bg-transparent rounded-lg shadow-md p-4">
          <Link to={`/movie/${movie.id}`} target="_blank">
            <img
              className="w-full h-auto rounded-t-lg"
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
            <h2 className="text-white font-semibold mt-2">{movie.title}</h2>
            <p className="text-gray-300 mt-1 line-clamp-3">{movie.overview}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MoviesByGenre;
