import React, { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import slugify from "slugify";

const { MAPBOX_TOKEN } = process.env;
mapboxgl.accessToken = MAPBOX_TOKEN;

const Map = ({ trailData, category, setCategory }) => {
  const [categoryMenu, setCategoryMenu] = useState(true);
  const mapContainer = useRef();
  const filterButton = useRef();
  const popUp = useRef();

  useEffect(() => {
    var bounds = [
      [6.708909, 45.213004], // Southwest coordinates
      [7.288934, 45.725356], // Northeast coordinates
    ];
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/satellite-streets-v11?optimize=true",
      center: [6.920564141919044, 45.455159501943314],
      zoom: 15,
      pitch: 45,
      bearing: -45,
      maxBounds: bounds,
    });

    function rotateCamera(timestamp) {
      // clamp the rotation between 0 -360 degrees
      // Divide timestamp by 100 to slow rotation to ~10 degrees / sec

      map.rotateTo((timestamp / 100) % 360, { duration: 2 });
      // Request the next frame of the animation.
      requestAnimationFrame(rotateCamera);
    }

    map.on("load", () => {
      map.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxZoom: 15,
        tolerance: 0,
      });
      map.setTerrain({ source: "mapbox-dem", exaggeration: 1 });
      map.addLayer({
        id: "sky",
        type: "sky",
        paint: {
          "sky-type": "atmosphere",
          "sky-atmosphere-sun": [0.0, 90.0],
          "sky-atmosphere-sun-intensity": 15,
        },
      });
      map.addSource("route", {
        type: "geojson",
        data: trailData,
      });
      map.addControl(new mapboxgl.NavigationControl());

      map.addLayer({
        id: "stroke-layer",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#fff",
          "line-width": 6,
        },
      });

      map.addLayer({
        id: "click-layer",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#fff",
          "line-opacity": 0.01,
          "line-width": 36,
          "line-offset": -2,
          "line-translate": [0, 0],
          "line-translate-anchor": "viewport",
        },
      });

      map.addLayer({
        id: "hover-layer",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#fff",
          "line-opacity": 0.01,
          "line-width": 10,
          // "line-offset": -2,
          // "line-translate": [0, 0],
          // "line-translate-anchor": "map",
        },
      });

      map.addLayer({
        id: "route-layer",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": [
            "match",
            ["get", "Colour"],
            "green",
            "#6BB28C",
            "blue",
            "#488BC2",
            "yellow",
            "#FFFF00",
            "red",
            "#FF5733",
            "black",
            "#333333",
            "double-black",
            "#333333",

            "#fff",
          ],
          "line-width": 4,
        },
      });

      map.addLayer({
        id: "symbols",
        type: "symbol",
        source: "route",
        layout: {
          "symbol-placement": "line-center",
          "text-font": ["Open Sans Regular"],
          "text-field": "{Nom}",
          "text-size": 14,
          "symbol-spacing": 50,
          "text-anchor": "center",
          "text-justify": "center",
        },
        paint: {
          "text-color": "#fff",
        },
      });

      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        })
      );

      console.log(map.getLayer("click-layer"));

      // Change the cursor to a pointer when the it enters a feature in the 'circle' layer.
      map.on("mouseenter", "hover-layer", function (e) {
        map.getCanvas(e).style.cursor = "pointer";
        map.setPaintProperty("hover-layer", "line-opacity", 0.8);
        map.setPaintProperty("hover-layer", "line-color", "#fff");
      });

      // Change it back to a pointer when it leaves.
      map.on("mouseleave", "hover-layer", function (e) {
        map.getCanvas(e).style.cursor = "";
        map.setPaintProperty("hover-layer", "line-opacity", 0.01);
      });

      //   onClick event to handle popup
      map.on("click", "click-layer", function (e) {
        let slug;
        slug = e.features[0].properties.Nom.toString();
        const url = slugify(slug, { lower: true, strict: true });
        console.log(`Slug is ${url}`);
        map.flyTo({
          center: e.lngLat,
        });
        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(
            `
            <div ref={popUp} class="h-full w-auto p-3">
            <div class="text-2xl font-semibold flex items-center justify-center">
            <p class="">${e.features[0].properties.Nom}</p>
            </div>
            <div class="flex items-center justify-center py-3">
            <p class="text-xl">${e.features[0].properties.Type}</p>
            </div>
            <div class="flex items-center justify-center py=1">
            <p class="text-lg">Difficulté: ${e.features[0].properties.Difficulté}</p>
            </div>
            <div class="flex items-center justify-center py-1">
            <p class="text-lg">Secteur: ${e.features[0].properties.Secteur}</p>
            </div>
            <div class="flex items-center justify-center pt-3">
            <a href="trails/${url}" class="w-full h-full">
            <button class="bg-gray-200 w-32 h-10 rounded">
            Go
            </button>
            </a>
            </div>
            </div>
            `
          )

          .addTo(map);
        console.log(e.lngLat);
      });

      const difficultyLevelsArray = [
        "Debutant",
        "Initie",
        "Confirme",
        "Expert",
        "Elite",
      ];

      // const uniquePubTypes = Array.from(new Set(difficultyLevelsArray));
      const filterElem = document.getElementById("difficultyLevelFilter");
      difficultyLevelsArray.forEach((difficultyType) => {
        const opt = document.createElement("option");
        opt.value = difficultyType;
        opt.innerText = difficultyType;
        filterElem.appendChild(opt);
      });
      filterElem.onchange = () => {
        const difficultyType = filterElem.value;
        const newGeoJSON = { ...trailData };
        if (difficultyType) {
          newGeoJSON.features = trailData.features.filter(
            (feature) => feature.properties.Difficulté === difficultyType
          );
        } else {
          newGeoJSON.features = [...trailData.features];
        }
        map.getSource("route").setData(newGeoJSON);
      };
    });

    const trailLevelsArray = ["DH", "VAE", "AM"];

    // const uniquePubTypes = Array.from(new Set(trailLevelsArray));
    const filterElem = document.getElementById("trailLevelFilter");
    trailLevelsArray.forEach((trailType) => {
      const opt = document.createElement("option");
      opt.value = trailType;
      opt.innerText = trailType;
      filterElem.appendChild(opt);
    });
    filterElem.onchange = () => {
      const trailType = filterElem.value;
      const newGeoJSON = { ...trailData };
      if (trailType) {
        newGeoJSON.features = trailData.features.filter(
          (feature) => feature.properties.Difficulté === trailType
        );
      } else {
        newGeoJSON.features = [...trailData.features];
      }
      map.getSource("route").setData(newGeoJSON);
    };
  }, []);

  return (
    <>
      <div
        id="map"
        ref={mapContainer}
        style={{ width: "100%", height: "100vh" }}
      >
        {" "}
        <div className=" mapboxgl-control-container text-lg p-3">
          <div className="mapboxgl-ctrl-top-left">
            <div className="mapboxgl-ctrl mapboxgl-ctrl-group">
              <select
                id="difficultyLevelFilter"
                name="difficultyLevelFilter"
                ref={filterButton}
                className="overlay  rounded border-gray-700 shadow-lg"
              >
                <option value="">Tout</option>
              </select>
            </div>
          </div>
        </div>
        <div className=" mapboxgl-control-container text-lg p-3">
          <div className="mapboxgl-ctrl-top-left">
            <div className="mapboxgl-ctrl mapboxgl-ctrl-group">
              <select
                id="trailLevelFilter"
                name="trailLevelFilter"
                ref={trailFilterButton}
                className="overlay  rounded border-gray-700 shadow-lg"
              >
                <option value="">Tout les Types</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Map;
