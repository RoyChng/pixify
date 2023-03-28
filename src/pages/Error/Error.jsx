import { useRouteError } from "react-router-dom";
import MainNavigation from "../../components/Navigation/MainNavigation";
import styles from "./Error.module.css";

function Error() {
  const error = useRouteError();

  return (
    <main>
      <MainNavigation />
      <section className={styles.error__container}>
        <i class="fa-solid fa-triangle-exclamation"></i>
        <h1>An error has occured!</h1>
        <p>{error.message || "No error message provided"}</p>
      </section>
    </main>
  );
}

export default Error;
