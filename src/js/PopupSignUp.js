import { Popup } from './Popup';

export class PopupSignUp extends Popup {
  constructor(popupElement, api, formValidatorSignUp) {
    super(popupElement, api);
    this.form = popupElement.querySelector('form');
    this.button = this.form.querySelector('.popup__button_sign-up');
    this.formValidatorSignUp = formValidatorSignUp;
    this.formErrorContainer = popupElement.querySelector('.popup__form-error');

    this.form.addEventListener('submit', (event) => {
      this.renderLoading(true);
      this.submit(event);
    })
  }

  submit(event) {
    event.preventDefault();
    const inputName = this.form.elements.name;
    const inputAbout = this.form.elements.about;
    const inputAvatarLink = this.form.elements.avatar;
    const inputEmail = this.form.elements.email;
    const inputPassword = this.form.elements.password;

    const newUser = {
      name: inputName.value,
      about: inputAbout.value,
      avatar: inputAvatarLink.value,
      email: inputEmail.value,
      password: inputPassword.value,
    }

    this.api.addNewUser(newUser)
      .then((userData) => {
        this.close();
        this.form.reset();
        document.location.reload(false);
      })
      .catch((err) => {
        this.formErrorContainer.textContent = err.message;
      })
      .finally(() => {
        this.renderLoading(false);
      });
  }

  close() {
    super.close();
    this.form.reset();
    this.formValidatorSignUp.resetErrors();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this.button.textContent = 'Загрузка...';
      this.button.classList.add('popup__button_loading');
    } else {
      this.button.textContent = 'Регистрация';
      this.button.classList.remove('popup__button_loading');
    }
  }

  addOpenPopupsListeners(signUpButton) {
    signUpButton.addEventListener('click', this.open);
  }
}