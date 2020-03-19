class PopupFullImage extends Popup {
  constructor(popupElement, api, fullImage) {
    super(popupElement, api);
    this.fullImage = fullImage;
  }
  
  setImage(link) {
    this.fullImage.setAttribute('src', link);
  }
}