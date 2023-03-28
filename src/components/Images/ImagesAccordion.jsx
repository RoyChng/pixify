import styles from "./ImagesAccordion.module.css";
import imageViewerStyles from "./ImagesViewer.module.css";
import { useState } from "react";
import ImagesViewer from "./ImagesViewer";
import { useEffect } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import useImgColumns from "../../hooks/useImgColumns";
import ImageColumns from "./ImageColumns";

const classMap = {
  "This Week": "this-week",
  "This Month": "this-month",
  "A Long Time Ago": "long-time-ago",
};

function ImageAccordion({ imageIDs, text, onClick }) {
  const [panelOpen, setPanelOpen] = useState(true);
  const { imgColumns, addImgs } = useImgColumns("NEW");

  const toggleAccordionHandler = () => {
    setPanelOpen((prevPanelOpen) => !prevPanelOpen);
  };

  let panelElement;
  const totalImages = imageIDs.length;

  useEffect(() => {
    addImgs(
      imageIDs.map((imageID) => {
        return {
          url: `https://images.pexels.com/photos/${imageID}/pexels-photo-${imageID}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`,
          id: imageID,
        };
      })
    );
  }, [imageIDs]);
  if (totalImages > 0) {
    const imgColumnsElements = (
      <ImageColumns imgColumns={imgColumns} fixedHeight="500px" />
    );
    panelElement = (
      <ImagesViewer
        onClick={onClick}
        imgColumnsElement={imgColumnsElements}
        thin={true}
        type={classMap[text]}
      />
    );
  } else {
    const noImgsElement = (
      <div className={styles["no-imgs"]}>
        <span>&nbsp; No images to show</span>
      </div>
    );
    panelElement = (
      <ImagesViewer
        imgColumnsElement={noImgsElement}
        noColumns={true}
        thin={true}
        type={classMap[text]}
      />
    );
  }

  return (
    <div className={styles["accordion__container"]}>
      <div
        className={`${styles.accordion} ${styles[classMap[text]]} ${
          panelOpen ? "" : styles["accordion--closed"]
        }`}
      >
        <span>{text}</span>
        <i
          className={`fa-solid fa-chevron-down ${styles["accordion__toggle"]} ${
            panelOpen ? "" : styles["accordion__toggle--up"]
          }`}
          onClick={toggleAccordionHandler}
        ></i>
      </div>
      <div
        className={`${styles.panel} ${
          panelOpen ? "" : styles["panel--hidden"]
        }`}
      >
        {panelElement}
      </div>
    </div>
  );
}

export default ImageAccordion;
