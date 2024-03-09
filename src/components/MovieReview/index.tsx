// MovieReviews.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../services/tmdbServices";
import { Review } from "../../types/Movie";

interface RouteParams {
  movieId: string;
  [key: string]: string;
}

const MovieReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const { movieId } = useParams<RouteParams>();

  useEffect(() => {
    getMovieReviews(movieId ?? "")
      .then((reviews) => setReviews(reviews))
      .catch((err) => console.error(err));
  }, [movieId]);

  return (
    <div>
      {reviews.map((review) => (
        <div key={review.id}>
          <h2>{review.author}</h2>
          <p>{review.content}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieReviews;
