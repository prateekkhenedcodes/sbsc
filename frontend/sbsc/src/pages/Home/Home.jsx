import { Link } from 'react-router-dom';
import './Home.css';
import top1Img from '../../assets/cutie.png'; // Replace with your actual image path

export default function Home() {
  return (
    <section className="hero">
      <div className="sub-header">
        <span className="sub-text">DAILY COMICS, WEEKLY ANIMATIONS & MORE!</span>
        <div className="social-icons">
          <a href="#"><i className="fab fa-facebook"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-youtube"></i></a>
        </div>
      </div>

      <div className="top-container">
        <div className="top-image-wrapper">
          <img src={top1Img} alt="Top 1 Contestant" className="top-image" />
        </div>
        <h2 className="top-label">Top 1 in the Contest</h2>
      </div>

      <div className="hero-content">
        <h1>Wassup!!!!</h1>
        <p>The internet's most brutally honest appearance rating platform</p>
        <div className="cta-buttons">
          <Link to="/app/upload" className="cta-button">Submit Your Face</Link>
          <Link to="/app/explore/girls" className="cta-button">Browse Entries</Link>
        </div>
      </div>
    </section>
  );
}
