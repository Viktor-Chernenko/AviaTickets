import favoritesStore from '../store/favorites';

class FavoritesLocal {
  constructor() {
    this.data = {};
    this.ticketsSections = document.querySelector('.tickets-sections');
    this.dropdown1 = document.querySelector('#dropdown1');
    this.favorites = document.querySelector('.favorites');
  }

  MsgEmptyDropdown() {
    const fragment = `<div class="favorites-empty-res-msg">
        В избранном нет билетов 
      </div>`
    this.dropdown1.insertAdjacentHTML('afterbegin', fragment);
  }

  getData() {
    this.data = favoritesStore.getFavoritesData();
    return this.data;
  }

  removeFavoritesElement(element) {
    const dataIdFavorite = element.getAttribute('data-id-favorite');
    delete this.data[dataIdFavorite];
    delete favoritesStore.data[dataIdFavorite];
    localStorage.setItem('favoritesStoreLocal', JSON.stringify(this.getData()));
    element.remove();
  }

  innerHtmlElem() {
    this.data = this.getData();
    let fragment = '';

    Object.keys(this.data).forEach(element => {
      fragment += this.favoritesTemplate(this.data[element]);
    });
    
    return fragment;
  }

  setFavoritesLocal() {
    this.innerFavorites();
    localStorage.setItem('favoritesStoreLocal', JSON.stringify(this.getData()));
  }

  innerFavorites() {
    this.dropdown1.innerHTML = '';
    this.dropdown1.insertAdjacentHTML('afterbegin', this.innerHtmlElem());
  }

  // {icon,origin_name,destination_name,departure_at,price,transfers,flight_number}

  favoritesTemplate(dataItem) {
    return `
      <div class="favorite-item  d-flex align-items-start" data-id-favorite="${dataItem.idFavorite}">
        <img
          src="${dataItem.icon}"
          class="favorite-item-airline-img"
        />
        <div class="favorite-item-info d-flex flex-column">
          <div
            class="favorite-item-destination d-flex align-items-center"
          >
            <div class="d-flex align-items-center mr-auto">
              <span class="favorite-item-city">${dataItem.origin_name} </span>
              <i class="medium material-icons">flight_takeoff</i>
            </div>
            <div class="d-flex align-items-center">
              <i class="medium material-icons">flight_land</i>
              <span class="favorite-item-city">${dataItem.destination_name}</span>
            </div>
          </div>
          <div class="ticket-time-price d-flex align-items-center">
            <span class="ticket-time-departure">${dataItem.departure_at}</span>
            <span class="ticket-price ml-auto">${dataItem.price}</span>
          </div>
          <div class="ticket-additional-info">
            <span class="ticket-transfers">${dataItem.transfers}</span>
            <span class="ticket-flight-number">${dataItem.flight_number}</span>
          </div>
          <a
            class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto"
            >Delete</a
          >
        </div>
      </div>
    `
  }
}

const favoritesLocal = new FavoritesLocal();

export default favoritesLocal;