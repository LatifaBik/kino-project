/*import "./sections/main.scss";*/

import { initMemberPage, initMemberButtons } from "../scripts/member-page.js";
import { toggleLogin } from "../scripts/login.js";
import { toggleRegister } from "../scripts/register.js";
import { toggleMenu } from "../scripts/menu.js";
import { closeNotice } from "../scripts/notice.js";
import { toggleTheme } from "../scripts/tema.js";

import { fetchMovies } from "../scripts/api.js";
import { renderMovieList } from "../scripts/createcard.js";
import { movieCarousel } from "../scripts/carousel.js";

document.addEventListener("DOMContentLoaded", async () => {
  if (document.querySelector(".members__offers")) initMemberPage();
  initMemberButtons();

  if (document.querySelector(".login")) toggleLogin();
  if (document.querySelector(".register")) toggleRegister();
  if (document.querySelector(".menu")) toggleMenu();
  if (document.querySelector(".theme-toggle")) toggleTheme();

  closeNotice();

  const currentTrack = document.getElementById("currentMoviesTrack");
  const comingSoonTrack = document.getElementById("comingSoonTrack");
  const eventsTrack = document.getElementById("eventsTrack");

  if (currentTrack) currentTrack.innerHTML = "<p>Laddar…</p>";
  if (comingSoonTrack) comingSoonTrack.innerHTML = "<p>Laddar…</p>";
  if (eventsTrack) eventsTrack.innerHTML = "<p>Laddar…</p>";

  try {
    const movies = await fetchMovies();

    // render listor
    renderMovieList(currentTrack, movies);
    renderMovieList(comingSoonTrack, movies.slice(0, 15));
    renderMovieList(eventsTrack, movies.slice(0, 25));

    // render karusell (skicka movies!)
    movieCarousel(movies);

  } catch (err) {
    console.error(err);
    if (currentTrack) currentTrack.innerHTML = "<p>Kunde inte hämta filmer.</p>";
    if (comingSoonTrack) comingSoonTrack.innerHTML = "<p>Kunde inte hämta filmer.</p>";
    if (eventsTrack) eventsTrack.innerHTML = "<p>Kunde inte hämta filmer.</p>";
  }
});
