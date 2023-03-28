import { searchImages } from "../../utils/apis";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import Loader from "../../components/UI/Loader";
import ImagesViewer from "../../components/Images/ImagesViewer";
import useImgColumns, { addImgsTypes } from "../../hooks/useImgColumns";
import useHttp from "../../hooks/useHttp";
import styles from "./GallerySearch.module.css";
import ImageColumns from "../../components/Images/ImageColumns";

function GallerySearch(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { sendRequest, status, data, errorMessage } = useHttp(searchImages);
  const { imgColumns, addImgs } = useImgColumns(addImgsTypes.NEW);
  const { searchTerm } = useParams();

  function showModalHandler(event) {
    const imageID = parseInt(event.target.dataset?.id);

    if (!imageID) return;

    props.onShowImageViewer(imageID);
  }

  let page = parseFloat(searchParams.get("page"));
  useEffect(() => {
    if (!Number.isInteger(page) || page < 1) {
      setSearchParams({ page: 1 });
      page = 1;
    }
  });

  useEffect(() => {
    sendRequest(page, searchTerm);
  }, [page, searchTerm]);

  useEffect(() => {
    if (data) addImgs(data);
  }, [data]);

  function changePageHandler(type) {
    switch (type) {
      case "next":
        setSearchParams({ page: page + 1 });
        break;
      case "prev":
        setSearchParams({ page: page > 1 ? page - 1 : 1 });
        break;
    }
  }

  let element;

  const imgColumnsElement = <ImageColumns imgColumns={imgColumns} />;
  switch (status) {
    case "completed":
      element = (
        <>
          <ImagesViewer
            imgColumnsElement={imgColumnsElement}
            onClick={showModalHandler}
          />
          <div className={styles.page__actions}>
            <span
              className={`${styles["page__actions--prev"]} ${
                page > 1 ? "" : styles.hidden
              }`}
              onClick={changePageHandler.bind(null, "prev")}
            >
              Prev
            </span>
            <span className={styles["page__actions--page-num"]}>{page}</span>
            <span
              className={styles["page__actions--next"]}
              onClick={changePageHandler.bind(null, "next")}
            >
              Next
            </span>
          </div>
        </>
      );
      break;
    case "pending":
      element = <Loader />;
      break;
    case "error":
      throw new Error(errorMessage);
  }

  return <div className={styles.search}>{element}</div>;
}

export default GallerySearch;
