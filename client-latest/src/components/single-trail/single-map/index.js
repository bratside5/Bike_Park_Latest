import React, { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import * as turf from "@turf/turf";

const { MAPBOX_TOKEN } = process.env;
mapboxgl.accessToken = MAPBOX_TOKEN;

const SingleMap = ({ geoJsonCoords, title, setTrailLength }) => {
  const mapContainer = useRef();
  const flyStartButton = useRef();
  const flyEndButton = useRef();
  console.log(geoJsonCoords);
  console.log(title);

  const makeValidGeoJson = {
    type: "FeatureCollection",
    features: [...geoJsonCoords],
  };

  const line = makeValidGeoJson;
  const lineLength = turf.length(line, { units: "meters" });
  const formatLength = `${lineLength.toString().slice(0, 6)}m`;

  const getCenter = makeValidGeoJson;
  const center = turf.center(getCenter);

  const getStartEndCoords = makeValidGeoJson;
  const getLength = getStartEndCoords.features[0].geometry.coordinates.length;
  const start = getStartEndCoords.features[0].geometry.coordinates[0];
  const end = getStartEndCoords.features[0].geometry.coordinates[getLength - 1];

  const makeValidGeoJsonStartEnd = {
    type: "FeatureCollection",
    features: [
      {
        type: "feature",
        geometry: [
          {
            type: "Point",
            position: "start",
            coordinates: [...start],
          },
          {
            type: "Point",
            position: "end",
            coordinates: [...end],
          },
        ],
      },
    ],
  };

  useEffect(() => {
    setTrailLength(formatLength);
    var bounds = [
      [6.82813, 45.398812], // Southwest coordinates
      [6.953635, 45.543389], // Northeast coordinates
    ];
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/satellite-streets-v11?optimize=true",
      center: center.geometry.coordinates,
      zoom: 13,
      pitch: 0,
      //   bearing: -45,
      // maxBounds: bounds,
    });

    map.on("load", () => {
      map.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxZoom: 16,
        tolerance: 0,
      });
      map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });
      map.addLayer({
        id: "sky",
        type: "sky",
        paint: {
          "sky-type": "atmosphere",
          "sky-atmosphere-sun": [0.0, 90.0],
          "sky-atmosphere-sun-intensity": 15,
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

      map.addSource("start-point", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: start,
              },
            },
          ],
        },
      });

      map.addSource("end-point", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: end,
              },
            },
          ],
        },
      });

      map.addSource("route", {
        type: "geojson",
        data: makeValidGeoJson,
      });

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

      map.addLayer({
        id: "marker-start",
        type: "symbol",
        source: "start-point",
        layout: {
          "icon-image": "custom-marker",
          "icon-size": 1,
          "icon-anchor": "bottom",
        },
      });

      map.addLayer({
        id: "marker-end",
        type: "symbol",
        source: "end-point",
        layout: {
          "icon-image": "custom-marker",
          "icon-size": 1,
          "icon-anchor": "bottom",
        },
      });

      map.loadImage(
        "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
        function (error, image) {
          if (error) throw error;
          map.addImage("custom-marker", image);
        }
      );

      const flyToStart = document
        .getElementById("flyStart")
        .addEventListener("click", function () {
          const isAtStart = false;
          const target = isAtStart ? end : start;

          map.flyTo({
            center: start,
            around: start,
            zoom: 16,
            speed: 0.2,
            curve: 3,
            // bearing: 10,
            pitch: 55,
            easing: function (t) {
              return t;
            },
            essential: true,
          });

          map.on("moveend", function () {
            console.log("A moveend event occurred.");
          });
        });
      const flyToEnd = document
        .getElementById("flyEnd")
        .addEventListener("click", function () {
          const isAtStart = false;
          const target = isAtStart ? end : start;
          map.flyTo({
            center: end,
            zoom: 16,
            speed: 0.2,
            curve: 3,
            // bearing: 10,
            pitch: 55,
            easing: function (t) {
              return t;
            },
            essential: true,
          });
        });
    });
  }, []);

  return (
    <>
      <div
        id="map"
        ref={mapContainer}
        style={{ width: "100%", height: "60vh" }}
      ></div>
      <section className="h-auto w-full flex items-center justify-evenly py-3 px-3 bg-gray-100">
        {" "}
        <button
          className="border border-gray-500 mr-3 bg-blue-500 text-gray-50 rounded px-6 py-1"
          id="flyStart"
          ref={flyStartButton}
        >
          Aller au point de d??part
        </button>
        <button
          className="border border-gray-500 ml-3 bg-blue-500 text-gray-50 rounded px-6 py-1"
          id="flyEnd"
          ref={flyEndButton}
        >
          Aller au point d'arriv??e
        </button>
      </section>
    </>
  );
};

export default SingleMap;
