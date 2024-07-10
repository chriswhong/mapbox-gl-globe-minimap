# mapbox-gl-globe-minimap

A Mapbox GL JS Plugin that displays a globe minimap showing the main map's center.

[Live Demo on Github Pages](https://chriswhong.github.io/mapbox-gl-globe-minimap/)

<img width="838" alt="Display_a_map_on_a_webpage" src="https://github.com/chriswhong/mapbox-gl-globe-minimap/assets/1833820/2ffb1824-ed07-4d56-89ad-dc574351d508">

You can customize the colors and size of minimap, and scale the marker.

<img width="840" alt="Display_a_map_on_a_webpage_and_index_html_—_globe-minimap" src="https://github.com/chriswhong/mapbox-gl-globe-minimap/assets/1833820/41813154-ac92-4516-b942-88114a61b55e">

## Install & Use

### When using a CDN:

Add the script tag to your HTML file:
```
<script src="https://cdn.jsdelivr.net/npm/mapbox-gl-globe-minimap@1.1.1/dist/bundle.js
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
        new mapboxgl.GlobeMinimap({
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

Import the module and assign it to `mapboxgl.GlobeMinimap`:

```
import GlobeMinimap from "mapbox-gl-globe-minimap";

mapboxgl.GlobeMinimap = GlobeMinimap

...
mapboxgl.accessToken = 'YOUR_ACCESS_TOKEN';
const map = new mapboxgl.Map({
    container: "map",
    center: [-74.5, 40], 
    zoom: 3,
});

map.on("load", function () {
    map.addControl(
        new mapboxgl.GlobeMinimap({
            landColor: "#4ebf6e",
            waterColor: "#8dcbe3"
        }),
        "bottom-right"
    );
});

```

## Options


| option      | type     | description                                    | default          |
| ----------- | -------- | ---------------------------------------------- | ---------------- |
| `globeSize `  | `Number` | Pixels to use for the diameter of the globe    | `82`             |
| `landColor`   | `String` | HTML color to use for land areas on the globe  | `'#bbb'`         |
| `waterColor`  | `String` | HTML color to use for water areas on the globe | `'#eee'`         |
| `markerColor` | `String` | HTML color to use for the center point marker  | `'#CC0000'`      |
| `markerSize`  | `Number` | Scale ratio for the center point marker        | `1`              |





