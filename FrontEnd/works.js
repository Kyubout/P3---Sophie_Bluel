//Récupération des works depuis l'API
const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

//Création des balises 
for (let i = 0; i < works.length; i++) {
    const figure = works[i];

    const sectionGallery = document.querySelector(".gallery")
    const worksElement = document.createElement("figure")

    const imageElement = document.createElement("img");
    imageElement.src = figure.imageUrl;
    imageElement.alt = figure.title;
    
    const descriptionElement = document.createElement("figcaption");
    descriptionElement.innerText = figure.title;

    sectionGallery.appendChild(worksElement);
    worksElement.appendChild(imageElement);
    worksElement.appendChild(descriptionElement);
}