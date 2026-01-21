import initApp from './server-side-rendering/lib/app.js';
import api from './server-side-rendering/lib/movies.js';



const app = initApp(api);


app.listen(5080);