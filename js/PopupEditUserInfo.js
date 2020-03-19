class PopupEditUserInfo extends Popup {
  constructor(popupElement, api, formValidatorEditProfile, userInfo) {
    super(popupElement, api);
    this.userInfo = userInfo;
    this.form = popupElement.querySelector('form');
    this.userName = this.form.elements.username;
    this.job = this.form.elements.job;
    this.button = this.form.querySelector('.popup__button_save');
    this.formValidatorEditProfile = formValidatorEditProfile;

    this.form.addEventListener('submit', (event) => {
      this.renderLoading(true);
      this.submit(event);
    })
  }

  submit(event) {
    event.preventDefault();
    const newUserInfo = {
      userName: this.userName.value,
      job: this.job.value,
    }
    this.api.changeUserInfo(newUserInfo)
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

  open() {
    super.open();
    const userData = this.userInfo.getUserInfo();
    this.userName.value = userData.userName;
    this.job.value = userData.job;
  }

  close() {
    super.close();
    this.form.reset();
    this.formValidatorEditProfile.resetErrors();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this.button.textContent = 'Загрузка...';
    } else {
      this.button.textContent = 'Сохранить';
    }
  }
}