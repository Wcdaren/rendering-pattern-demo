import path from "path";
import express from "express";
import { render } from "./server/render";
import DATA from "./data.json";

const app = express();

/** API Proxy */
app.get("/api/users", (req, res) => {
  res.json(
    DATA.map((user) => ({
      id: user.login.uuid,
      username: user.login.username,
      name: user.name.first + " " + user.name.last,
    }))
  );
});

app.get("/", async function (req, res) {
  render(res);
});

app.use("/client.js", (req, res) => {
  res.redirect("/build/client.js");
});

app.use(express.static(path.resolve(__dirname, "src")));
app.use("/build", express.static(path.resolve(__dirname, "build")));

const listener = app.listen(process.env.PORT || 2048, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
