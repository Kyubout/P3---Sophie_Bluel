//Récupération des works depuis l'API
const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

//Création des balises 
const figure = works[0]; 

const sectionGallery = document.querySelector(".gallery")
const worksElement = document.createElement("figure")

const imageElement = document.createElement("img");
imageElement.src = figure.imageUrl;

const descriptionElement = document.createElement("figcaption");
descriptionElement.innerText = figure.title;

sectionGallery.appendChild(worksElement);
worksElement.appendChild(imageElement);
worksElement.appendChild(descriptionElement);