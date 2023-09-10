export const resolveURL = (url) => {
  if (!url) {
    return
  }

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  } else {
    return `${process.env.REACT_APP_BACKEND_URL}/${url}`;
  }
}



