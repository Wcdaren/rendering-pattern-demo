import React from "react";
import { pipeToNodeWritable } from "react-dom/server";
import { DataProvider } from "./context/DataProvider";
import App from "./components/App";

export default async () =>
  pipeToNodeWritable(
    <DataProvider>
      <App />
    </DataProvider>
  );
