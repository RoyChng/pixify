import styles from "./HeroSection.module.css";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className={styles.hero}>
      <h1>Find images that inspire</h1>
      <div className={styles.hero__tags}>
        <i className="fa-solid fa-arrow-trend-up"></i>
        <Link to="/search/nature">
          <span className={styles.hero__tag}>Nature</span>
        </Link>
        <Link to="/search/animals">
          <span className={styles.hero__tag}>Animals</span>
        </Link>
        <Link to="/search/travel">
          <span className={styles.hero__tag}>Travel</span>
        </Link>
      </div>
    </section>
  );
}

export default HeroSection;
