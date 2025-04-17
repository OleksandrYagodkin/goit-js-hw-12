import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  gallery,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

const iconPath = new URL('./img/icon-error.svg', import.meta.url).href;

const form = document.querySelector('.form');
const loadMore = document.querySelector('.js-load-more');

loadMore.addEventListener('click', onLoadMore);

let page = 1;
let query = '';

console.dir(form);

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  enableKeyboard: true,
});

hideLoader();
hideLoadMoreButton();

form.addEventListener('submit', handleSearch);

async function handleSearch(event) {
  event.preventDefault();

  query = form.elements['search-text'].value.trim();

  if (!query) return;

  clearGallery();
  page = 1;
  showLoader();

  try {
    const { hits, totalHits } = await getImagesByQuery(query, page);

    if (hits.length === 0) {
      iziToast.info({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        backgroundColor: ' #ef4040',
        maxWidth: '434',
        messageColor: ' #fafafb',
        iconColor: ' #fafafb',
        iconUrl: iconPath,
      });
      hideLoadMoreButton();
      return;
    }

    gallery.innerHTML = createGallery(hits);
    lightbox.refresh();

    const totalPages = Math.ceil(totalHits / 15);
    if (page < totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        backgroundColor: '#4caf50',
        maxWidth: '434',
        messageColor: ' #fafafb',
        iconColor: ' #fafafb',
        iconUrl: iconPath,
      });
    }
  } catch (error) {
    iziToast.info({
      message: 'Something went wrong!',
      backgroundColor: ' #ef4040',
      maxWidth: '434',
      messageColor: ' #fafafb',
      iconColor: ' #fafafb',
      iconUrl: iconPath,
    });
  } finally {
    hideLoader();
  }

  form.reset();
}

async function onLoadMore() {
  page++;
  showLoader();
  loadMore.disabled = true;

  try {
    const { hits, totalHits } = await getImagesByQuery(query, page);
    gallery.insertAdjacentHTML('beforeend', createGallery(hits));
    lightbox.refresh();

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2.5,
      behavior: 'smooth',
    });

    const totalPages = Math.ceil(totalHits / 15);
    if (page >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        backgroundColor: '#4caf50',
        maxWidth: '434',
        messageColor: ' #fafafb',
        iconColor: ' #fafafb',
        iconUrl: iconPath,
      });
    }

    loadMore.disabled = false;
  } catch (error) {
    hideLoadMoreButton();
    iziToast.info({
      message: 'Something went wrong while loading more images!',
      backgroundColor: ' #ef4040',
      maxWidth: '434',
      messageColor: ' #fafafb',
      iconColor: ' #fafafb',
      iconUrl: iconPath,
    });
  } finally {
    hideLoader();
  }
}
