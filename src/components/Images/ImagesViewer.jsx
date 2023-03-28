import styles from "./ImagesViewer.module.css";

function ImagesViewer({
  imgColumnsElement,
  onClick,
  thin = false,
  type = false,
  noColumns = false,
}) {
  return (
    <div
      className={`${styles["imgs-viewer"]} ${
        thin ? styles["imgs-viewer-thin"] : ""
      } ${type ? styles[type] : ""} ${
        noColumns ? styles["imgs-viewer--columnless"] : ""
      }`}
      onClick={onClick}
    >
      {imgColumnsElement}
    </div>
  );
}

export default ImagesViewer;
