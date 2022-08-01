// Axios

// Con axios podemos traer todo directamente en una sola creación, así mismo podemos utilizar los headers y los parámetros como en este caso, trayendo nuestra API_KEY

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    api_key: API_KEY, // aquí en forma de parámetros estaríamos enviando nuestra API_KEY, sin necesidad de citarla en cada función que queramos crear
  },
});

// Utils para reutilizar código

function createMovies(movies, container) {
  container.innerHTML = "";

  movies.forEach((movie) => {
    // const trendingPreviewMoviesContainer = document.querySelector(
    //   "#trendingPreview .trendingPreview-movieList"
    // );

    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");
    movieContainer.addEventListener("click", () => {
      location.hash = "#movie=" + movie.id;
    });

    const movieImg = document.createElement("img");
    movieImg.classList.add("movie-img");
    movieImg.setAttribute("alt", movie.title);
    movieImg.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    );

    movieContainer.appendChild(movieImg);
    container.appendChild(movieContainer);
  });
  // console.log({data, movies})
}

function createCategories(categories, container) {
  container.innerHTML = "";

  categories.forEach((category) => {
    // const previewCategoriesContainer = document.querySelector(
    //   "#categoriesPreview .categoriesPreview-list"
    // );

    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");

    const categoryTitle = document.createElement("h3");
    categoryTitle.classList.add("category-title");
    categoryTitle.setAttribute("id", "id" + category.id);

    // Organizando cada una de las secciones para cuando se genere click, se vaya a la categoría asignada
    categoryTitle.addEventListener("click", () => {
      location.hash = `#category=${category.id}-${category.name}`;
    });

    const categoryTitleText = document.createTextNode(category.name);

    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    container.appendChild(categoryContainer);
  });
}

// Llamados a la API

async function getTrendingMoviesPreview() {
  const { data } = await api("trending/movie/day");
  const movies = data.results;

  createMovies(movies, trendingMoviesPreviewList);
}

async function getCategoriesPreview() {
  const { data } = await api("genre/movie/list");
  const categories = data.genres;

  createCategories(categories, categoriesPreviewList);

  // categoriesPreviewList.innerHTML = ''; // Con esta línea garantizamos que el contenido traído desde el API, no se duplica al regresar al home, luego de haber ingresado a otra sección

  // categories.forEach((category) => {
  //   // const previewCategoriesContainer = document.querySelector(
  //   //   "#categoriesPreview .categoriesPreview-list"
  //   // );

  //   const categoryContainer = document.createElement("div");
  //   categoryContainer.classList.add("category-container");

  //   const categoryTitle = document.createElement("h3");
  //   categoryTitle.classList.add("category-title");
  //   categoryTitle.setAttribute("id", "id" + category.id);

  // 	// Organizando cada una de las secciones para cuando se genere click, se vaya a la categoría asignada
  // 	categoryTitle.addEventListener('click', () => {
  // 		location.hash = `category=${category.id}-${category.name}`;
  // 	});

  //   const categoryTitleText = document.createTextNode(category.name);

  //   categoryTitle.appendChild(categoryTitleText);
  //   categoryContainer.appendChild(categoryTitle);
  //   categoriesPreviewList.appendChild(categoryContainer);
  // });
  // // console.log({data, movies})
}

async function getMoviesByCategory(id) {
  const { data } = await api("discover/movie", {
    params: {
      with_genres: id,
    },
  });
  const movies = data.results;

  createMovies(movies, genericSection);

  // genericSection.innerHTML = ''; // Con esta línea garantizamos que el contenido traído desde el API, no se duplica al regresar al home, luego de haber ingresado a otra sección

  // movies.forEach((movie) => {
  //   // const trendingPreviewMoviesContainer = document.querySelector(
  //   //   "#trendingPreview .trendingPreview-movieList"
  //   // );

  //   const movieContainer = document.createElement("div");
  //   movieContainer.classList.add("movie-container");

  //   const movieImg = document.createElement("img");
  //   movieImg.classList.add("movie-img");
  //   movieImg.setAttribute("alt", movie.title);
  //   movieImg.setAttribute(
  //     "src",
  //     `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
  //   );

  //   movieContainer.appendChild(movieImg);
  //   genericSection.appendChild(movieContainer);

  // console.log({data, movies})
}

async function getMoviesBySearch(query) {
  const { data } = await api("search/movie", {
    params: {
      query,
    },
  });
  const movies = data.results;

  createMovies(movies, genericSection);
}

async function getTrendingMovies() {
  const { data } = await api("trending/movie/day");
  const movies = data.results;

  createMovies(movies, genericSection);
}
async function getMovieById(id) {
  const { data: movie } = await api("movie/" + id);
  // const movies = data.results; // Debido a que no es un arreglo, si no que simplemente un Id, no es necesario crear este data,results

  const movieImgUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  headerSection.style.background = `
	linear-gradient( 
		180deg, 
		rgba(0, 0, 0, 0.35) 19.27%,
		rgba(0, 0, 0, 0) 29.17%), 
	url(${movieImgUrl})
	`; // El linear-gradient lo utilizamos para crear una sombra en la parte superior que nos permita visualizar fácilmente la flecha de retroceso

  movieDetailTitle.textContent = movie.title;
  movieDetailDescription.textContent = movie.overview;
  movieDetailScore.textContent = movie.vote_average;
  movieDetailCategoriesList.textContent;

  createCategories(movie.genres, movieDetailCategoriesList);

	getRelatedMoviesById(id);
}

async function getRelatedMoviesById(id) {
	const { data } = await api(`movie/${id}/similar`);
	const relatedMovies = data.results;

	createMovies(relatedMovies, relatedMoviesContainer);
}


// Axios es excelente por la facilidad de lectura del código

/* 

/ Location - Propiedad o elemento en el navegador

Podemos ver la URL  en la que estamos ubicados y modificar la url en la que estamos ubicados, sin necesidad de recargar el navegador con la propiedad 'location.hash = nombre'

/ onhashchange - Evento

Ayuda a ejecutar el código cada vez que el hash se ha modificado

*/
