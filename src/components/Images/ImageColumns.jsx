import styles from "./ImagesViewer.module.css";

function ImageColumns({ imgColumns, fixedHeight = false }) {
  return imgColumns.map((imgColumn, i) => {
    return (
      <div className={styles["img-col"]} key={i}>
        {imgColumn.map((imgData) => {
          const returnValue = (
            <img
              src={imgData.url}
              style={{
                height: fixedHeight
                  ? fixedHeight
                  : 500 + Math.random() * 100 + "px",
              }}
              data-id={imgData.id}
              key={imgData.id}
            />
          );
          return returnValue;
        })}
      </div>
    );
  });
}

export default ImageColumns;
