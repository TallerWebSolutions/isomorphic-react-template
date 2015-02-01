import getPhotos from '../actions/getPhotos';
import setCurrentPhoto from '../actions/setCurrentPhoto';
import getI18n from '../actions/getI18n';
import {SET_CURRENT_PHOTO} from '../actions';
import { NavLink } from 'flux-router-component';


export default {

  home: {
    path: '/',
    method: 'get',
    page: 'home',
    label: 'Home',
    action: function(context, payload, done) {
      context.dispatch('UPDATE_PAGE_TITLE', {
        pageTitle: 'Home Page'
      });
      const locale = payload.navigate.locale;
      const photosPromise = new Promise((resolve, reject) => {
        context.executeAction(getPhotos, {}, resolve);
      });
      const i18nPromise = new Promise((resolve, reject) => {
        if (!locale) resolve();
        else context.executeAction(getI18n, {locale: locale}, resolve);
      });
      Promise.all([photosPromise, i18nPromise]).then(() => { done() }); 
    }
  },

  photo: {
    path: '/photo/:id',
    method: 'get',
    page: 'home',
    label: 'Photo',
    action: function(context, payload, done) {
      context.dispatch('UPDATE_PAGE_TITLE', {
        pageTitle: 'Photo | flux-examples | routing'
      });

      const locale = payload.navigate.locale;
      // Promessas a serem resolvidas.
      const photosPromise = new Promise((resolve, reject) => {
        context.executeAction(getPhotos, {}, function () {
          // Set the current selected photo.
          context.executeAction(setCurrentPhoto, {
            current_photo: payload.params.id
          }, resolve);
        });
      });

      const i18nPromise = new Promise((resolve, reject) => {
        if (!locale) resolve();
        else context.executeAction(getI18n, {locale: locale}, resolve);
      });
      
      Promise.all([photosPromise, i18nPromise]).then(() => { done() }); 

      
    }
  },

  about: {
    path: '/about',
    method: 'get',
    page: 'about',
    label: 'About',
    action: function(context, payload, done) {
      context.dispatch('UPDATE_PAGE_TITLE', {
        pageTitle: 'About | flux-examples | routing'
      });
      const locale = payload.navigate.locale;
      if(!locale) done()
      else context.executeAction(getI18n, {locale: locale}, done);
    }
  },

  dynamicpage: {
    path: '/page/:id',
    method: 'get',
    page: 'page',
    action: function(context, payload, done) {
      context.dispatch('LOAD_PAGE', {
        id: payload.params.id
      });
      context.dispatch('UPDATE_PAGE_TITLE', {
        pageTitle: payload.params.id + ' [Dynamic Page] | flux-examples | routing'
      });
      done();
    }
  }
};