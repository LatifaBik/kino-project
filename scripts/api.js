export async function fetchMovies() {
  const res = await fetch("https://plankton-app-xhkom.ondigitalocean.app/api/movies");


  if (!res.ok) throw new Error(`Failed to fetch movies (${res.status})`);

  const payload = await res.json();

  const list = payload.data;

  return list.map((item) => {
    const a = item.attributes ?? {};

    return {
      id: item.id,
      title: a.title ?? "Untitled",
      poster: a.image?.url ?? "",       
      overview: a.intro ?? "",           
      year: a.publishedAt ? new Date(a.publishedAt).getFullYear() : "", 
      imdbId: a.imdbId ?? null,
    };
  })};
