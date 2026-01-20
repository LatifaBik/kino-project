
const modal = document.getElementById("trailerModal");
const iframe = document.getElementById("trailerIframe");

// Dessa kan vara null på sidor utan modal:
const closeBtn = modal?.querySelector(".trailer-modal__close");
const backdrop = modal?.querySelector(".trailer-modal__backdrop");

export function openTrailer(trailerId) {
  if (!modal || !iframe) return;        
  iframe.src = `https://www.youtube.com/embed/${trailerId}?autoplay=1`;
  modal.classList.remove("hidden");
}

function closeTrailer() {
  if (!modal || !iframe) return;        
  iframe.src = "";
  modal.classList.add("hidden");
}

// Lägg bara listeners om knapparna finns
closeBtn?.addEventListener("click", closeTrailer);
backdrop?.addEventListener("click", closeTrailer);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeTrailer();
});
