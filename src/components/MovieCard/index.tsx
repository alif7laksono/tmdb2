// MovieCard.tsx
import React from "react";
import { Movie } from "../../types/Movie";
import { Link } from "react-router-dom";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => (
  <div className="bg-transparent rounded-lg shadow-md p-4">
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
);

export default MovieCard;
