export function getBaseURL() {
  return window.location.origin;
}
export function buildURL(uri) {
  return new URL(uri || "/", getBaseURL());
}
