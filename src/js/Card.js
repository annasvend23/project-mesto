export class Card {
  constructor(cardData, api, userInfo) {
    this.api = api;
    this.userInfo = userInfo;
    this.cardElement = this.create(cardData);
  }

  static openPopupFullImage(event, popupFullImage) {
    const placeCardImage = event.target;
    const backgroundStyleStr = placeCardImage.getAttribute('style');
    const link = backgroundStyleStr.substring(22, backgroundStyleStr.length - 1);
    popupFullImage.setImage(link);
    popupFullImage.open();
  }

  static like(event, api) {
    const cardId = event.target.closest('.place-card').dataset.id;

    if (event.target.classList.contains('place-card__like-icon_liked')) {
      api.removeLike(cardId)
        .then((res) => {
          event.target.classList.remove('place-card__like-icon_liked');
          event.target.parentElement.querySelector('.place-card__like-counter').textContent = res.likes.length;
        })
    } else {
      api.setLike(cardId)
        .then((res) => {
          event.target.classList.add('place-card__like-icon_liked');
          event.target.parentElement.querySelector('.place-card__like-counter').textContent = res.likes.length;
        });
    }
  }

  static remove(event, api) {
    event.stopPropagation();
    const cardId = event.target.closest('.place-card').dataset.id;
    if (window.confirm("Вы действительно хотите удалить эту карточку?")) {
      api.deleteCard(cardId)
        .then(() => event.target.closest('.place-card').remove())
    }
  }

  create({ likes, _id: cardId, link, name, owner }) {
    const userId = this.userInfo.getUserInfo()._id;
    const placeCard = document.createElement('div');
    placeCard.classList.add('place-card');
    placeCard.dataset.id = cardId;
    const placeCardImage = document.createElement('div');
    placeCardImage.classList.add('place-card__image');
    placeCardImage.setAttribute('style', `background-image: url(${link})`);
    const placeCardDeleteIcon = document.createElement('button');
    placeCardDeleteIcon.classList.add('place-card__delete-icon');
    const placeCardDescription = document.createElement('div');
    placeCardDescription.classList.add('place-card__description');
    const placeCardName = document.createElement('h3');
    placeCardName.classList.add('place-card__name');
    placeCardName.textContent = name;
    const placeCardLikeContainer = document.createElement('div');
    placeCardLikeContainer.classList.add('place-card__like-container');
    const placeCardLikeIcon = document.createElement('button');
    placeCardLikeIcon.classList.add('place-card__like-icon');
    const placeCardLikeCounter = document.createElement('p');
    placeCardLikeCounter.classList.add('place-card__like-counter');
    placeCardLikeCounter.textContent = likes.length;

    if (owner._id !== userId) {
      placeCardDeleteIcon.classList.add('place-card__delete-icon_hidden');
    }

    for (const element of likes) {
      if (element._id === userId) {
        placeCardLikeIcon.classList.add('place-card__like-icon_liked');
      }
    }

    placeCard.appendChild(placeCardImage);
    placeCard.appendChild(placeCardDescription);
    placeCardImage.appendChild(placeCardDeleteIcon);
    placeCardDescription.appendChild(placeCardName);
    placeCardDescription.appendChild(placeCardLikeContainer);
    placeCardLikeContainer.appendChild(placeCardLikeIcon);
    placeCardLikeContainer.appendChild(placeCardLikeCounter);

    return placeCard;
  }

  static handleClick(event, popupFullImage, api) {
    if (event.target.classList.contains('place-card__delete-icon')) {
      Card.remove(event, api);
    }
    if (event.target.classList.contains('place-card__like-icon')) {
      Card.like(event, api);
    }
    if (event.target.classList.contains('place-card__image')) {
      Card.openPopupFullImage(event, popupFullImage);
    }
  }
}


