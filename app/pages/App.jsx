'use strict';

var React  = require('react');
var {RouteHandler, State, Navigation} = require('react-router');
var mui    = require('material-ui');

var DocumentTitle = require('react-document-title');

var App = React.createClass({

  mixins: [State, Navigation],

  getInitialState() {
    return this.getCurrentState();
  },

  componentWillReceiveProps(nextProps) {
    this.setState(this.getCurrentState());
  },

  getCurrentState() {
    return {
      loginOrRepo: this.getPathname().replace('/', '')
    };
  },

  onGithubTouchTap: function(){
    document.location.href = 'http://github.com/gpbl/isomorphic-react-template';
  },

  onHomeTap: function() {
    this.transitionTo('home');
  },

  render () {
    var title = "Repobrowser";
    return (
      <DocumentTitle title={ title }>
        <mui.AppCanvas predefinedLayout={1}>
          <mui.AppBar
            title={ title }
            showMenuIconButton={false}
            className="mui-dark-theme"
            zDepth={0}>
             <mui.IconButton className="github-icon-button" icon="mui-icon-github" onTouchTap={this.onGithubTouchTap} />
             <mui.IconButton style={{float: "right"}} icon="action-home" onTouchTap={this.onHomeTap} />

          </mui.AppBar>
          <RouteHandler />

        </mui.AppCanvas>
      </DocumentTitle>
    );
  },

});

module.exports = App;