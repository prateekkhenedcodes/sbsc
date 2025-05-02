import React, { useState } from 'react';
import './LikeButton.css';

const LikeButton = ({ initialLikes }) => {
  const [likes, setLikes] = useState(initialLikes || 0);

  const handleLike = () => {
    setLikes(likes + 1);
    // TODO: call API to increment backend count
  };

  return (
    <button className="like-button" onClick={handleLike}>
      ❤️ {likes}
    </button>
  );
};

export default LikeButton;
