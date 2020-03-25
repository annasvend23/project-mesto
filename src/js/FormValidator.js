export class FormValidator {
  constructor(form, ERROR_MESSAGES) {
    this.form = form;
    this.button = this.form.querySelector('.button');
    this.ERROR_MESSAGES = ERROR_MESSAGES

    this.form.addEventListener('input', this.validate.bind(this));
  }

  checkInputValidity(input, error) {
    for (let key in this.ERROR_MESSAGES) {
      if (input.validity[key]) {
        return error.textContent = this.ERROR_MESSAGES[key];
      }
    }
    return error.textContent = '';
  }

  setSubmitButtonState() {
    this.button.disabled = !this.form.checkValidity();
  }

  validate(event) {
    this.checkInputValidity(event.target, event.target.parentElement.querySelector('.popup__input-error'));
    this.setSubmitButtonState();
  }

  resetErrors() {
    this.form.querySelectorAll('input').forEach((input) => {
      input.parentElement.querySelector('.popup__input-error').textContent = '';
    })
  }
}