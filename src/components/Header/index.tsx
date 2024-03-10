import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getGenres, getMoviesByGenre } from "../../services/tmdbServices";
import { Genre, Movie } from "../../types/Movie";
import { FaSearch } from "react-icons/fa";
import MoviesByGenre from "../MoviesByGenre";

interface HeaderProps {
  onSearch: (searchTerm: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getGenres().then(setGenres);
  }, []);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(searchTerm);
    navigate("/");
  };

  const handleGenreSelect = async (genreId: number) => {
    const moviesByGenre = await getMoviesByGenre(genreId.toString());
    setMovies(moviesByGenre);
  };

  return (
    <header className="lg:w-4/5 w-full mx-auto">
      <div className="p-4 flex justify-between items-center bg-gray-900 shadow-md ">
        <h1 className="text-xl md:text-2xl font-bold mb-2 md:mb-0">
          <Link to="/" className="text-white no-underline hover:text-gray-200">
            TMDB Movies
          </Link>
        </h1>
        <form
          onSubmit={handleSearch}
          className="md:mt-0 md:ml-4 justify-center items-center flex"
        >
          <input
            className="w-full md:w-auto p-2 rounded-l bg-gray-700 text-white"
            type="search"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="p-2 rounded-r bg-gray-700 text-white hover:bg-gray-600 flex items-center justify-center"
          >
            <FaSearch className="text-2xl" />
          </button>
        </form>
      </div>
      <div className="flex lg:space-x-4 md:space-x-2 space-x-1 overflow-x-auto scrollbar-hide">
        {genres.map((genre: Genre) => (
          <button
            key={genre.id}
            onClick={() => handleGenreSelect(genre.id)}
            className="lg:font-semibold text-base text-white hover:text-gray-600 px-4 py-2 rounded"
          >
            {genre.name}
          </button>
        ))}
      </div>
      <MoviesByGenre movies={movies} />
    </header>
  );
};

export default Header;
