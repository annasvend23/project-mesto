export class Popup {
  constructor(popupElement, api) {
    this.popupElement = popupElement;
    this.formErrorContainer = popupElement.querySelector('.popup__form-error');
    this.open = this.open.bind(this);
    this.api = api;
  }

  open() {
    this.popupElement.classList.add('popup_is-opened');
    this.formErrorContainer.textContent = '';
  }

  close() {
    this.popupElement.classList.remove('popup_is-opened');
  }

  addCloseListener() {
    this.popupElement
    .querySelector('.popup__close')
    .addEventListener('click', this.close.bind(this));
  }
}



