export function getBoardTypeFromUrl(url) {
  if (url.includes("deskterior")) {
    return "deskterior";
  } else if (url.includes("honeyitems")) {
    return "honeyitems";
  } else {
    return "questions";
  }
}
