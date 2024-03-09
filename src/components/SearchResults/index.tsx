// SearchResults.tsx
import React, { useEffect, useState } from "react";
import { Movie } from "../../types/Movie";
import { searchMovies } from "../../services/tmdbServices";
import MovieList from "../MovieList";

interface SearchResultsProps {
  searchTerm: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchTerm }) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    if (searchTerm) {
      searchMovies(searchTerm)
        .then((movies) => setMovies(movies))
        .catch((err) => console.error(err));
    } else {
      setMovies([]);
    }
  }, [searchTerm]);

  return (
    <div className="p-4 bg-gray-900 text-white">
      <h2 className="text-base font-bold mb-4 text-center">
        Search Results for "<span className="font-bold">{searchTerm}</span>" (
        <span className="font-bold">{movies.length}</span> movies found)
      </h2>
      <MovieList movies={movies} />
    </div>
  );
};

export default SearchResults;
