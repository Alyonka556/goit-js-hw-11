
import {getPhotos} from './js/pixabay-api';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { searchForm, galleryContainer, input, loadMoreBtn } from "./js/refs";
import {onRenderGallery} from './js/markup';


let arrPhotos = [];
let totalPhoto = 0;
let page = 1;

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

  userInput = input.value;
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


});





// const pixabayApi = new PixabayApi(40);
// pixabayApi.fetchGallery().then(console.log);


// const onSearchFormElSubmit = event => {
//   event.preventDefault();

//   const { target: searchForm } = event;

//   pixabayApi.query = searchForm.elements.hitsEl;
//   pixabayApi.page = 1;

//   pixabayApi
//     .fetchGallery()
//     .then(({ data }) => {
//       console.log(data);

//       if (data.total === 0) {
//         galleryContainer.innerHTML = '';

//         loadMoreBtn.classList.add('is-hidden');

//         searchForm.reset();

//         return;
//       }

//       if (data.total_pages === 1) {
//         galleryContainer.innerHTML = renderMarkup(data.results);
//         loadMoreBtn.classList.add('is-hidden');

//         return;
//       }

//       galleryContainer.innerHTML = renderMarkup(data.results);
//       loadMoreBtn.classList.remove('is-hidden');
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

// const onLoadMoreBtnElClick = event => {
//   pixabayApi.page += 1;

//   pixabayApi
//     .fetchGallery()
//     .then(({ data }) => {
//       galleryContainer.insertAdjacentHTML('beforeend', createGalleryCardsTemplate(data.results));

//       if (data.total_pages === pixabayApi.page) {
//         loadMoreBtn.classList.add('is-hidden');
//       }
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

// searchForm.addEventListener('submit', onSearchFormElSubmit);
// loadMoreBtn.addEventListener('click', onLoadMoreBtnElClick);