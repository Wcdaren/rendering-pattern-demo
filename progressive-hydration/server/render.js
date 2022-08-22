import React from "react";
import { pipeToNodeWritable } from "react-dom/server";
import { DataProvider } from "../src/context/DataProvider";
import { API_DELAY, ABORT_DELAY } from "./delays";
import App from "../src/App";

// In a real setup, you'd read it from webpack build stats.
let assets = {
  "main.js": "/main.js",
  "main.css": "/main.css",
};

export const render = (res) => {
  let threwError = false;
  const data = createServerData();

  const { startWriting, abort } = pipeToNodeWritable(
    <DataProvider data={data}>
      <App assets={assets} />
    </DataProvider>,
    res,
    {
      onReadyToStream() {
        res.statusCode = threwError ? 500 : 200;
        res.setHeader("Content-type", "text/html");
        res.write("<!DOCTYPE html>");
        startWriting();
      },
      onError(err) {
        threwError = true;
        console.error(err);
      },
    }
  );

  setTimeout(abort, ABORT_DELAY);
};

function createServerData() {
  let done = false;
  let promise = null;

  return {
    async read() {
      if (done) return;

      const getPromise = async () => {
        if (promise) return promise;
        throw setTimeout(() => {
          done = true;
          promise = null;
        }, API_DELAY);
      };

      throw getPromise();
    },
  };
}
