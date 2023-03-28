import { useState } from "react";
import { IMAGE_COLUMNS_NUM } from "../data/constants";

export const addImgsTypes = {
  ADD: "ADD",
  NEW: "NEW",
};

const INITIAL_IMG_COLUMNS = [];

for (let i = 0; i < IMAGE_COLUMNS_NUM; i++) {
  INITIAL_IMG_COLUMNS.push([]);
}

function useImgColumns(type) {
  const [imgColumns, setImgColumns] = useState(INITIAL_IMG_COLUMNS);

  const addImgs = (imgs) => {
    console.log(imgColumns);
    const totalImages = imgs.length;
    const imagesPerColumn = Math.ceil(totalImages / IMAGE_COLUMNS_NUM);
    let prevImgColumnsCopy;

    switch (type) {
      case "ADD":
        setImgColumns((prevImgColumns) => {
          prevImgColumnsCopy = JSON.parse(JSON.stringify(prevImgColumns));
          for (let i = 0; i < IMAGE_COLUMNS_NUM; i++) {
            prevImgColumnsCopy[i].push(
              ...imgs.slice(i * imagesPerColumn, (i + 1) * imagesPerColumn)
            );
          }
          return prevImgColumnsCopy;
        });
        break;
      case "NEW":
        setImgColumns(() => {
          prevImgColumnsCopy = JSON.parse(JSON.stringify(INITIAL_IMG_COLUMNS));
          for (let i = 0; i < IMAGE_COLUMNS_NUM; i++) {
            prevImgColumnsCopy[i] = imgs.slice(
              i * imagesPerColumn,
              (i + 1) * imagesPerColumn
            );
          }
          return prevImgColumnsCopy;
        });
        break;
    }
  };

  return { imgColumns, addImgs };
}

export default useImgColumns;
