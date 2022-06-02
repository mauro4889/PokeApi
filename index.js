const url = `https://pokeapi.co/api/v2/pokemon/bulbasaur`;
const url2 = `https://pokeapi.co/api/v2/pokemon?limit=5&offset=0`;
const templateCard = document.querySelector('#templateCard').content;
const fragment = document.createDocumentFragment();
const card = document.querySelector('.container__cards')
const card5 = document.querySelector('.container__Cards5')
const btnnext = document.getElementById('btnNext');
const btnprev = document.getElementById('btnPrev');

let next, prev;

const mostrarPokemon = async (datosApi)=>{

  const urlApi = datosApi.results.map((pokemon)=> pokemon.url)
  next = datosApi.next
  prev = datosApi.prev

  const datosPokemon = await Promise.all(
    urlApi.map(async (url)=>{
      const next5 = await fetch(url);
      return await next5.json();
    })
  )

}

const listaPokemon = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    mostrarPokemon(data);
  } catch (error) {
    consoñe.log('Error al obtener la lista de pokemons');
  }
};



document.addEventListener('DOMContentLoaded',()=>{
  listaPokemon(url2)
})






// fetch(url2)
//   .then(obj =>{
//     data = obj.json()
//     console.log(data)
//     return data
//   })
//   .then(json =>{
//     const clone = templateCard.cloneNode(true);
//     clone.querySelector('h2').textContent = json.name;
//     clone.querySelector('h3').textContent = json.id;
//     clone.querySelector('img').src = json.sprites.other.dream_world.front_default || json.sprites.front_default;
//     fragment.appendChild(clone);
//     card.appendChild(fragment);
//   })
//   .catch((err) =>{
//     console.log(err)
//   });



