const PEXELS_ENDPOINT = "https://api.pexels.com/v1";
const PEXLES_API_KEY =
  "563492ad6f91700001000001ce238fd5e2f949fb8b61d704f960c484";
const IMAGES_PER_PAGE = 78;

async function getPopularImages(pageNum = 1) {
  const response = await fetch(
    `${PEXELS_ENDPOINT}/curated?per_page=${IMAGES_PER_PAGE}&page=${pageNum}`,
    {
      headers: {
        Authorization: PEXLES_API_KEY,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Unable to fetch images. Try again in a moment!");
  }
  const data = await response.json();
  const photoObjs = [];

  data.photos.forEach((photo) => {
    photoObjs.push({
      url: photo.src.large,
      id: photo.id,
    });
  });

  return photoObjs;
}

async function searchImages(pageNum = 1, searchTerm = "") {
  const response = await fetch(
    `${PEXELS_ENDPOINT}/search?per_page=${IMAGES_PER_PAGE}&page=${pageNum}&query=${searchTerm}`,
    {
      headers: {
        Authorization: PEXLES_API_KEY,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Unable to fetch images. Try again in a moment!");
  }
  const data = await response.json();
  const photoObjs = [];

  data.photos.forEach((photo) => {
    photoObjs.push({
      url: photo.src.large,
      id: photo.id,
    });
  });

  return photoObjs;
}

async function getImageDetails(id) {
  const response = await fetch(`${PEXELS_ENDPOINT}/photos/${id}`, {
    headers: {
      Authorization: PEXLES_API_KEY,
    },
  });
  if (!response.ok) {
    throw new Error("Unable to fetch images. Try again in a moment!");
  }
  const data = await response.json();
  if (data.status === 404) {
    throw new Error("Photo not found.");
  }
  return {
    url: data.src.large2x,
    photographer: data.photographer,
  };
}

async function getAllImageDetails(ids) {
  const images = [];

  if (ids.length === 0) return images;

  const requests = ids.map((id) =>
    fetch(`${PEXELS_ENDPOINT}/photos/${id}`, {
      headers: {
        Authorization: PEXLES_API_KEY,
      },
    })
  );

  const responses = await Promise.all(requests);

  const datas = await Promise.all(responses.map((response) => response.json()));

  return datas.map((data) => ({
    url: data.src.large2x,
    photographer: data.photographer,
    id: data.id,
  }));
}

export { getPopularImages, searchImages, getImageDetails, getAllImageDetails };
