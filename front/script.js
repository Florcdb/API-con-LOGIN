function getCharacterInfo() {
    const characterNameInput = document.getElementById('characterName')
    const characterInfo = document.getElementById('characterInfo')


    const characterName = characterNameInput.value.toLocaleLowerCase()

    fetch(`http://localhost:3000/characters/${characterName}`)
       .then(response => response.json())
       .then(data => {
        const {name, status, species, gender, image } = data

      characterInfo.innerHTML = `
      <h2>${name}</h2>
      <img src="${image}"  alt="${name}"/>
      <p>Status: ${status}</p>
      <p>Species: ${species}</p>
      <p>Gender: ${gender}</p>
      <p>Origin: ${origin}</p>
      `
       })
       .catch(error => {
        characterInfo.innerHTML = `<p>Imposible acceder al personaje</p>`;
    })
    
}