import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

// init

const select = document.querySelectorAll('select');
M.FormSelect.init(select);

export function getSelectInstance(select) {
  return M.FormSelect.getInstance(select);
}

// init autocomplete

const autocomplete = document.querySelectorAll('.autocomplete');
M.Autocomplete.init(autocomplete, {
  data: {
    "Apple": null,
    "Microsoft": null,
    "Google": 'https://placehold.it/250x250'
  },
});

export function getAutocompleteInstance(autocomplete) {
  return M.Autocomplete.init(autocomplete);
}

// Init datepicker
const datepicker = document.querySelectorAll('.datepicker');
M.Datepicker.init(datepicker, {
  showClearBtn: true,
  format: 'yyyy-mm',
});

export function getDatePickerInstance(elem) {
  return M.Datepicker.getInstance(elem);
}