import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import Header from "./components/Header";
import SearchResults from "./components/SearchResults";
import { Movie } from "./types/Movie";
import { getPopularMovies } from "./services/tmdbServices";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getPopularMovies()
      .then((movies) => {
        setMovies(movies);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch movies");
        setLoading(false);
      });
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    navigate("/");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-gray-900">
      <Header onSearch={handleSearch} />
      <Routes>
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route
          path="/"
          element={
            searchTerm ? (
              <SearchResults searchTerm={searchTerm} />
            ) : (
              <MovieList movies={movies} />
            )
          }
        />
      </Routes>
    </div>
  );
}
