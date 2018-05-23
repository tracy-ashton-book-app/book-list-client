'use strict';

var app = app || {};

(function(module) {

  var Index = {};

  Index.isProduction = /^(?!localhost|127)/.test(window.location.hostname);

  Index.ENVIRONMENT = {};
  Index.ENVIRONMENT.apiUrl = Index.isProduction ? module.Book.ENV.cloudApiUrl : module.Book.ENV.localApiUrl;

  Index.showOnly = (content) => {
    $('.container').hide();
    $(content).fadeIn();
  };

  Index.render = (bookHtml) => $('#book-list').append(bookHtml);

  module.Index = Index;

})(app)