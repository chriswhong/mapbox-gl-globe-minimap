# mapbox-gl-globe-minimap

A Mapbox GL JS Plugin that displays a globe minimap showing the main map's center.

[Live Demo on Github Pages](https://chriswhong.github.io/mapbox-gl-globe-minimap/)

<img width="786" alt="Display_a_map_on_a_webpage-4" src="https://github.com/user-attachments/assets/4d0be846-47bb-438d-8a27-145036056be0">

You can customize the colors and size of minimap, and scale the marker.

<img width="840" alt="Display_a_map_on_a_webpage_and_index_html_—_globe-minimap" src="https://github.com/chriswhong/mapbox-gl-globe-minimap/assets/1833820/41813154-ac92-4516-b942-88114a61b55e">

## Install & Use

### When using a CDN:

Add the script tag to your HTML file after importing Mapbox GL JS:

```
<script src="https://cdn.jsdelivr.net/npm/mapbox-gl-globe-minimap@1.2.0/dist/bundle.js
"></script>
```

On Map load, add the control. You can specify the position of the globe using the second argument of `addControl()`:

```
mapboxgl.accessToken = 'YOUR_ACCESS_TOKEN';
const map = new mapboxgl.Map({
    container: "map",
    center: [-74.5, 40],
    zoom: 3,
});

map.on("load", function () {
    map.addControl(
        new GlobeMinimap({
            landColor: "#4ebf6e",
            waterColor: "#8dcbe3"
        }),
        "bottom-right"
    );
});
```

### When using module bundler:

```
npm i mapbox-gl-globe-minimap
```

Import the module and add it to the map with `addControl()`

```
import GlobeMinimap from "mapbox-gl-globe-minimap";

...
mapboxgl.accessToken = 'YOUR_ACCESS_TOKEN';
const map = new mapboxgl.Map({
    container: "map",
    center: [-74.5, 40],
    zoom: 3,
});

map.on("load", function () {
    map.addControl(
        new GlobeMinimap({
            landColor: "#4ebf6e",
            waterColor: "#8dcbe3"
        }),
        "bottom-right"
    );
});

```

## Options

| option        | type     | description                                    | default                |
| ------------- | -------- | ---------------------------------------------- | ---------------------- |
| `globeSize `  | `Number` | Pixels to use for the diameter of the globe    | `82`                   |
| `landColor`   | `String` | HTML color to use for land areas on the globe  | `'white'`              |
| `waterColor`  | `String` | HTML color to use for water areas on the globe | `'rgba(30 40 70/60%)'` |
| `markerColor` | `String` | HTML color to use for the center point marker  | `'#ff2233'`            |
| `markerSize`  | `Number` | Scale ratio for the center point marker        | `1`                    |

## Attribution

This is a modern incarnation of [`leaflet-globeminimap`](https://github.com/chriswhong/leaflet-globeminimap), a leaflet plugin I made a while back. That plugin was inspired by the globe minimap used by the [Google Earth View](https://chromewebstore.google.com/detail/earth-view-from-google-ea/bhloflhklmhfpedakmangadcdofhnnoh?hl=en) Chrome plugin.

Plugin architecture was derived from `https://github.com/aesqe/mapboxgl-minimap`, and the modern `d3.geoOrthographic` implementation is based on [this observable notebook](https://observablehq.com/@d3/rotating-orthographic).
