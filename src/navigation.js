// Botones para navegar

searchFormBtn.addEventListener('click', () => {
	location.hash = '#search=' + searchFormInput.value;
});

trendingBtn.addEventListener('click', () => {
	location.hash = '#trends';
});

arrowBtn.addEventListener('click', () => {
	location.hash = window.history.back(); // Con esta línea regresamos exactamente a la búsqueda anterior cuando damos click en la flecha de retroceso
	// history.back() // Otra forma de solucionar el método de retroceso
});

window.addEventListener("DOMContentLoaded", navigator, false);
window.addEventListener("hashchange", navigator, false);

function navigator() {
  console.log({ location });

  if (location.hash.startsWith("#trends")) {
    trendsPage();
  } else if (location.hash.startsWith("#search=")) {
    searchPage();
  } else if (location.hash.startsWith("#movie=")) {
    movieDetailsPage();
  } else if (location.hash.startsWith("#category=")) {
    categoriesPage();
  } else {
    homePage();
  }
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}

function homePage() {
  console.log("Home!!");

	headerSection.classList.remove('header-container--long');
	headerSection.style.background = '';
	arrowBtn.classList.add('inactive');
	arrowBtn.classList.remove('header-arrow--white');
	headerTitle.classList.add('inactive');
	headerCategoryTitle.classList.add('inactive');
	searchForm.classList.remove('inactive');

	trendingPreviewSection.classList.remove('inactive');
	categoriesPreviewSection.classList.remove('inactive');
	genericSection.classList.add('inactive');
	movieDetailSection.classList.add('inactive');

  getTrendingMoviesPreview();
  getCategoriesPreview();
}
function categoriesPage(id) {
  console.log("categories!!");
	
	headerSection.classList.remove('header-container--long');
	headerSection.style.background = '';
	arrowBtn.classList.remove('inactive');
	arrowBtn.classList.remove('header-arrow--white');
	headerTitle.classList.add('inactive');
	headerCategoryTitle.classList.remove('inactive');
	searchForm.classList.add('inactive');

	trendingPreviewSection.classList.add('inactive');
	categoriesPreviewSection.classList.add('inactive');
	genericSection.classList.remove('inactive');
	movieDetailSection.classList.add('inactive');


	// Esto es desestructuración de arreglos 
	// Esto devuelve ['#category', 'id-name']
	const [_, categoryData] = location.hash.split('=');
  const [categoryId, categoryName] = categoryData.split('-');

  headerCategoryTitle.innerHTML = categoryName;

	getMoviesByCategory(categoryId);
}
function movieDetailsPage() {
  console.log("Movie!!");

	headerSection.classList.add('header-container--long');
	// headerSection.style.background = '';
	arrowBtn.classList.remove('inactive');
	arrowBtn.classList.add('header-arrow--white');
	headerTitle.classList.add('inactive');
	headerCategoryTitle.classList.add('inactive');
	searchForm.classList.add('inactive');

	trendingPreviewSection.classList.add('inactive');
	categoriesPreviewSection.classList.add('inactive');
	genericSection.classList.add('inactive');
	movieDetailSection.classList.remove('inactive');

	const [_, movieId] = location.hash.split('='); // ['#movie=','id']
	getMovieById(movieId);


}
function searchPage() {
  console.log("search!!");

	headerSection.classList.remove('header-container--long');
	headerSection.style.background = '';
	arrowBtn.classList.remove('inactive');
	arrowBtn.classList.remove('header-arrow--white');
	headerTitle.classList.add('inactive');
	headerCategoryTitle.classList.add('inactive');
	searchForm.classList.remove('inactive');

	trendingPreviewSection.classList.add('inactive');
	categoriesPreviewSection.classList.add('inactive');
	genericSection.classList.remove('inactive');
	movieDetailSection.classList.add('inactive');

	const [_, query] = location.hash.split('='); // ['#search=','value']
	getMoviesBySearch(query);
}
function trendsPage() {
  console.log("Trends!!");

	headerSection.classList.remove('header-container--long');
	headerSection.style.background = '';
	arrowBtn.classList.remove('inactive');
	arrowBtn.classList.remove('header-arrow--white');
	headerTitle.classList.add('inactive');
	headerCategoryTitle.classList.remove('inactive');
	searchForm.classList.add('inactive');

	trendingPreviewSection.classList.add('inactive');
	categoriesPreviewSection.classList.add('inactive');
	genericSection.classList.remove('inactive');
	movieDetailSection.classList.add('inactive');

  headerCategoryTitle.innerHTML = 'Tendencias';

	getTrendingMovies(id);
}
