import { Link } from 'react-router-dom';
import './Home.css';

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