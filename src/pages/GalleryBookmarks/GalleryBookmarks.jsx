import styles from "./GalleryBookmarks.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import sortBookmarkedImages from "../../utils/sortBookmarkedImages";
import ImageAccordion from "../../components/Images/ImagesAccordion";

function GalleryBookmarks(props) {
  const bookmarkedImages = useSelector(
    (state) => state.savedImages.savedImages
  );
  const sortedBookmarkedImages = sortBookmarkedImages(bookmarkedImages);

  const accordions = [];

  function showModalHandler(event) {
    const imageID = parseInt(event.target.dataset?.id);

    if (!imageID) return;

    props.onShowImageViewer(imageID);
  }

  sortedBookmarkedImages.forEach((_, dateInterval) => {
    accordions.push(
      <ImageAccordion
        imageIDs={sortedBookmarkedImages
          .get(dateInterval)
          .map((image) => image.id)}
        text={dateInterval}
        key={dateInterval}
        onClick={showModalHandler}
      />
    );
  });

  console.log(accordions, "accordions");

  return (
    <section className={styles.bookmarks}>
      <Link to="/">{"<"} Back to home </Link>
      <h1>Saved Images</h1>
      {accordions}
    </section>
  );
}

export default GalleryBookmarks;
