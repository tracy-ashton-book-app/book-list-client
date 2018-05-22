'use strict';

var app = app || {};

(function(module) {

  let Index = {};

  Index.isProduction = /^(?!localhost|127)/.test(window.location.hostname);

  Index.ENVIRONMENT = {};
  Index.ENVIRONMENT.apiUrl = Index.isProduction ? module.Book.ENV.cloudApiUrl : module.Book.ENV.localApiUrl;

  Index.showOnly = (section) => {
    $('.tab-content').hide();
    $(`#${section}`).fadeIn();
  };

  Index.render = (bookHtml) => $('#book-list').append(bookHtml);

  module.Index = Index;

})(app)