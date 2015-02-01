import createStore from 'fluxible/utils/createStore';

import { RECEIVE_PHOTOS, SET_CURRENT_PHOTO } from '../actions';

export default createStore({

  storeName: 'PhotosStore',
  
  initialize(dispatcher) {
    this.photos = [];
    this.current_photo = 0;
  },
  
  handleReceivePhotos(photos) {
    this.photos = photos;
    this.emitChange();
  },

  handleSetCurrentPhoto(current_photo) {
    this.current_photo = current_photo;
    this.emitChange();
  },
  
  handlers: {
    [RECEIVE_PHOTOS]: 'handleReceivePhotos',
    [SET_CURRENT_PHOTO]: 'handleSetCurrentPhoto'
  },
  
  getState() {
    return {
      photos: this.photos,
      current_photo: this.current_photo
    };
  },
  
  dehydrate() {
    return this.getState();
  },
  
  rehydrate(state) {
    this.photos = state.photos;
    this.current_photo = state.current_photo;
  }
});