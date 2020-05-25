import { Popup } from './Popup';

export class PopupLogIn extends Popup {
  constructor(popupElement, api, formValidatorLogIn) {
    super(popupElement, api);
    this.form = popupElement.querySelector('form');
    this.submitButton = this.form.querySelector('.popup__button_log-in');
    this.formValidatorLogIn = formValidatorLogIn;
    this.formErrorContainer = popupElement.querySelector('.popup__form-error');

    this.form.addEventListener('submit', (event) => {
      this.renderLoading(true);
      this.submit(event);
    })
  }

  submit(event) {
    event.preventDefault();
    const inputEmail = this.form.elements.email;
    const inputPassword = this.form.elements.password;

    const loginInfo = {
      email: inputEmail.value,
      password: inputPassword.value,
    }

    this.api.login(loginInfo)
      .then((userData) => {
        this.close();
        this.form.reset();
        document.location.reload(false);
      })
      .catch((err) => {
        this.formErrorContainer.textContent = err.message;
      })
      .finally(() => this.renderLoading(false));
  }

  close() {
    super.close();
    this.form.reset();
    this.formValidatorLogIn.resetErrors();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this.submitButton.textContent = 'Загрузка...';
      this.submitButton.classList.add('popup__button_loading');
    } else {
      this.submitButton.textContent = 'Войти';
      this.submitButton.classList.remove('popup__button_loading');
    }
  }

  addOpenPopupsListeners(logInButton) {
    logInButton.addEventListener('click', this.open);
  }
}