// MovieDetails.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movie } from "../../types/Movie";
import { getMovieDetails, getMovieCast } from "../../services/tmdbServices";
import { FaStar, FaClock, FaCalendarAlt, FaFilm } from "react-icons/fa";

interface CastMember {
  id: string;
  name: string;
}

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  
  useEffect(() => {
    if (!id) return;
    getMovieDetails(id).then(setMovie);
  }, [id]);

  useEffect(() => {
    if (!id) return;
    getMovieCast(id).then(setCast);
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="p-4 text-white flex flex-col md:flex-row w-3/4 mx-auto">
      <img
        className="rounded shadow-lg w-full md:w-1/2 mx-auto"
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="flex flex-col justify-start lg:text-left text-center lg:ml-10 ml-10 mt-5 lg:mt-0">
        <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
        <p>{movie.overview}</p>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 w-full mt-10 items-center">
          <p>
            <FaStar className="inline-block mr-1" /> Rating:{" "}
            {movie.vote_average}
          </p>
          <p>
            <FaCalendarAlt className="inline-block mr-1" /> Release date:{" "}
            {movie.release_date}
          </p>
          <p>
            <FaClock className="inline-block mr-1" /> Runtime: {movie.runtime}{" "}
            minutes
          </p>
        </div>
        <p className="mt-10">
          <FaFilm className="inline-block mr-1" /> Genres:{" "}
          {movie.genres.map((genre) => genre.name).join(", ")}
        </p>
        <div className="mt-10">
          <h1 className="text-2xl font-bold mb-4 ml-2">Cast Members</h1>
          <div className="flex flex-wrap justify-center md:justify-start">
            {cast.slice(0, 10).map((actor) => (
              <p key={actor.id} className="m-2 text-center md:text-left">
                {actor.name}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
