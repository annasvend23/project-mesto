import { Api } from './Api';
import { Card } from './Card';
import { CardsList } from './CardsList';
import { FormValidator } from './FormValidator';
import { PopupAddCard } from './PopupAddCard';
import { PopupEditUserAvatar } from './PopupEditUserAvatar';
import { PopupEditUserInfo } from './PopupEditUserInfo';
import { PopupFullImage } from './PopupFullImage';
import { PopupSignUp } from './PopupSignUp';
import { PopupLogIn } from './PopupLogIn';
import { UserInfo } from './UserInfo';
import '../pages/index.css';


const placesList = document.querySelector('.places-list');

const popupEditProfile = document.querySelector('.popup__edit-profile');
const popupCustomCard = document.querySelector('.popup__custom-card');
const popupOpenImage = document.querySelector('.popup__open-image');
const popupSignUp = document.querySelector('.popup__sign-up');
const popupLogIn = document.querySelector('.popup__log-in');
const popupEditAvatar = document.querySelector('.popup__edit-avatar');
const profile = document.querySelector('.profile');
const stub = document.querySelector('.stub');

const popupFormAddCard = document.forms.new;
const popupFormUserInfoEdit = document.forms.edit;
const popupFormEditAvatar = document.forms.editavatar;
const popupFormSignUp = document.forms.signup;
const popupFormLogIn = document.forms.login;

const addCardButton = document.querySelector('.user-info__button');
const fullImage = document.querySelector('.popup__full-image');
const signUpButton = document.querySelector('.button__sign-up');
const logInButton = document.querySelector('.button__log-in');
const logOutButton = document.querySelector('.button__log-out');

const isDev = process.env.NODE_ENV === 'development';
const baseUrl = isDev ? 'http://localhost:3000' : 'https://api.project-mesto.host';

const api = new Api({
  baseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

let userInfo;
let cardList;
const ERROR_MESSAGES = {
  valueMissing: 'Это обязательное поле',
  tooShort: 'Должно быть от 2 до 30 символов',
  tooLong: 'Должно быть от 2 до 30 символов',
  password: {
    tooShort: 'Минимальная длина 8 символов'
  },
  email: {
    typeMismatch: 'Неверный email',
  },
  avatar: {
    typeMismatch: 'Неверная ссылка',
  }
};


const formValidatorAddCard = new FormValidator(popupFormAddCard, ERROR_MESSAGES);
const formValidatorEditProfile = new FormValidator(popupFormUserInfoEdit, ERROR_MESSAGES);
const formValidatorEditAvatar = new FormValidator(popupFormEditAvatar, ERROR_MESSAGES);
const formValidatorSignUp = new FormValidator(popupFormSignUp, ERROR_MESSAGES);
const formValidatorLogIn = new FormValidator(popupFormLogIn, ERROR_MESSAGES);

const popupFullImage = new PopupFullImage(popupOpenImage, api, fullImage);
const popupUserSignUp = new PopupSignUp(popupSignUp, api, formValidatorSignUp);
const popupUserLogIn = new PopupLogIn(popupLogIn, api, formValidatorLogIn, signUpButton, logInButton, logOutButton);

popupUserSignUp.addOpenPopupsListeners(signUpButton);
popupUserLogIn.addOpenPopupsListeners(logInButton);

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

const isAuthorized = getCookie('isAuthorized');

if (isAuthorized) {

  logInButton.classList.add('button_hidden');
  signUpButton.classList.add('button_hidden');
  logOutButton.classList.remove('button_hidden');
  profile.classList.remove('block_hidden');
  stub.classList.add('block_hidden');


  logOutButton.addEventListener('click', () => api.logout().then(() => document.location.reload(false)));

  api.getUserInfo()
  .then((apiUserInfo) => {
    userInfo = new UserInfo(document.querySelector('.user-info'), apiUserInfo.data);
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
    cardList = new CardsList(placesList, initialCards.data, createCard, addCardButton, api, userInfo);
    const popupAddCard = new PopupAddCard(popupCustomCard, api, formValidatorAddCard, cardList);
    popupAddCard.addCloseListener();
    cardList.render();
    cardList.addListeners(popupAddCard, popupFullImage);
  })
  .catch((err) => {
    console.log(err);
  });
}

popupFullImage.addCloseListener();
popupUserSignUp.addCloseListener();
popupUserLogIn.addCloseListener();

