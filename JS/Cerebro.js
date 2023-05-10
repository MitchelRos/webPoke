const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
     event.preventDefault(); // detener la acción predeterminada del navegador
     var nombreInput = document.getElementById("pokeinput");
     var nombreCapitalizado = nombreInput.value.replace(/\b\w/g, function (l) {
          return l.toUpperCase();
     });
     nombreInput.value = nombreCapitalizado;
     var poke = document.getElementById("pokeinput").value;
     PokemonSearch(poke.toLowerCase());

});
let secciones = document.querySelectorAll('.secciones');
function PokemonSearch(poke) {
     var xhr = new XMLHttpRequest();
     // console.log(poke)
     xhr.addEventListener("readystatechange", function () {
          if (this.readyState === this.DONE) {
               if (this.status === 200) {
                    // console.log(JSON.parse(this.responseText));
                    pintaDatos(JSON.parse(this.responseText))
                    secciones.forEach(div => {
                         div.style.display = 'block';
                    });
               } else if (this.status === 404) {
                    secciones.forEach(div => {
                         div.style.display = 'none';
                    });
                    document.getElementById("pokeinput").value = "Not Found!";
                    document.getElementById("spriteImg").src = "IMG/substitute.png";
                    document.getElementById("num").innerHTML = "???";
                    document.querySelector('secciones').style.display = 'none';
               }
          }

     });
     xhr.open("GET", `https://pokeapi.co/api/v2/pokemon/${poke}`);
     xhr.send(null);
}

// ESTO NO HACIA FALTA PERO LO DEJO PARA LA PROXIMA (hize esto para asignar un color al introducir un tipo)
const pokemonTypes = [
     { name: "normal", color: "#A8A878" },
     { name: "fire", color: "#F08030" },
     { name: "fighting", color: "#C03028" },
     { name: "water", color: "#6890F0" },
     { name: "flying", color: "#A890F0" },
     { name: "grass", color: "#78C850" },
     { name: "poison", color: "#A040A0" },
     { name: "electric", color: "#F8D030" },
     { name: "ground", color: "#E0C068" },
     { name: "psychic", color: "#F85888" },
     { name: "rock", color: "#B8A038" },
     { name: "ice", color: "#98D8D8" },
     { name: "bug", color: "#A8B820" },
     { name: "dragon", color: "#7038F8" },
     { name: "ghost", color: "#705898" },
     { name: "dark", color: "#705848" },
     { name: "steel", color: "#B8B8D0" },
     { name: "fairy", color: "#EE99AC" },
];
function getColorTipoPokemon(nombreTipo) {
     const tipoEncontrado = pokemonTypes.find(tipo => tipo.name === nombreTipo);
     return tipoEncontrado ? tipoEncontrado.color : "white";
}
//------------------------------------------------------------------------------------------------------------

function pintaDatos(JSON) {
     // console.log((JSON.types).length);
     document.getElementById("num").innerHTML = (JSON.id);
     document.getElementById("spriteImg").src = (JSON.sprites.front_default);
     document.getElementById("type").innerHTML = "";
     document.getElementById("sprite").style.backgroundImage = 'linear-gradient(0deg,'+getColorTipoPokemon(JSON.types[0].type.name)+', rgb(255, 255, 255)';
     console.log(getColorTipoPokemon(JSON.types[0].type.name));
     for (let i = 0; i < (JSON.types).length; i++) {
          let newSpan = document.createElement("span");
          newSpan.innerHTML = JSON.types[i].type.name;
          newSpan.classList.add(newSpan.innerHTML); // añade clases del tipo correxpondiente
          document.getElementById("type").appendChild(newSpan);
     }
     document.getElementById("generation").innerHTML = "";
     let listGen = Object.keys(JSON.sprites.versions);
     for (let i = 0; i < listGen.length; i++) {
          let newgenspan = document.createElement("span");
          newgenspan.innerHTML = listGen[i].replace("generation-", "").toUpperCase();
          newgenspan.classList.add("gen"); // añade clases del tipo correxpondiente
          document.getElementById("generation").appendChild(newgenspan);
     }
}
