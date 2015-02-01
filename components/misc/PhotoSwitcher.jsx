import React from 'react';
import IntlMixin from 'react-intl';
import { StoreMixin } from 'fluxible';

import PhotosStore from '../../stores/PhotosStore';

import config from '../../config/app';
import getPhotos from '../../actions/getPhotos';
import setCurrentPhoto from '../../actions/setCurrentPhoto';
import { navigateAction } from 'flux-router-component';
import env from '../../utils/env';

import Select from '../form/Select.jsx';

const LocaleSwitcher = React.createClass({

  mixins: [IntlMixin, StoreMixin],

  statics: {
    storeListeners: [PhotosStore]
  },

  getInitialState() {
    return this.getStore(PhotosStore).getState();
  },

  onChange() {
    const state = this.getStore(PhotosStore).getState();
    this.setState(state);
  },

  handlePhotoChange(e) {
    // this.props.context.executeAction(setCurrentPhoto, {current_photo: e.target.value});
    this.props.context.executeAction(navigateAction, {
      url: '/photo/' + e.target.value
    });
  },

  render() {
    const {current_photo, photos} = this.state;

    return (
      <div className="photo-switcher">
        <label>
          <Select 
              defaultValue={current_photo} 
              onChange={this.handlePhotoChange}>
            {
              photos.map((photo, idx) => {

                // bug with server side rendering:
                // https://github.com/facebook/react/issues/1398
                return (
                  <option key={idx} value={idx} 
                    selected={current_photo === idx}>
                    {photo.name}
                  </option>
                )
              })
            }
          </Select>
        </label>
      </div>
    );
  }

});

export default LocaleSwitcher;