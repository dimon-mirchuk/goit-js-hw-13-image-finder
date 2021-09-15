export default function getRefs() {
    return {
        searchForm: document.querySelector('#search-form'),
        galleryList: document.querySelector('.gallery'),
        searchInput: document.querySelector("[data-action='input']"),
        resetBtn: document.querySelector("[data-action='reset']"),
        galleryContainer: document.querySelector('.images-list'),
        observeElem: document.querySelector('#observe-element')
    }
}