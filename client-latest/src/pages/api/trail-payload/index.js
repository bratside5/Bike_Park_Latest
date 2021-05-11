import { fetchAPI } from "@/utils/api";

export default async function handler(req, res) {
  try {
    const data = await fetchAPI(`/coordonnees-de-pistes`);
    if (!data) {
      res.status(200).json("Not Found");
    }
    const URL = await data.GeoJson.url.toString();
    const trail = await fetch(URL);
    const trailData = await trail.json();

    res.status(200).json(trailData);
    return URL;
  } catch (error) {
    console.log("error", error);
  }
}
