import styles from "./MainNavigation.module.css";
import { Link, useParams } from "react-router-dom";
import logo from "/imgs/logo.png";
import Search from "./Search";

function MainNavigation() {
  const { searchTerm } = useParams();

  return (
    <header>
      <nav className={styles.nav}>
        <Link to="/">
          <img className={styles.nav__img} src={logo} alt="Pixify Logo"></img>
        </Link>
        <Search searchTerm={searchTerm} />
        <Link className={styles.nav__link} to="/saved">
          Saved
        </Link>
      </nav>
    </header>
  );
}

export default MainNavigation;
