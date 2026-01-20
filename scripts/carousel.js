

export function movieCarousel(movies = []) {
  const heroInner = document.getElementById("heroInner");
  const prevBtn = document.querySelector(".carousel_control.prev");
  const nextBtn = document.querySelector(".carousel_control.next");

  if (!heroInner || !movies.length) return;

  const heroMovies = [...movies].sort(() => Math.random() - 0.5).slice(0, 6);

  heroInner.innerHTML = heroMovies
    .map((movie, index) => {
      const poster = movie.poster ?? "";
      const title = movie.title ?? "Untitled";
      const year = movie.year ?? "";

      return `
        <div class="carousel_slide ${index === 0 ? "active" : ""}" style="background-image:url('${poster}')">
          <h1>${title}</h1>
          <h2>Released: ${year}</h2>
        </div>
      `;
    })
    .join("");

  const slides = heroInner.querySelectorAll(".carousel_slide");
  let currentSlide = 0;

  function showSlide(index) {
    if (!slides.length) return;
    slides[currentSlide].classList.remove("active");
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
  }

  if (prevBtn) prevBtn.onclick = () => showSlide(currentSlide - 1);
  if (nextBtn) nextBtn.onclick = () => showSlide(currentSlide + 1);

  // autoplay (undvik att skapa flera intervaller om funktionen körs fler gånger)
  if (!heroInner.dataset.autoplay) {
    heroInner.dataset.autoplay = "true";
    setInterval(() => showSlide(currentSlide + 1), 5000);
  }
}
