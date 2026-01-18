/*export async function fetchMovies() {
  const res = await fetch("./mockup_Data/movies.json");
  if (!res.ok) {
    throw new Error(`Failed to fetch movies.json (${res.status})`);
  }
  return await res.json();
}*/

/*export async function fetchMovies() {
  const res = await fetch("https://plankton-app-xhkom.ondigitalocean.app/api/movies");
  if (!res.ok) throw new Error(`Failed to fetch movies (${res.status})`);
  const payload = await res.json();
  return payload.data;
}*/

export async function fetchMovies() {
  const res = await fetch("https://plankton-app-xhkom.ondigitalocean.app/api/movies");
  if (!res.ok) throw new Error(`Failed to fetch movies (${res.status})`);

  const payload = await res.json();

  // payload.data = [{ id, attributes: {...} }, ...]
  return payload.data.map(item => {
    const a = item.attributes ?? {};

  

    return {
      Movie_Id: item.id,

       

      // Anpassa dessa nycklar efter vad som faktiskt finns i attributes:
      Movie_Series_Title: a.title ?? a.Movie_Series_Title ?? a.name,
      Movie_Poster_Link: a.poster ?? a.Movie_Poster_Link ?? a.imageUrl,
      Released_Year: a.releasedYear ?? a.Released_Year ?? a.year,
      Overview: a.overview ?? a.Overview ?? a.description,
      Certificate: a.certificate ?? a.Certificate,
      Show_Date: a.showDate ?? a.Show_Date,

       Trailer_Id: a.trailerId ?? a.Trailer_Id ?? null,
    };
  });
}
