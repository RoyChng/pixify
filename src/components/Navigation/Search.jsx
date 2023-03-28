import styles from "./Search.module.css";

import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { searchHistoryActions } from "../../../store/searchHistory";

function Search(props) {
  const searchContainerRef = useRef();
  const searchInputRef = useRef();
  const searchSuggestionRef = useRef();
  const dispatch = useDispatch();
  const searchHistory = useSelector(
    (state) => state.searchHistory.searchHistory
  );
  const navigate = useNavigate();

  function submitHandler(event) {
    event.preventDefault();
    const searchValue = searchInputRef.current.value;
    dispatch(searchHistoryActions.addSearch({ search: searchValue }));
    navigate(`/search/${searchValue}`);
  }

  function searchFocusHandler() {
    const searchContainerRect =
      searchContainerRef.current.getBoundingClientRect();
    searchSuggestionRef.current.style.width = searchContainerRect.width + "px";
    searchSuggestionRef.current.style.top =
      searchContainerRect.bottom - 60 + "px";
    searchSuggestionRef.current.style.display = "flex";
  }

  function searchBlurHandler() {
    setTimeout(() => {
      searchSuggestionRef.current.style.display = "none";
    }, 200);
  }

  const searchHistoryLinks = (
    <>
      <span
        className={`${styles["suggestions__heading"]} ${styles["suggestion__heading-recent"]}`}
      >
        <i class="fa-solid fa-clock"></i>
        &nbsp; Recent
      </span>
      <div
        className={`${styles["suggestions-recent"]} ${styles["suggestions__options"]}`}
      >
        {searchHistory.map((searchTerm) => {
          return (
            <Link to={`/search/${searchTerm}`}>
              <span>{searchTerm}</span>
            </Link>
          );
        })}
      </div>
    </>
  );

  return (
    <div className={styles.search}>
      <form
        onSubmit={submitHandler}
        className={styles["search-container"]}
        ref={searchContainerRef}
      >
        <i class="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search places, people, anything!"
          defaultValue={props.searchTerm}
          onFocus={searchFocusHandler}
          onBlur={searchBlurHandler}
          ref={searchInputRef}
        />
      </form>
      <div className={styles["search__suggestions"]} ref={searchSuggestionRef}>
        {searchHistory.length > 0 ? searchHistoryLinks : ""}
        <span
          className={`${styles["suggestions__heading"]} ${styles["suggestion__heading-suggested"]}`}
        >
          <i class="fa-solid fa-arrow-trend-up"></i>
          &nbsp; Suggested
        </span>
        <div
          className={`${styles["suggestions-suggested"]} ${styles["suggestions__options"]}`}
        >
          <Link to="/search/nature">
            <span>Nature</span>
          </Link>
          <Link to="/search/animals">
            <span>Animals</span>
          </Link>
          <Link to="/search/travel">
            <span>Travel</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Search;
