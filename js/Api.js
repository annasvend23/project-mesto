class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }
  //  Отлично!
  // Повторяющийся код вынесен в отдельный статический метод
  static handleRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'GET',
      headers: this.headers,
    })
      .then(Api.handleRes)
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: this.headers,
    })
      .then(Api.handleRes)
  }

  changeUserInfo(newUserInfo) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: newUserInfo.userName,
        about: newUserInfo.job,
      })
    })
      .then(Api.handleRes)
  }

  addNewCard(cardItem) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: cardItem.name,
        link: cardItem.link,
      })
    })
      .then(Api.handleRes)
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    })
  }

  setLike(cardId) {
    return fetch(`${this.baseUrl}/cards/like/${cardId}`, {
      method: 'PUT',
      headers: this.headers,
    })
      .then(Api.handleRes)
  }

  removeLike(cardId) {
    return fetch(`${this.baseUrl}/cards/like/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then(Api.handleRes)
  }

  changeAvatar(link) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: link,
      })
    })
      .then(Api.handleRes)
  }
}