export function getStrapiURL(path = "") {
  const { API_URL, API_URL_PRODUCTION } = process.env;
  if (process.env.NODE_ENV === "development") {
    console.log("dev server");
    return `${API_URL || "http://localhost:1337"}${path}`;
  }
  if (process.env.NODE_ENV === "production") {
    console.log("production server");
    return `${API_URL || "http://localhost:1337"}${path}`;
  }
}

export async function fetchAPI(path) {
  const requestUrl = getStrapiURL(path);
  const response = await fetch(requestUrl, { mode: "no-cors" });
  const data = await response.json();
  return data;
}

export function fetchLocalApi(path = "") {
  const { API_URL_LOCAL } = process.env;
  if (process.env.NODE_ENV === "development") {
    return `${API_URL_LOCAL || "http://localhost:3000/api"}${path}`;
  }
  if (process.env.NODE_ENV === "production") {
    return `${API_URL_LOCAL || "https://bikeparktignes/api"}${path}`;
  }
}
