const api_url = "https://api.jikan.moe/v3" 
    
function searchAnime(event) {

    event.preventDefault();

    const form = new FormData(this);
    const query = form.get("search");
    
    console.log(query);

    
    fetch(`${api_url}/search/anime?q=${query}&page=1`)
    .then(res => res.json())
    .then(updateDom)
    .catch(err=>console.warn(err.message))
}

function updateDom(data){
  
    const searchResults = document.getElementById('search-results');

    searchResults.innerHTML = data.results.sort((a,b) => a.episodes - b.episodes)
    .map(anime=> {
        return `<div class="card" style="width: 18rem;">
        <img src="${anime.image_url}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${anime.title}</h5>
          <p class="card-text">${anime.synopsis}</p>
        </div>
      </div>
        `
    })
  
    
}

function pageLoaded(){
    const form = document.getElementById('search_form');
    form.addEventListener("submit", searchAnime)
    }

window.addEventListener("load", pageLoaded)