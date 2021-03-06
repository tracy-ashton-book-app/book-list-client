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

  Index.toggleMenu = () => $('nav ul').slideToggle();

  Index.render = (bookHtml) => $('#book-list').append(bookHtml);

  Index.getBookIdx = (book_id) => 
    app.Book.all.findIndex(b => b.book_id === book_id);

  module.Index = Index;

})(app)