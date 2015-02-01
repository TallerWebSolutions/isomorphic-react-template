import React from 'react';
import IntlMixin from 'react-intl';
import { StoreMixin } from 'fluxible';
import { assign, random } from 'lodash';
import { BROWSER } from '../utils/env';
import PhotosStore from '../stores/PhotosStore';
import Caption from './photos/Caption.jsx';

const Home = React.createClass({
  mixins: [StoreMixin, IntlMixin],
  
  statics: {
    storeListeners: [PhotosStore]
  },

  getInitialState() {
    return this.getState();
  },

  onChange() {
    this.setState(this.getState());
  },

  getState() {
    const storeState = this.getStore(PhotosStore).getState();
    // return assign(storeState, {
    //   current_photo: 0
    // });
    return storeState;
  },

  render() {
    if (BROWSER) require('../style/components/home.scss');

    const { current_photo, photos } = this.state;
    const photo = photos[current_photo];

    return (
      <div className="home" 
        style={{backgroundImage: `url(${photo.image_url})`}}>
        <div className="home__caption">
          <Caption photo={photo} />
        </div>
      </div>
    );
  }
});

export default Home;