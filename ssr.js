
import express from 'express';
import { engine } from 'express-handlebars';
import { loadMovie, loadMovies } from './server-side-rendering/lib/movies.js';



const app = express();
app.use("/static", express.static("./server-side-rendering/static"));

/*app.use("/static", express.static("./static"));*/

/*app.use(express.static("."));*/

app.use("/src", express.static("./src"));
app.use("/scripts", express.static("./scripts"));
app.use("/mockup_Data", express.static("./mockup_Data")); // om du fetchar därifrån


//för att få fram front sida
import path from "path";

app.get("/", (req, res) => {
  res.sendFile(path.resolve("index.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve("member-page.html"));
});


app.engine("handlebars", engine({
  defaultLayout: "main",
  layoutsDir: "./server-side-rendering/templates/layout",
  partialsDir: "./server-side-rendering/templates/partials",
}));

app.set("view engine", "handlebars");
app.set("views", "./server-side-rendering/templates");


/*app.get("/movies", async (req, res) => {
  const movies = await loadMovies();
  res.render("movie-list", { movies });
});

app.get("/movies/:movieId", async (req, res) => {
  const movie = await loadMovie(req.params.movieId);
  res.render("movie-detail", { movie });
});*/

app.get("/movies", async (req, res) => {
  const movies = await loadMovies()
  res.render("movie-list", {
    pageTitle: "The Movie Site",
    movies
  })
})

app.get("/movies/:movieId", async (req, res) => {
  const movie = await loadMovie(req.params.movieId)
  res.render("movie-detail", {
    pageTitle: "The Movie Detail",
    movie
  })
})




app.listen(5080);