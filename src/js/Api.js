export class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  static handleRes(res) {
    if (res.ok) {
      return res.json();
    }

    return res.json().then((res) => Promise.reject(res));
  }

  addNewUser(newUser) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: this.headers,
      credentials: 'include',
      body: JSON.stringify({
        name: newUser.name,
        about: newUser.about,
        avatar: newUser.avatar,
        email: newUser.email,
        password: newUser.password,
      })
    })
      .then(Api.handleRes)
  }

  login(loginInfo) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: this.headers,
      credentials: 'include',
      body: JSON.stringify({
        email: loginInfo.email,
        password: loginInfo.password,
      })
    })
      .then(Api.handleRes)
  }

  logout() {
    return fetch(`${this.baseUrl}/signout`, {
      method: 'POST',
      headers: this.headers,
      credentials: 'include',
    })
      .then(Api.handleRes)
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'GET',
      headers: this.headers,
      credentials: 'include',
    })
      .then(Api.handleRes)
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: this.headers,
      credentials: 'include',
    })
      .then(Api.handleRes)
  }

  changeUserInfo(newUserInfo) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      credentials: 'include',
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
      credentials: 'include',
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
      credentials: 'include',
    })
  }

  setLike(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this.headers,
      credentials: 'include',
    })
      .then(Api.handleRes)
  }

  removeLike(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this.headers,
      credentials: 'include',
    })
      .then(Api.handleRes)
  }

  changeAvatar(link) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      credentials: 'include',
      body: JSON.stringify({
        avatar: link,
      })
    })
      .then(Api.handleRes)
  }
}

