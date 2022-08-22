import React from "react";
import { Hydrator as ClientHydrator, ServerHydrator } from "./Hydrator";

let load = () => import("./Stream");
let Hydrator = ClientHydrator;

if (typeof window === "undefined") {
  Hydrator = ServerHydrator;
  load = () => require("./Stream");
}

export default function App() {
  return (
    <div id="app">
      <div className="intro">
        <p>
          This is an example of how server-side rendered React can enable{" "}
          <strong>progressively hydrated</strong> experiences.
        </p>
        <p>
          <strong>Scroll down.</strong> The flash of color you see is an
          indicator of JavaScript being fetched without any direct change to the
          UI.
        </p>
      </div>
      <Hydrator load={load} />
    </div>
  );
}
