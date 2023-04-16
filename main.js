const banner=document.getElementById("banner");
const bannerTitle =document.getElementById("banner-title");
const bannerdescription =document.getElementById("banner-description");
const title= document.getElementById("title");
const date = document.getElementById("date");
const language = document.getElementById("language");
const rating = document.getElementById("rating");
const description = document.getElementById("description");
const close = document.getElementById("close");
const container = document.getElementById("container");
const nav =document.getElementById("nav")

const API_KEY ="39a54355532b2b5941605293fe934430";

const baseURL = "https://api.themoviedb.org/3";


const imageUrl = "https://image.tmdb.org/t/p/original/";



const requests = [
    `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    `/discover/movie?api_key=${API_KEY}&with_genres=99`
]
//fetching data for rows
async function fetchdata(){
    for(let i=0;i<8;i++){
    const response = await fetch(`${baseURL}${requests[i]}`);
    const data = await response.json();
    var movies =data.results;
    console.log(movies);
    createrows(movies,i)
    }
   return movies
}
fetchdata();

//adding data in rows
 function createrows(movies,i){
    movies.map((movie) =>{
        const imag = document.getElementById(`image${i}`);
        const poster=document.createElement("img");
        poster.src = `${imageUrl}${movie.backdrop_path}`
         poster.classList.add('image');
         imag.appendChild(poster);

         //creating about section
         poster.addEventListener("click",function(){
             console.log(movie)
            container.style.display = " flex";
            const movieposterImg =document.getElementById("movieposterimg");
            movieposterImg.src = `${imageUrl}${movie.poster_path}`;
            title.textContent = (movie.name || movie.title || movie.original_name);
            date.textContent = movie.first_air_date;
            language.textContent = movie.original_language;
            rating.textContent = movie.vote_average;
            description.textContent =movie.overview;
         })
    })
 }
//fetching data for banner
async function fetchbannerdata(){
   const bannerResponse =await fetch (`${baseURL}${requests[0]}`);
   const bannerData =  await bannerResponse.json();
   var banners = bannerData.results;
console.log(banners);
   const select = banners[Math.floor(Math.random() * banners.length)]
  console.log(select);
   banner.style.backgroundImage = `url(${imageUrl}${select.backdrop_path})`;
   bannerTitle.textContent  = select.name;
   bannerdescription.textContent = select.overview;

}
fetchbannerdata()

//closing the about element
close.addEventListener("click",function(){
    console.log("clicked");
    container.style.display = "none"
})

//navbar animation
window.addEventListener("scroll",function(){
      if(this.window.scrollY > 100){
         nav.style.background = "#111";
      }
      else{
         nav.style.background = "none";
      }
})
