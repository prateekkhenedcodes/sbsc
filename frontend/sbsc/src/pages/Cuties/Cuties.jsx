import React from 'react';
import { useState, useEffect } from 'react';
import ComicCard from '../../components/ComicCard';
import './Cuties.css';


export default function Browse() {
  const [entries, setEntries] = useState([]);

  // Mock data - replace with API call
  useEffect(() => {
    const mockData = [
      { id: 1, image: '/images/comic1.png', likes: 10 },
      { id: 2, image: '/images/comic2.png', likes: 5 },
      { id: 3, image: '/images/comic3.png', likes: 7 }
    ];
    setEntries(mockData);
  }, []);

  const handleLike = (id) => {
    // Update like count logic
  };

  return (
    <div className="Cute-container">
      <div className="entries-grid">
        {entries.map(entry => (
          <ComicCard
            key={entry.id}
            entry={entry}
            onLike={handleLike}
          />
        ))}
      </div>
    </div>
  );
}