async function APICall() {
  let response = await fetch("https://pokeapi.co/api/v2/pokemon/", {});
  let data = await response.json();
  return data;
}

async function getJPinfo()
{
  let response = await fetch("https://pokeapi.co/api/v2/pokemon-species/", {});
  let jpdata = await response.json();
  return jpdata;
}

async function LoadMainPage() {
  let data = await APICall();
  let names = data.results.map(pokemon => pokemon.name);
  let urls = data.results.map(pokemon => pokemon.url);

  html =  ` 
  
  <div class="jumbotron text-center">
  <h1>Pokemon API Assignment</h1>
</div>
<div class="center-table">
<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>More Information</th>
  </tr>
  `
  names.forEach((name, index) => {
    let url = urls[index];

    html += 
    `
      <tr>
      <td>${name}</td>
      <td><a href="pokeinfo.html?url=${url}" target="_blank">More Poke Info</a></td>
      </tr>
    `;

  });
document.getElementById('app').innerHTML=html;
}






async function LoadInfoPage() {

  let senturl = new URLSearchParams(window.location.search);
  let url = senturl.get('url');
  let response = await fetch(url);
  let data = await response.json();

  let name = data.name
  let abilities = data.abilities
  let frontsprite = data.sprites.front_default;
  let backsprite = data.sprites.back_default;
  let types = data.types


  let JPurl = url.replace("pokemon", "pokemon-species");
  let JPresponse = await fetch(JPurl);
  let JPdata = await JPresponse.json();
  let JPname = JPdata.names.find(nameData => nameData.language.name === "ja-Hrkt").name;
  let JPnameRom = JPdata.names.find(nameData => nameData.language.name === "roomaji").name;

  html =  
  ` 
  
  <div class="jumbotron text-center">
  <h1>Pokemon API Assignment</h1>
</div>
<div class="center-table">
<table class="table table-striped">
  <tr>
    <th>English Name:</th>
  </tr>
  `

      html += `
      <tr>
      <td>${name}</td>
      </tr>

      

      <tr>
      <th>Japanese Name:</th>
      </tr>
      <tr>
      <td>${JPname}</td>
      </tr>
      <tr>
      <td>(${JPnameRom})</td>
      </tr>
      
      <th>Abilities:</th>
      `
      abilities.forEach((ability) => {
        html += `
        <tr>
        <td>${ability.ability.name}</td>
        </tr>`;
      });

      html +=
      `
      <tr>
      <th>Sprites:</th>
      </tr>
      
      <td>
      <img src="${frontsprite}" alt="${name}" />
      <img src="${backsprite}" alt="${name}" />
      </td>
      <tr>
      <th>Types:</th>
      </tr>
      `
      types.forEach((type) => {
        html += `
        <tr>
        <td>${type.type.name}</td>
        </tr>
        `})  

      html +=
      `</table>
      </div>`
      ;

document.getElementById('app').innerHTML=html;
}


