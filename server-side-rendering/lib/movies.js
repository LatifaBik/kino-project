const API_BASE = 'https://plankton-app-xhkom.ondigitalocean.app/api';

/*export*/
async function loadMovies() {
  const res = await fetch(API_BASE + '/movies');
  const payload = await res.json();
  return payload.data.map(flattenMovie);  //nytt 
  /*return payload.data;*/
}


/*export*/
async function loadMovie(id) {
  const res = await fetch(API_BASE + '/movies/' + id);
  const payload = await res.json();
  return flattenMovie(payload.data);  //nytt  
  //   /*return payload.data;*/
} 


/*async function loadMovies() {
  const url = `${API_BASE}/movies?ts=${Date.now()}`;
  const res = await fetch(url, { cache: "no-store" });
  const payload = await res.json();
  return payload.data.map(flattenMovie);
}

async function loadMovie(id) {
  const url = `${API_BASE}/movies/${id}?ts=${Date.now()}`;
  const res = await fetch(url, { cache: "no-store" });
  const payload = await res.json();
  return flattenMovie(payload.data);
}*/
function flattenMovie(movie) {
  return {
    id: movie.id,
    ...movie.attributes,
  };
}

const api = {
  loadMovie,
  loadMovies,
};

export default api;



 

