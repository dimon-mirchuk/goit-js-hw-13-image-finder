import './sass/main.scss';
import galleryTmp from './templates/gallery.hbs';
import apiService from './js/APIservice';
import getRefs from './js/getRefs';

import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/Material.css';
import { alert, notice, info, success, error } from '@pnotify/core';

const refs = getRefs();

refs.searchForm.addEventListener('submit', onSearch);
refs.resetBtn.addEventListener('click', onReset);

const options = {
  rootMargin: '300px',
};
const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      onLoadMore();
    }
  });
};
const observer = new IntersectionObserver(onEntry, options);

let pageCounter = 1;
let searchQuery = '';

async function onSearch(e) {
  e.preventDefault();
  if (refs.searchInput.value === '') {
    return alert({
      title: 'Empty field',
      text: 'Please, enter word!',
    });
  }
  refs.galleryList.innerHTML = '';

  searchQuery = refs.searchInput.value;
  pageCounter = 1;
  const getData = await apiService(searchQuery, pageCounter);
  renderGallery(getData);
  if (!getData.total) {
    return error({
      title: 'Something going wrong!',
      text: 'Please, enter another word!',
    });
  }
  observer.observe(refs.observeElem);
  refs.searchInput.value = '';
}

async function onLoadMore() {
  if (!refs.galleryList.innerHTML) return;
  pageCounter += 1;
  const getData = await apiService(searchQuery, pageCounter);
  renderGallery(getData);
  if (!getData.total) {
    return error({
      title: 'Something going wrong!',
      text: 'Please, enter another word!',
    });
  }
}

function renderGallery(data) {
  refs.galleryList.insertAdjacentHTML('beforeend', galleryTmp(data));
}

const imageModal = e => {
  if (e.target.dataset.src === undefined) return;
  basicLightbox.create(`<img src="${e.target.dataset.src}" alt="${e.target.alt}" />`).show();
};

refs.galleryList.addEventListener('click', imageModal);

function onReset(event) {
  event.preventDefault();
  refs.galleryList.innerHTML = '';
  refs.searchInput.value = '';
}
