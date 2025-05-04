import React from 'react';
import LikeButton from './LikeButton';
import './ComicCard.css';

const ComicCard = ({ imageSrc, likes }) => (
  <div className="comic-card">
    <img src={`${import.meta.env.BASE_URL}${imageSrc}`} alt="Comic" />
    <LikeButton initialLikes={likes} />
  </div>
);

export default ComicCard;
