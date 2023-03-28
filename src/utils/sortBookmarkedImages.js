function sortBookmarkedImages(bookmarkedImages) {
  const bookmarkedImagesCopy = [...bookmarkedImages];

  const now = Date.now() / 1000;
  const dateIntervals = new Map([
    ["This Week", [now - 604800, now]],
    ["This Month", [now - 2.628e6, now - 604800]],
    ["A Long Time Ago", [now, Infinity]],
  ]);

  const sortedBookmarkedImages = new Map([
    ["This Week", []],
    ["This Month", []],
    ["A Long Time Ago", []],
  ]);

  dateIntervals.forEach((_, dateInterval) => {
    bookmarkedImagesCopy.forEach((bookmarkedImage) => {
      if (
        bookmarkedImage.dateAdded >= dateIntervals.get(dateInterval)[0] &&
        bookmarkedImage.dateAdded <= dateIntervals.get(dateInterval)[1]
      ) {
        sortedBookmarkedImages.get(dateInterval).push(bookmarkedImage);
      }
    });
  });

  return sortedBookmarkedImages;
}

export default sortBookmarkedImages;
