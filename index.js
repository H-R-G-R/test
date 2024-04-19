const cardList = document.querySelector('.js-card-list');
const loadMore = document.querySelector('.js-load-more');
let userId = 1;

loadMore.addEventListener('click', onLoadMore);

serverMovie()
  .then(data => {
    console.log(data);
    cardList.insertAdjacentHTML('beforeend', createMarkup(data));

    loadMore.classList.replace('load-more-hidden', 'load-more');
  })
  .catch(err => console.log(err));

function serverMovie(userId = 1) {
  const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

  return fetch(`${BASE_URL}?userId=${userId}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

function createMarkup(arr) {
  return arr
    .map(
      ({ id, title, body }) => `
  <li class="card">
  <img src="https://optima.school/img/default.jpg" alt="${title}" >
  <div  class="card-info">
  <h2>${title}</h2>
  <p>Number: ${id}</p>
  
  <div class="btn-block">
  <button type="button">Сhange</button>
  <button type="button"">Remove</button>
  </div>
  </div>
  </li>
  `
    )
    .join('');
}

function onLoadMore() {
  userId += 1;

  serverMovie(userId).then(data => {
    cardList.insertAdjacentHTML('beforeend', createMarkup(data));
  });
}
