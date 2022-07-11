/*
 * Copyright 2020 Google LLC

 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 *  https://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { GoogleMapsOverlay } from '@deck.gl/google-maps';
import { ScatterplotLayer } from '@deck.gl/layers';

const googleMapsAPIKey = 'AIzaSyAqtfB2-Xq_nmc24MtAPESevjDX84cql0s';

loadJSAPI();
function runApp() {
  const map = initMap();
  const layerOptions = {
    id: 'scatterplot',
    data: './stations.json',
    getPosition: d => [parseFloat(d.longitude), parseFloat(d.latitude)],
    //getRadius: d => parseInt(d.capacity),
    stroked: true,
    getFillColor: [255, 133, 27],
    getLineColor: [255, 38, 27],
    radiusMinPixels: 5,
    radiusMaxPixels: 50
  };
  const scatterplotLayer = new ScatterplotLayer(layerOptions);
  const data_uri = {
    trees: 'https://data.cityofnewyork.us/resource/5rq2-4hqu.json'
  };
  const qs = {
    trees: '?$limit=65000&&boroname=Manhattan'
  };
  const scatterplotLayerTree = new ScatterplotLayer({
    id: 'scatterplot-tree-layer',
    data: data_uri.trees + qs.trees,
    getPosition: d => d.the_geom.coordinates,
    getFillColor: d => [51, 255, 60],
    getLineColor: d => [0, 0, 0],
    opacity: 0.8,
    stroked: true,
    filled: true,
    radiusScale: 6,
    radiusMinPixels: 1,
    radiusMaxPixels: 100,
    lineWidthMinPixels: 1
  })

  const googleMapsOverlay = new GoogleMapsOverlay({
    layers: [scatterplotLayer]
  });
  googleMapsOverlay.setMap(map);
}

/* API and map loader helpers */
function loadJSAPI() {
  const googleMapsAPIURI = `https://maps.googleapis.com/maps/api/js?key=${googleMapsAPIKey}&callback=runApp`;
  const script = document.createElement('script');

  script.src = googleMapsAPIURI;
  script.defer = true;
  script.async = true;

  window.runApp = runApp;
  document.head.appendChild(script);
}

function initMap() {
  const mapOptions = {
    center: { lat: 40.75097, lng: -73.98765 },
    zoom: 14
  };
  const mapDiv = document.getElementById('map');
  return new google.maps.Map(mapDiv, mapOptions);
}
