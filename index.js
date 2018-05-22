'use strict';

var app = app || {};

(function(module) {

  module.isProduction = /^(?!localhost|127)/.test(window.location.hostname);

  module.ENVIRONMENT.apiUrl = isProduction ? module.Book.ENV.cloudApiUrl : module.Book.ENV.localApiUrl;

  module.showOnly = (section) => {
    $('.tab-content').hide();
    $(`#${section}`).fadeIn();
  });

  module.render = (bookObject) => {
    if (!Book.book-list-template) Handlebars.compile($('#book-list-template').text());
    bookObject.toHtml();
  }
  

  module.Index = module;
})(app)