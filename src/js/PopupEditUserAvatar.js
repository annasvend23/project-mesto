import { Popup } from './Popup';

export class PopupEditUserAvatar extends Popup {
  constructor(popupElement, api, formValidatorEditAvatar, userInfo) {
    super(popupElement, api);
    this.userInfo = userInfo;
    this.form = popupElement.querySelector('form');
    this.avatar = this.form.elements.link;
    this.button = this.form.querySelector('.popup__button_save');
    this.formValidatorEditAvatar = formValidatorEditAvatar;

    this.form.addEventListener('submit', (event) => {
      this.renderLoading(true);
      this.submit(event);
    })
  }

  submit(event) {
    event.preventDefault();
    const link = this.form.elements.link.value;

    this.api.changeAvatar(link)
      .then((newUserInfo) => {
        this.userInfo.setUserInfo(newUserInfo);
        this.userInfo.updateUserInfo();
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
    this.formValidatorEditAvatar.resetErrors();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this.button.textContent = 'Загрузка...';
    } else {
      this.button.textContent = 'Сохранить';
    }
  }
}