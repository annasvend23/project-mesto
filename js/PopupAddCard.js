class PopupAddCard extends Popup {
  constructor(popupElement, api, formValidatorAddCard, cardList) {
    super(popupElement, api);
    this.cardList = cardList;
    this.form = popupElement.querySelector('form');
    this.button = this.form.querySelector('.popup__button_add');
    this.formValidatorAddCard = formValidatorAddCard;

    this.form.addEventListener('submit', (event) => {
      this.renderLoading(true);
      this.submit(event);
    })
  }

  submit(event) {
    event.preventDefault();
    const inputName = this.form.elements.name;
    const inputUrl = this.form.elements.link;
    const cardItem = {
      name: inputName.value,
      link: inputUrl.value,
    }
    this.api.addNewCard(cardItem)
      .then((cardData) => {
        this.cardList.addCard(cardData);
        this.close();
        this.form.reset();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => this.renderLoading(false));
  }

  close() {
    super.close();
    this.form.reset();
    this.formValidatorAddCard.resetErrors();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this.button.textContent = 'Загрузка...';
      this.button.classList.add('popup__button_loading');
    } else {
      this.button.textContent = '+';
      this.button.classList.remove('popup__button_loading');
    }
  }
}