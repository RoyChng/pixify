import HeroSection from "./HeroSection";
import { useState, useEffect } from "react";
import ImagesViewer from "../../components/Images/ImagesViewer";
import useHttp from "../../hooks/useHttp";
import { getPopularImages } from "../../utils/apis";
import Loader from "../../components/UI/Loader";
import useImgColumns, { addImgsTypes } from "../../hooks/useImgColumns";
import ImageColumns from "../../components/Images/ImageColumns";
import styles from "./GalleryHome.module.css";

function GalleryHome(props) {
  const [pageNum, setPageNum] = useState(1);
  const { sendRequest, status, data, errorMessage } = useHttp(getPopularImages);
  const { imgColumns, addImgs } = useImgColumns(addImgsTypes.ADD);

  function showModalHandler(event) {
    const imageID = parseInt(event.target.dataset?.id);

    if (!imageID) return;

    props.onShowImageViewer(imageID);
  }

  useEffect(() => {
    sendRequest(pageNum);
  }, [pageNum]);

  useEffect(() => {
    if (status === "completed") addImgs(data);
  }, [data]);

  function clickHandler() {
    setPageNum((prevPageNum) => prevPageNum + 1);
  }

  let imagesElement;
  console.log(imgColumns);
  const imgColumnsElement = <ImageColumns imgColumns={imgColumns} />;
  switch (status) {
    case "completed":
      imagesElement = (
        <>
          <ImagesViewer
            onClick={showModalHandler}
            imgColumnsElement={imgColumnsElement}
          />
          <div className={styles.actions}>
            <button onClick={clickHandler} className={styles["btn-more"]}>
              Show More
            </button>
          </div>
        </>
      );
      break;
    case "pending":
      imagesElement = (
        <>
          <ImagesViewer
            onClick={showModalHandler}
            imgColumnsElement={imgColumnsElement}
          />
          <Loader />
        </>
      );
      break;
    case "error":
      throw new Error(errorMessage);
  }

  return (
    <>
      <HeroSection />
      {imagesElement}
    </>
  );
}

export default GalleryHome;
