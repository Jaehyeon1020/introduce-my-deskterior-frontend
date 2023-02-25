export function getBoardTypeFromUrl(url) {
  if (url.includes("deskteriors")) {
    return "deskteriors";
  } else if (url.includes("honeyitems")) {
    return "honeyitems";
  } else {
    return "questions";
  }
}
