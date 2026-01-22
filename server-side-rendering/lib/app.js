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
      partialsDir: "./server-side-rendering/templates/partials",
    })
  );

  app.set("view engine", "handlebars");
  app.set("views", "./server-side-rendering/templates");

  app.use("/static", express.static("./server-side-rendering/static"));


 app.get("/movies", async (req, res) => {
  const payload = await api.loadMovies();

  const movies = payload.data.map(m => ({
    id: m.id,
    ...m.attributes,
  }));

  res.render("movie-list", { movies });
});

app.get("/movies/:movieId", async (req, res) => {
  const payload = await api.loadMovie(req.params.movieId);

  const movie = {
    id: payload.data.id,
    ...payload.data.attributes,
  };

  res.render("movie-detail", { movie });
});

 //nytt
/*app.get("/movies", async (req, res, next) => {
  try {
    res.set("Cache-Control", "no-store, max-age=0");
    res.set("Pragma", "no-cache");
    res.set("Expires", "0");

    const movies = await api.loadMovies();

    res.render("movie-list", { movies });
  } catch (e) {
    next(e);
  }
});*/

  /*app.get("/movies/:movieId", async (req, res) => {
    const movie = await api.loadMovie(req.params.movieId);
    res.render("movie-detail", {
      pageTitle: "The Movie Detail",
      movie,
    });
  });*/

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





