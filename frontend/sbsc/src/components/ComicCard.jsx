import React from 'react';
import LikeButton from './LikeButton';
import './ComicCard.css';

const ComicCard = ({ entry, onLike }) => {
  const { id, name, description, image, likes } = entry;

  const handleLikeClick = () => {
    onLike(id);
  };

  return (
    <div className="comic-card">
      <div className="image-container">
        <img
          src={`${import.meta.env.BASE_URL}${image}`}
          alt={description}
          className="comic-image"
        />
      </div>
      <div className="comic-details">
        <h3 className="comic-name">{name}</h3>
        <p className="comic-description">{description}</p>
        <div className="like-section">
          <LikeButton
            initialLikes={likes}
            onLike={handleLikeClick}
          />
        </div>
      </div>
    </div>
  );
};

export default ComicCard;