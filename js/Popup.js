class Popup {
  constructor(popupElement, api) {
    this.popupElement = popupElement;
    this.open = this.open.bind(this);
    this.api = api;
  }

  open() {
    this.popupElement.classList.add('popup_is-opened');
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



