import express from "express";
import { engine } from "express-handlebars";
import path from "path";


export default function initApp(api) {
  const app = express(); 

  app.engine(
    "handlebars",
    engine({
      defaultLayout: "main",
       layoutsDir: "./server-side-rendering/templates/layout",
    partialsDir: "./server-side-rendering/partials",
    })
  );

  app.set("view engine", "handlebars");
  app.set("views", "./server-side-rendering/templates");

  app.use("/static", express.static("./server-side-rendering/static"));


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





