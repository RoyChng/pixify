import styles from "./GalleryViewModal.module.css";
import errorStyles from "./../Error/Error.module.css";
import useHttp from "../../hooks/useHttp";
import { getImageDetails } from "../../utils/apis";
import Loader from "../../components/UI/Loader";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savedImagesActions } from "../../../store/savedImages";

async function download(filename) {
  const image = await fetch(filename);
  const imageBlob = await image.blob();
  const imageURL = URL.createObjectURL(imageBlob);

  const anchor = document.createElement("a");
  anchor.download = "pixify-img.jpg";
  anchor.href = imageURL;
  anchor.target = "_blank";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

function GalleryViewModal(props) {
  const { sendRequest, status, data, errorMessage } = useHttp(getImageDetails);
  const dispatch = useDispatch();
  const savedImages = useSelector((state) => state.savedImages.savedImages);
  const imageSaved = savedImages.find(
    (savedImage) => savedImage.id === props.imageID
  );

  function downloadHandler() {
    download(data.url);
  }

  function closeModalHandler() {
    props.onCloseModal();
  }

  function savePhotoID() {
    if (imageSaved) {
      dispatch(
        savedImagesActions.removeImage({
          id: props.imageID,
        })
      );
      return;
    }
    dispatch(
      savedImagesActions.addImage({
        id: props.imageID,
        dateAdded: Date.now() / 1000,
      })
    );
  }

  useEffect(() => {
    sendRequest(props.imageID);
  }, [props.imageID]);

  let content;

  switch (status) {
    case "completed":
      content = (
        <>
          <div className={styles.modal__info}>
            <h3 className={styles.modal__title}>By {data.photographer}</h3>
            <div className={styles.modal__actions}>
              <button className={styles.download} onClick={downloadHandler}>
                Download
              </button>
              <i
                className={`fa-${imageSaved ? "solid" : "regular"} fa-heart ${
                  styles.heart
                }`}
                onClick={savePhotoID}
              ></i>
            </div>
          </div>
          <img className={styles.img} src={data.url} />
        </>
      );
      break;
    case "pending":
      content = <Loader />;
      break;
    case "error":
      content = (
        <section className={errorStyles.error__container}>
          <i class="fa-solid fa-triangle-exclamation"></i>
          <h1>An error has occured!</h1>
          <p>{errorMessage || "No error message provided"}</p>
        </section>
      );
      break;
  }

  return (
    <div onClick={closeModalHandler} className={styles.backdrop}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button onClick={closeModalHandler} className={styles["close-modal"]}>
          &times;
        </button>
        {content}
      </div>
    </div>
  );
}

export default GalleryViewModal;
