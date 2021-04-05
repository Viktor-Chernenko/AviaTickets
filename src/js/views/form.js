import { getAutocompleteInstance, getDatePickerInstance } from '../plugins/materialize';

class FormUI {
  constructor(autocompleteInstance, datePickerInstance) {
    this._form = document.forms['locationControls'];
    this.origin = document.querySelector('#autocomplete-origin');
    this.destination = document.querySelector('#autocomplete-destination');
    this.depart = document.querySelector('#datepicker-depart');
    this.return = document.querySelector('#datepicker-return');

    this.originAutocomplete = autocompleteInstance(this.origin);
    this.destinationAutocomplete = autocompleteInstance(this.destination);
    this.departDatePicker = datePickerInstance(this.depart);
    this.returnDatePicker = datePickerInstance(this.return);
  }

  get form() {
    return this._form;
  }

  get originValue() {
    return this.origin.value;
  }

  get destinationValue() {
    return this.destination.value;
  }

  get departDateValue() {
    return this.departDatePicker.toString();
  }

  get returnDateValue() {
    return this.returnDatePicker.toString();
  }

  setAutocompleteDate(data) {
    this.originAutocomplete.updateData(data);
    this.destinationAutocomplete.updateData(data);
  }
}

const formUI = new FormUI(getAutocompleteInstance, getDatePickerInstance);

export default formUI;