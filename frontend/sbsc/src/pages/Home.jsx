import React from 'react';
import ComicCard from '../components/ComicCard';
import './Home.css';

// Dummy image list - ideally fetched from API
const comics = [
  { id: 1, src: '/images/comic1.png', likes: 10 },
  { id: 2, src: '/images/comic2.png', likes: 5 },
  { id: 3, src: '/images/comic3.png', likes: 7 }
];

const Home = () => (
  <main className="home-container">
    {comics.map((comic) => (
      <ComicCard key={comic.id} imageSrc={comic.src} likes={comic.likes} />
    ))}
  </main>
);

export default Home;
