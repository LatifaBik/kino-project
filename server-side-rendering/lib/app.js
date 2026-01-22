import express from "express";
/*import { engine } from "express-handlebars";*/


import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export default function initApp(api) {
  const app = express(); 

  /*app.engine(
    "pug",
    engine({
      defaultLayout: "main",
      layoutsDir: "./server-side-rendering/pug-templates/layout",
      partialsDir: "./server-side-rendering/pug-templates/partials",
    })
  );*/

  app.set("view engine", "pug");
  app.set("views", path.join(__dirname, "../pug-templates"));

  app.use("/static", express.static(path.join(__dirname, "../static")));


app.get("/movies", async (req, res) => {
  const payload = await api.loadMovies();
  const arr = payload?.data ?? payload;          // {data:[...]} eller [...]
  const movies = (arr ?? []).map(m => ({
   
    id: m.id,
    ...(m.attributes ?? m),    // Strapi-objekt eller flattenat
  }));
  res.render("movie-list", { movies });
});

app.get("/movies/:movieId", async (req, res) => {


  const payload = await api.loadMovie(req.params.movieId);
  const m = payload?.data ?? payload;
  const movie = {
    id: m.id,
    ...(m.attributes ?? m),
  };
  res.render("movie-detail", { movie });
});

  // Front-sidan
  app.use(express.static("."));

  app.get("/", (req, res) => {
    res.sendFile(path.resolve("index.html"));
  });

  app.get("/member", (req, res) => {
    res.sendFile(path.resolve("member-page.html"));
  });

  app.use("/src", express.static("./src"));
  app.use("/scripts", express.static("./scripts"));

  return app;
}





