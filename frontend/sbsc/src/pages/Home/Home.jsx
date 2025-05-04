import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Rate My Face!</h1>
        <p>The internet's most brutally honest appearance rating platform</p>
        <div className="cta-buttons">
          <Link to="/app/upload" className="cta-button">Submit Your Face</Link>
          <Link to="/app/explore/girls" className="cta-button">Browse Entries</Link>
        </div>
      </div>
    </section>
  );
}