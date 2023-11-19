import {getPhotos} from './js/pixabay-api';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { searchForm, galleryContainer, input, loadMoreBtn } from "./js/refs";
import {onRenderGallery} from './js/markup';

let userInput;
let arrPhotos = [];
let totalPhoto = 0;
let page = 1;
// let perPage = 40;
getPhotos();

async function getData(userInput, page) {
  try {
    const response = await getPhotos(userInput, page)
    totalPhoto = response.totalHits;
    arrPhotos = response.hits;
    galleryContainer.insertAdjacentHTML('beforeend', onRenderGallery(arrPhotos))
    
    const lightbox = new SimpleLightbox('.gallery a', {
          captionsData: 'alt',
          captionDelay: 250,
        });

  } catch (error) {
    console.log(error)
    Notiflix.Notify.failure(`❌ You have arror!… `);
  }
}

// console.log(getData('cat'));

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  galleryContainer.innerHTML = '';
  page= 1;
  // perPage = 40;

  userInput = input.value.trim();
  await getData(userInput, page);

  if (arrPhotos.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
  )
  loadMoreBtn.classList.add('is-hidden')

}else {
    Notiflix.Notify.success(`Yes! We found ${totalPhoto} images.`);  
  
  loadMoreBtn.classList.remove('is-hidden');
}
})

loadMoreBtn.addEventListener('click', async () => {

  const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

   window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
  });

  page += 1;
  await getData(userInput, page);

  if(arrPhotos.length === 0) {
    Notiflix.Notify.info(
      `We're sorry, but you've reached the end of search results.`
    );
    loadMoreBtn.classList.add('is-hidden');
  }

  // if(arrPhotos.length < perPage) 

});
