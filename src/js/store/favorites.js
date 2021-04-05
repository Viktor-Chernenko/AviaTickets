class FavoritesStore {
  constructor() {
    this.data = {};
  }
  favoritesLocalCheck() {
    if (localStorage.getItem('favoritesStoreLocal') && localStorage.getItem('favoritesStoreLocal').length) {
      this.data = JSON.parse(localStorage.getItem('favoritesStoreLocal'));
    }
  }

  getFavoritesData() {
    return this.data;
  }


  setFavoritesLocal(item) {
    let dataCheck = false;
    const newFavoritesObj = {
      icon: item.querySelector('.ticket-airline-img').getAttribute('src'),
      origin_name: item.querySelectorAll('.ticket-destination .ticket-city')[0].textContent,
      destination_name: item.querySelectorAll('.ticket-destination .ticket-city')[1].textContent,
      departure_at: item.querySelector('.ticket-time-departure').textContent,
      price: item.querySelector('.ticket-price').textContent,
      transfers: item.querySelector('.ticket-transfers').textContent,
      flight_number: item.querySelector('.ticket-flight-number').textContent,
      idFavorite: `${item.querySelectorAll('.ticket-destination .ticket-city')[0].textContent}//${item.querySelectorAll('.ticket-destination .ticket-city')[1].textContent}//${item.querySelector('.ticket-time-departure').textContent}//${item.querySelector('.ticket-flight-number').textContent}//${item.querySelector('.ticket-transfers').textContent}`
    }

    if (!Object.keys(this.data).length) {
      this.data[newFavoritesObj.idFavorite] = newFavoritesObj;
    } else {
      Object.keys(this.data).forEach(key => {
        if (newFavoritesObj.idFavorite === this.data[key].idFavorite) {
          dataCheck = true;
        }
      });

      if (!dataCheck) {
        this.data[newFavoritesObj.idFavorite] = newFavoritesObj;
      }
    }
  }
}

const favoritesStore = new FavoritesStore();

export default favoritesStore;