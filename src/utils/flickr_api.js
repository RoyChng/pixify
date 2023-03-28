const FLICKR_API_KEY = "55dfb70c16b067b9e202837837d847e7";
const FLICKR_ENDPOINT = "https://api.flickr.com/services/rest";

async function getPopularImages(pageNum = 1) {
  const response = await fetch(
    `${FLICKR_ENDPOINT}/?method=flickr.photos.getRecent&api_key=${FLICKR_API_KEY}&page=${pageNum}`
  );
  if (!response.ok) {
    throw new Error("Unable to fetch message");
  }

  try {
    const data = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, "text/xml");
    const photos = xml.querySelector("photos").children;

    const photoObjs = [];
    Array.from(photos).forEach((photo) => {
      photoObjs.push({
        url: `https://live.staticflickr.com/${photo.getAttribute(
          "server"
        )}/${photo.getAttribute("id")}_${photo.getAttribute("secret")}.jpg`,
        title: photo.getAttribute("title"),
      });
    });
    return photoObjs;
  } catch (err) {
    throw new Error(err || "Unable to parse image data. Try again!");
  }
}

async function searchImages(searchTerm, pageNum = 1) {
  const response = await fetch(
    `${FLICKR_ENDPOINT}?method=flickr.photos.search&api_key=${FLICKR_API_KEY}&page=${pageNum}&content_types=0&content_type=1&safe_search=1&tags=${searchTerm}&sort=relevance`
  );
  if (!response.ok) {
    throw new Error(
      "Unable to search for images, please try again in a moment!"
    );
  }

  try {
    const data = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, "text/xml");
    const photos = xml.querySelector("photos").children;

    const photoObjs = [];
    Array.from(photos).forEach((photo) => {
      photoObjs.push({
        url: `https://live.staticflickr.com/${photo.getAttribute(
          "server"
        )}/${photo.getAttribute("id")}_${photo.getAttribute("secret")}.jpg`,
        title: photo.getAttribute("title"),
      });
    });
    return photoObjs;
  } catch (err) {
    throw new Error(err.message || "Something went wrong!");
  }
}

export { getPopularImages, searchImages };
