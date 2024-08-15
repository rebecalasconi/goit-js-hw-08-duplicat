"use strict";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);
const galleryContainer = document.querySelector(".gallery");

const createGalleryMarkup = (items) => {
    return items
    .map((item) => {
    const { preview, original, description } = item;
    return `
    <li class="gallery__item">
   <a class="gallery__link" href="${original}">
      <img class="gallery__image" src="${preview}" alt="${description}" title="${description}" />
   </a>
</li>`;
    })
    .join("");
};

const renderGallery = () => {
    galleryContainer.innerHTML = createGalleryMarkup(galleryItems);
};

renderGallery();


console.log(galleryItems);

function onGallleryClick(event) {
    event.preventDefault();
    const isGalleryImg = event.target.classList.contains("gallery__image");

    if(!isGalleryImg) return;

    const imgSource = event.target.dataset.source;
    new SimpleLightbox('.gallery a', { captionDelay: 250, captionPosition: 'bottom', captionData: 'alt' });

}


galleryContainer.addEventListener("click", onGallleryClick);