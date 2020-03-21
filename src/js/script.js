import { Api } from './Api';
import { Card } from './Card';
import { CardsList } from './CardsList';
import { FormValidator } from './FormValidator';
import { PopupAddCard } from './PopupAddCard';
import { PopupEditUserAvatar } from './PopupEditUserAvatar';
import { PopupEditUserInfo } from './PopupEditUserInfo';
import { PopupFullImage } from './PopupFullImage';
import { UserInfo } from './UserInfo';
import '../pages/index.css';


const placesList = document.querySelector('.places-list');
const popupFormUserInfoEdit = document.forms.edit;
const popupEditProfile = document.querySelector('.popup__edit-profile');
const popupCustomCard = document.querySelector('.popup__custom-card');
const popupOpenImage = document.querySelector('.popup__open-image');
const popupFormAddCard = document.forms.new;
const fullImage = document.querySelector('.popup__full-image');
const addCardButton = document.querySelector('.user-info__button');
const popupEditAvatar = document.querySelector('.popup__edit-avatar');
const popupFormEditAvatar = document.forms.avatar;
const isDev = process.env.NODE_ENV === 'development';
const baseUrl = isDev ? 'http://praktikum.tk/cohort8' : 'https://praktikum.tk/cohort8';


const api = new Api({
  baseUrl,
  headers: {
    authorization: 'a1cfafdf-b238-41bc-8545-b138968ec236',
    'Content-Type': 'application/json'
  }
});

let userInfo;
let cardList;
const ERROR_MESSAGES = {
  valueMissing: 'Это обязательное поле',
  tooShort: 'Должно быть от 2 до 30 символов',
  tooLong: 'Должно быть от 2 до 30 символов',
  typeMismatch: 'Здесь должна быть ссылка'
}
const formValidatorAddCard = new FormValidator(popupFormAddCard, ERROR_MESSAGES);
const formValidatorEditProfile = new FormValidator(popupFormUserInfoEdit, ERROR_MESSAGES);
const formValidatorEditAvatar = new FormValidator(popupFormEditAvatar, ERROR_MESSAGES);
const popupFullImage = new PopupFullImage(popupOpenImage, api, fullImage);


api.getUserInfo()
  .then((apiUserInfo) => {
    userInfo = new UserInfo(document.querySelector('.user-info'), apiUserInfo);
    const popupEditUserInfo = new PopupEditUserInfo(popupEditProfile, api, formValidatorEditProfile, userInfo);
    const popupEditUserAvatar = new PopupEditUserAvatar(popupEditAvatar, api, formValidatorEditAvatar, userInfo);
    userInfo.updateUserInfo();
    userInfo.addOpenPopupsListeners(popupEditUserAvatar, popupEditUserInfo);
    popupEditUserInfo.addCloseListener();
    popupEditUserAvatar.addCloseListener();
  })
  .catch((err) => {
    console.log(err);
  });

function createCard(cardData) {
  return new Card(cardData, api, userInfo);
}


api.getInitialCards()
  .then((initialCards) => {
    cardList = new CardsList(placesList, initialCards, createCard, addCardButton, api, userInfo);
    const popupAddCard = new PopupAddCard(popupCustomCard, api, formValidatorAddCard, cardList);
    popupAddCard.addCloseListener();
    cardList.render();
    cardList.addListeners(popupAddCard, popupFullImage);
  })
  .catch((err) => {
    console.log(err);
  });

popupFullImage.addCloseListener();

