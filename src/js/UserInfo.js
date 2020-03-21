export class UserInfo {
  constructor(userElement, userInfo) {
    this.userNameElement = userElement.querySelector('.user-info__name');
    this.jobElement = userElement.querySelector('.user-info__job');
    this.avatarElement = userElement.querySelector('.user-info__photo');
    this.userName = userInfo.name;
    this.job = userInfo.about;
    this.avatarLink = userInfo.avatar;
    this._id = userInfo._id;
    this.avatar = userElement.querySelector('.user-info__photo');
    this.editButton = userElement.querySelector('.user-info__edit');
  }

  getUserInfo() {
    return {
      userName: this.userName,
      job: this.job,
      _id: this._id,
    }
  }

  setUserInfo(newUserInfo) {
    this.userName = newUserInfo.name;
    this.job = newUserInfo.about;
    this.avatarLink = newUserInfo.avatar;
  }

  updateUserInfo() {
    this.userNameElement.textContent = this.userName;
    this.jobElement.textContent = this.job;
    this.avatarElement.style.backgroundImage = `url(${this.avatarLink})`;
  }

  addOpenPopupsListeners(popupEditUserAvatar, popupEditUserInfo) {
    this.avatar.addEventListener('click', popupEditUserAvatar.open);
    this.editButton.addEventListener('click', popupEditUserInfo.open);
  }
}
