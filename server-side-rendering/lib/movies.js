import fs from 'fs/promises';



const API_BASE = 'https://plankton-app-xhkom.ondigitalocean.app/api';


export async function loadMovies() {
  const res = await fetch(API_BASE + '/movies');
  const payload = await res.json();
  return payload.data;
}

export async function loadMovie(id) {
  const res = await fetch(API_BASE + '/movies/' + id);
  const payload = await res.json();
  return payload.data;
}
















//Header
/*const HEADER = {
    logo: {
  href: "/",
  alt: "Kino Lycksele"
},

  menuToggle: {
    id: "menu-toggle",
    action: "toggle-menu",
    label: "MENY"
  },

  themeToggle: {
    id: "theme-toggle",
    action: "toggle-theme",
    icon: {
      light: "/assets/toggle2-light.png",
      dark: "/assets/icons/theme-dark.svg",
    },
    alt: "Toggle theme"
  },

  buttons: [
    { label: "Home", id: "btn-home", action: "navigate", target: "/" },
    { label: "Member", id: "btn-member", action: "navigate", target: "/member" },
    { label: "Join / Login", id: "btn-login", action: "modal", target: "login" }
  ]
};


export default function renderPage(res, page) {
  const theme = "light"; 

  res.render(page, {
    menuToggle: HEADER.menuToggle,
    themeToggle: HEADER.themeToggle,
    headerButtons: HEADER.buttons,
    theme
  });
}*/


