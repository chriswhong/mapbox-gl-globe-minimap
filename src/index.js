import * as d3 from "d3";
import * as topojson from "topojson";
import world from "./world.js";
import mapboxgl from "mapbox-gl";

const CONTAINER_CLASSNAME = ".mapboxgl-ctrl-globe-minimap";

function GlobeMinimap(options) {
  Object.assign(this.options, options);

  this._parentMap = null;
}

GlobeMinimap.prototype = Object.assign(
  {},
  mapboxgl.NavigationControl.prototype,
  {
    options: {
      id: "mapboxgl-globe-minimap",
      globeSize: 82,
      landColor: "#bbb",
      waterColor: "#eee",
      markerColor: "#CC0000",
      markerSize: 1, // scale the marker to be larger or smaller
    },

    onAdd: function (parentMap) {
      this._parentMap = parentMap;

      this._container = this._createContainer(parentMap);

      this._load();
      return this._container;
    },

    _load: async function () {
      const parentMap = this._parentMap;

      // create an svg element for the marker icon
      // marker icon from fontawesome
      // https://upload.wikimedia.org/wikipedia/commons/9/93/Map_marker_font_awesome.svg
      const markerDimensions = 16;

      const { globeSize, markerSize, markerColor } = this.options;

      d3.select(CONTAINER_CLASSNAME)
        .append("svg")
        .attr("width", globeSize)
        .attr("height", globeSize)
        .attr("style", "position: absolute; left: 0; top: 0;")
        .append("path") // marker icon
        .attr(
          "d",
          "M5.36018 5.33333C5.36018 4.59722 5.61972 3.96875 6.13881 3.44792C6.65789 2.92708 7.28426 2.66667 8.0179 2.66667C8.75154 2.66667 9.3779 2.92708 9.89699 3.44792C10.4161 3.96875 10.6756 4.59722 10.6756 5.33333C10.6756 6.06944 10.4161 6.69792 9.89699 7.21875C9.3779 7.73958 8.75154 8 8.0179 8C7.28426 8 6.65789 7.73958 6.13881 7.21875C5.61972 6.69792 5.36018 6.06944 5.36018 5.33333ZM2.70246 5.33333C2.70246 6.09028 2.81666 6.7118 3.04506 7.19792L6.824 15.2604C6.93474 15.4896 7.09911 15.6701 7.31713 15.8021C7.53515 15.934 7.76874 16 8.0179 16C8.26706 16 8.50065 15.934 8.71866 15.8021C8.93668 15.6701 9.09759 15.4896 9.20141 15.2604L12.9907 7.19792C13.2191 6.71181 13.3333 6.09028 13.3333 5.33333C13.3333 3.86111 12.8142 2.60417 11.7761 1.5625C10.7379 0.520833 9.48518 -8.13254e-07 8.0179 -9.41527e-07C6.55062 -1.0698e-06 5.29789 0.520832 4.25972 1.5625C3.22155 2.60417 2.70246 3.86111 2.70246 5.33333Z",
        )
        .attr(
          "transform",
          `scale(${markerSize}, ${markerSize}), translate(${(globeSize * (1 / markerSize)) / 2 - markerDimensions / 2}, ${(globeSize * (1 / markerSize)) / 2 - markerDimensions})`,
        )
        .attr("style", "fill:" + markerColor);

      // create a canvas element to project the globe data into
      const canvas = d3.select(CONTAINER_CLASSNAME).append("canvas").node();
      const context = (this.context = canvas.getContext("2d"));

      // technique for canvas that looks good on retina & high DPI screens
      // from https://gist.github.com/callumlocke/cc258a193839691f60dd
      // 1. Multiply the canvas's width and height by the devicePixelRatio
      const ratio = window.devicePixelRatio || 1;
      canvas.width = globeSize * ratio;
      canvas.height = globeSize * ratio;

      // 2. Force it to display at the original (logical) size with CSS or style attributes
      canvas.style.width = globeSize + "px";
      canvas.style.height = globeSize + "px";

      // 3. Scale the context so you can draw on it without considering the ratio.
      context.scale(ratio, ratio);

      this.projection = d3.geoOrthographic().fitExtent(
        [
          [0, 0],
          [globeSize, globeSize],
        ],
        { type: "Sphere" },
      );
      this.path = d3.geoPath(this.projection, context);

      this.globe = { type: "Sphere" };
      this.land = topojson.feature(world, world.objects.land);

      this._update();

      parentMap.on("move", this._update.bind(this));
    },

    _update: function () {
      const that = this;

      const parentCenter = this._parentMap.getCenter();

      d3.transition()
        .duration(1)
        .tween("rotate", function () {
          const r = d3.interpolate(that.projection.rotate(), [
            -parentCenter.lng,
            -parentCenter.lat,
          ]);
          return function (t) {
            that.projection.rotate(r(t));
            that.context.clearRect(
              0,
              0,
              that.options.width,
              that.options.height,
            );

            // draw water
            that.context.fillStyle = that.options.waterColor;
            that.context.beginPath();
            that.path(that.globe);
            that.context.fill();

            // draw land
            that.context.fillStyle = that.options.landColor;
            that.context.beginPath();
            that.path(that.land);
            that.context.fill();
          };
        });
    },

    _createContainer: function (parentMap) {
      const { globeSize, id } = this.options;
      const container = document.createElement("div");

      container.className = "mapboxgl-ctrl-globe-minimap mapboxgl-ctrl";
      container.setAttribute(
        "style",
        "width: " + globeSize + "; height: " + globeSize + ";",
      );
      container.addEventListener("contextmenu", this._preventDefault);

      parentMap.getContainer().appendChild(container);

      if (id !== "") {
        container.id = id;
      }

      return container;
    },

    _preventDefault: function (e) {
      e.preventDefault();
    },
  },
);

mapboxgl.GlobeMinimap = GlobeMinimap;

export default GlobeMinimap;
