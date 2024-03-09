// services/tmdbServices.ts

import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.REACT_APP_API_AUTH_KEY;

export const getPopularMovies = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}`
    );
    return response.data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const searchMovies = async (searchTerm: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        searchTerm
      )}`
    );
    return response.data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getMovieDetails = async (id: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getMovieCast = async (id: string) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data.cast;
};

export const getGenres = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
    );
    return response.data.genres;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getMoviesByGenre = async (genreId: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
    );
    return response.data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getMovieReviews = async (movieId: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`
    );
    return response.data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};
