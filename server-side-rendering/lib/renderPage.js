import fs from 'fs/promises';

const HEADER = {
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
  const theme = "light"; // börja enkelt

  res.render(page, {
    menuToggle: HEADER.menuToggle,
    themeToggle: HEADER.themeToggle,
    headerButtons: HEADER.buttons,
    theme
  });
}


export default async function renderPage(response, page) {
  response.render(page, {
    menuItems: MENU.map((item) => {
      return {
        label: item.label,
        link: item.link,
        active: item.id == page,
      };
    })
  });
}