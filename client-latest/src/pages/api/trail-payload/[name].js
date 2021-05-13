import { fetchAPI } from "@/utils/api";

export default async function handler(req, res) {
  const { name } = req.query;

  console.log(name);
  try {
    const data = await fetchAPI(`/coordonnees-de-pistes`);
    if (!data) {
      res.status(200).json("Not Found");
    }
    const URL = await data.GeoJson.url.toString();
    const trail = await fetch(URL);
    const trailData = await trail.json();
    const mapped = trailData.features.map((data) => {
      return data.properties;
    });
    const filtered = mapped.filter((data) => {
      return data.slug === name;
    });
    console.log(filtered);

    res.status(200).json(filtered);
  } catch (error) {
    console.log("error", error);
  }
}
