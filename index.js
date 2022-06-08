const url = `https://pokeapi.co/api/v2/pokemon?limit=6&offset=0`;
const urlSearch = 'https://pokeapi.co/api/v2/pokemon/';
const urlType = 'https://pokeapi.co/api/v2/type';
const templateCard = document.querySelector('#templateCard').content;
const fragment = document.createDocumentFragment();
const containerCard = document.querySelector('.container__cards');
const card = document.getElementById('card')
const btnnext = document.getElementById('btnNext');
const btnprev = document.getElementById('btnPrev');
const txtSearch = document.getElementById('textSearch');
const btnSearch = document.getElementById('search');
const btnAll = document.getElementById('btnAll');
const select = document.getElementById('selectTipo');
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
        console.log(data.results)
        mostrarPokemon(data);
    } catch (error) {
        console.log('Error al obtener la lista de pokemons');
    }
};
/* FIN LLAMADA  A LA API*/

/* MOSTRAR BUSQUEDA */
const mostrarBusqueda = (pokemon) =>{
    templateCard.querySelector('h2').textContent = pokemon.name;
    templateCard.querySelector('h3').textContent = `# ${pokemon.id}`;
    templateCard.querySelector('img').src = pokemon.sprites.other.dream_world.front_default || json.sprites.front_default;
    const clone = document.importNode(templateCard, true);
    fragment.appendChild(clone);
    containerCard.appendChild(fragment);
}
/* FIN MOSTRAR BUSQUEDA /

/* BUSCAR POKEMON */
const buscarPokemon = async(url) =>{
    try{
        const res = await fetch(url);
        const data = await res.json();
        mostrarBusqueda(data)
    } catch(error){
        let textoError = document.createTextNode('No se encontro el pokemon');
        containerCard.appendChild(textoError);
    }
}
/* FIN BUSCAR POKEMON */

/* MOSTRAR TIPOS*/
const mostrarTipo = (url) =>{
    const urlApi = url.results.map((type) => type.name)
    urlApi.forEach(tipos =>{
        const option = document.createElement('option');
        option.textContent = tipos;
        select.appendChild(option);
    })
}
/* FIN MOSTRAR TIPOS*/

/* BUSCAR TIPO*/
const buscarTipo = async(url) =>{
    try{
        const res = await fetch(url);
        const data = await res.json();
        mostrarTipo(data);
    } catch(error){
        let textoError = document.createTextNode('No se encontraron tipos de pokemon');
        containerCard.appendChild(textoError);
    }
}
/* FIN BUSCAR TIPO */

/* FILTRAR TIPO */
const filtrarTipo = async(url) =>{
    const infoTIpos = await mostrarapi(url);
    console.log(infoTIpos)
    if (!infoTIpos.error){
        const dataObjt ={
            results: infoTIpos.pokemon.map((pokemon) => pokemon.pokemon),
            next: null,
            prev: null,
        }
        console.log(dataObjt.results)
    }
}
/* FIN FILTRAR TIPO */
const limpiar = () =>{
    while (containerCard.firstChild){
        containerCard.removeChild(containerCard.firstChild);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    listaPokemon(url);
    mostrarapi(url);
    buscarTipo(urlType);
})

btnnext.addEventListener('click', (e) =>{
    limpiar();
    listaPokemon(next);
    mostrarapi(next)
})
btnprev.addEventListener('click', (e) =>{
    limpiar();
    listaPokemon(prev);
    mostrarapi(prev);
})

btnSearch.addEventListener('click', ()=>{
   limpiar();
    let encontrar = txtSearch.value.toLowerCase();
    // mostrarapi(`${urlSearch}${encontrar}`)
    buscarPokemon(`${urlSearch}${encontrar}`);
})

btnAll.addEventListener('click',() =>{
    limpiar();
    listaPokemon(url);
    mostrarapi(url);
})

select.addEventListener('change', ()=>{
    console.log(`${urlType}/${select.value}`);
    filtrarTipo(`${urlType}/${select.value}`);
})