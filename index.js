const url = `https://pokeapi.co/api/v2/pokemon?limit=6&offset=0`;
const templateCard = document.querySelector('#templateCard').content;
const fragment = document.createDocumentFragment();
const containerCard = document.querySelector('.container__cards');
const card = document.getElementById('card')
const btnnext = document.getElementById('btnNext');
const btnprev = document.getElementById('btnPrev');

let next, prev;

const mostrarapi = async(url) => {
        const api = await fetch(url);
        return await api.json();
    }
    /* RENDERIZAR POKEMON */
const mostrarPokemon = async(datosApi) => {
    /* SE CREA UN ARRAY CON LA URL DE LOS POKEMON OBTENIDA DEL FETCH */
    const urlApi = datosApi.results.map((pokemon) => pokemon.url)
    next = datosApi.next;
    prev = datosApi.previous;

    /* SE CREA UN ARRAY CON LA INFORMACION DE LOS POKEMON OBTENIDA DE SU URL*/
    const datosPokemon = await Promise.all(
        urlApi.map(async(url) => {
            const next10 = await fetch(url);
            return await next10.json();
        })
    )

    /* SE RECORRE EL ARRAY Y SE RENDERIZAN LOS POKEMON EN EL FRAGMENT UNA VEZ SE  CARGARON TODOS SE CLONA EL TEMPLATE Y SE LO AGREGA AL .CONTAINER__CARD*/
    datosPokemon.forEach((pokemon) => {
            templateCard.querySelector('h2').textContent = pokemon.name;
            templateCard.querySelector('h3').textContent = `# ${pokemon.id}`;
            templateCard.querySelector('img').src = pokemon.sprites.other.dream_world.front_default || json.sprites.front_default;
            const clone = document.importNode(templateCard, true);
            fragment.appendChild(clone);
            containerCard.appendChild(fragment);
        })
        /* FIN RENDERIZAR POKEMON */
    if (next !== ''){
        btnnext.disabled = false;
        btnnext.classList.remove('disabled')
    } else{
        btnnext.disabled = true;
        btnnext.classList.add('disabled');
        console.log(next)
    }

    if (prev){
        btnprev.disabled = false;
        btnprev.classList.remove('disabled')
    } else{
        btnprev.disabled = true;
        btnprev.classList.add('disabled')
    }
}


/* LLAMADA A LA API*/
const listaPokemon = async(url) => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        mostrarPokemon(data);
    } catch (error) {
        consoñe.log('Error al obtener la lista de pokemons');
    }
};
/* FIN LLAMADA  A LA API*/


document.addEventListener('DOMContentLoaded', () => {
    listaPokemon(url)
    mostrarapi(url)
})

btnnext.addEventListener('click', (e) =>{
    while (containerCard.firstChild){
        containerCard.removeChild(containerCard.firstChild);
    }
    listaPokemon(next);
    mostrarapi(next)
})
btnprev.addEventListener('click', (e) =>{
    while (containerCard.firstChild){
        containerCard.removeChild(containerCard.firstChild);
    }
    listaPokemon(prev);
    mostrarapi(prev);
})

containerCard.forEach(el =>{
    card.addEventListener('click', ()=>{

    })
} )