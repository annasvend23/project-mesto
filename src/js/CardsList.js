export class CardsList {
  constructor(container, cardsList, createCard, addCardButton, api, userInfo) {
    this.container = container;
    this.cardsList = cardsList;
    this.createCard = createCard;
    this.addCardButton = addCardButton;
    this.api = api;
    this.userInfo = userInfo;
  }

  addCard(cardData) {
    const card = this.createCard(cardData);
    this.container.appendChild(card.cardElement);
  }

  render() {
    for (const element of this.cardsList) {
      this.addCard(element);
    }
  }

  addListeners(popupAddCard, popupFullImage) {
    this.container.addEventListener('click', (event) => Card.handleClick(event, popupFullImage, this.api));
    this.addCardButton.addEventListener('click', popupAddCard.open);
  }
}
