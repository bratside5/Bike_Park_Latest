import React, { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import * as turf from "@turf/turf";

const { MAPBOX_TOKEN } = process.env;
mapboxgl.accessToken = MAPBOX_TOKEN;

const SingleMap = ({ geoJsonCoords }) => {
  const mapContainer = useRef();
  const flyStartButton = useRef();
  const flyEndButton = useRef();
  console.log(geoJsonCoords);

  const makeValidGeoJson = {
    type: "FeatureCollection",
    features: [...geoJsonCoords],
  };

  const line = makeValidGeoJson;
  const lineLength = turf.length(line, { units: "meters" });
  const formatLength = `${lineLength.toString().slice(0, 6)}m`;
  console.log(formatLength);

  const getCenter = makeValidGeoJson;
  const center = turf.center(getCenter);

  const flattenGeojson = makeValidGeoJson;
  const multiGeometry = turf.multiPolygon(
    flattenGeojson.features[0].geometry.coordinates[0]
  );
  const flatten = turf.flatten(multiGeometry);
  console.log(flatten);

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
  console.log(makeValidGeoJsonStartEnd);

  useEffect(() => {
    var bounds = [
      [6.82813, 45.398812], // Southwest coordinates
      [6.953635, 45.543389], // Northeast coordinates
    ];
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/satellite-streets-v11?optimize=true",
      center: center.geometry.coordinates,
      zoom: 14,
      pitch: 0,
      //   bearing: -45,
      maxBounds: bounds,
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
      map.addSource("route", {
        type: "geojson",
        data: makeValidGeoJson,
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
          "line-width": 10,
        },
      });

      map.loadImage(
        "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
        function (error, image) {
          if (error) throw error;
          map.addImage("custom-marker", image);
        }
      );

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

      const flyToStart = document
        .getElementById("flyStart")
        .addEventListener("click", function () {
          const isAtStart = false;
          const target = isAtStart ? end : start;
          map.flyTo({
            center: start,
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
          className="border border-gray-500 bg-blue-500 text-gray-50 rounded px-6 py-1"
          id="flyStart"
          ref={flyStartButton}
        >
          Aller au point de départ
        </button>
        <button
          className="border border-gray-500 bg-blue-500 text-gray-50 rounded px-6 py-1"
          id="flyEnd"
          ref={flyEndButton}
        >
          Aller au point d'arrivée
        </button>
      </section>
    </>
  );
};

export default SingleMap;
