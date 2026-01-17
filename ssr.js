
import express from 'express';
import { engine } from 'express-handlebars';
import { loadMovie, loadMovies } from './server-side-rendering/lib/movies.js';



const app = express();
app.use("/static", express.static("./server-side-rendering/static"));

/*app.use("/static", express.static("./static"));*/

/*app.use(express.static("."));*/

app.engine("handlebars", engine({
  defaultLayout: "main",
  layoutsDir: "./server-side-rendering/templates/layout",
  partialsDir: "./server-side-rendering/templates/partials",
}));

app.set("view engine", "handlebars");
app.set("views", "./server-side-rendering/templates");

//för att få routen fungerar??
app.get("/", (req, res) => res.redirect("/movies"));

app.get("/movies", async (req, res) => {
  const movies = await loadMovies();
  res.render("movie-list", { movies });
});


app.get("/movies/:movieId", async (req, res) => {
  const movie = await loadMovie(req.params.movieId);
  res.render("movie-detail", { movie });
});



app.listen(5080);