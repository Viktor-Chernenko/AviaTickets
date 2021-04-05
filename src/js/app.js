import './plugins';
import '../css/style.css';
import locations from './store/locations';
import favoritesStore from './store/favorites';
import favoritesLocal from './views/favoritesLocal';
import formUI from './views/form';
import ticketsUI from './views/tickets';
import currencyUI from './views/currency';

document.addEventListener('DOMContentLoaded', () => {
  initApp();
  const form = formUI.form;
  const ticketsSections = favoritesLocal.ticketsSections;
  const dropdown1 = favoritesLocal.dropdown1;

  //Events
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    onFormSubmit();
  })

  ticketsSections.addEventListener('click', (e) => {
    e.preventDefault();
    const thisItem = e.target;

    if (thisItem.classList.contains('add-favorite')) {
      favoritesStore.setFavoritesLocal(thisItem.closest('.ticket-card'));
      const data = favoritesLocal.getData();

      favoritesLocal.setFavoritesLocal(data);
    }
  })

  window.addEventListener('click', (e) => {
    if (!e.target.closest('.favorites')) {
      dropdown1.classList.remove('visible');
    } else {
      if (!dropdown1.children.length) {
        favoritesLocal.MsgEmptyDropdown();
      }
      dropdown1.classList.add('visible');

      if (e.target.classList.contains('delete-favorite')) {
        const itemFavoritesBox = e.target.closest('.favorite-item');
        favoritesLocal.removeFavoritesElement(itemFavoritesBox);
      }
    }
  })

  // Handlers
  async function initApp() {
    await locations.init();
    formUI.setAutocompleteDate(locations.shortCitiesList);
  }

  async function onFormSubmit() {
    // собрать данные

    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currencyValue;

    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency
    })

    ticketsUI.renderTickets(locations.lastSearch);

  }

  // local

  favoritesStore.favoritesLocalCheck();
  favoritesLocal.innerFavorites();

})