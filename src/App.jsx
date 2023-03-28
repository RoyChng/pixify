import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import GalleryHome from "./pages/GalleryHome/GalleryHome";
import GallerySearch from "./pages/GallerySearch/GallerySearch";
import GalleryView from "./pages/GalleryView/GalleryViewModal";
import "./App.css";
import GalleryBookmarks from "./pages/GalleryBookmarks/GalleryBookmarks";
import Error from "./pages/Error/Error";
import ReactDOM from "react-dom";
import GalleryViewModal from "./pages/GalleryView/GalleryViewModal";
import { useEffect, useState } from "react";
import { useSelector, useDispatch, Provider } from "react-redux";
import { savedImagesActions } from "../store/savedImages";
import { searchHistoryActions } from "../store/searchHistory";

function App() {
  const [showImage, setShowImage] = useState(false);
  const [showImageID, setShowImageID] = useState(null);
  const savedImages = useSelector((state) => state.savedImages);
  const searchHistory = useSelector((state) => state.searchHistory);
  const dispatch = useDispatch();

  useEffect(() => {
    if (savedImages.changed)
      localStorage.setItem(
        "savedImages",
        JSON.stringify({ savedImages: savedImages.savedImages })
      );
  }, [savedImages]);

  useEffect(() => {
    if (searchHistory.changed)
      localStorage.setItem(
        "searchHistory",
        JSON.stringify({ searchHistory: searchHistory.searchHistory })
      );
  }, [searchHistory]);

  useEffect(() => {
    const searchHistoryState = JSON.parse(
      localStorage.getItem("searchHistory")
    );
    const savedImagesState = JSON.parse(localStorage.getItem("savedImages"));

    dispatch(
      searchHistoryActions.replaceSearchHistory({
        searchHistory: searchHistoryState?.searchHistory,
      })
    );
    dispatch(
      savedImagesActions.replaceSavedImages({
        savedImages: savedImagesState?.savedImages,
      })
    );
  }, []);

  const showImageViewerHandler = (imageID) => {
    setShowImage(true);
    setShowImageID(imageID);
  };

  const closeModalHandler = () => {
    setShowImage(false);
    setShowImageID(null);
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" errorElement={<Error />} element={<Layout />}>
        <Route
          index
          element={<GalleryHome onShowImageViewer={showImageViewerHandler} />}
        />
        <Route
          path="/search/:searchTerm"
          element={<GallerySearch onShowImageViewer={showImageViewerHandler} />}
        />
        <Route
          path="/saved"
          element={
            <GalleryBookmarks onShowImageViewer={showImageViewerHandler} />
          }
        />
        <Route path="/view/:imageID" element={<GalleryView />} />
        <Route path="*" element={<p>Page not found!</p>}></Route>
      </Route>
    )
  );

  return (
    <>
      {showImage &&
        ReactDOM.createPortal(
          <GalleryViewModal
            onCloseModal={closeModalHandler}
            imageID={showImageID}
          />,
          document.getElementById("modal-root")
        )}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
