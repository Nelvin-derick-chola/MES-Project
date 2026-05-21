import React from 'react';
import { Star } from 'lucide-react';
import styles from './Testimonials.module.css';

interface RatingStarsProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: number;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  onRatingChange,
  readonly = false,
  size = 20,
}) => {
  const handleClick = (value: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(value);
    }
  };

  return (
    <div className={styles.ratingStars}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`${styles.starBtn} ${star <= rating ? styles.filled : ''} ${readonly ? styles.readonly : ''}`}
          onClick={() => handleClick(star)}
          disabled={readonly}
        >
          <Star
            size={size}
            fill={star <= rating ? '#f59e0b' : 'none'}
            color={star <= rating ? '#f59e0b' : '#cbd5e1'}
          />
        </button>
      ))}
    </div>
  );
};