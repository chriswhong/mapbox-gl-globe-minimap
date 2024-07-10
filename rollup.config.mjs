import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";

export default {
  external: ["mapbox-gl"],
  output: {
    file: "dist/bundle.js",
    format: "iife",
    name: "MapboxGLGlobeMinimap",
    globals: {
      d3: "d3",
      "mapbox-gl": "mapboxgl",
    },
    plugins: [terser()],
  },
  plugins: [nodeResolve()],
};
