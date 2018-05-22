'use strict';

var app = app || {};

(function(module) {

  function Book(bookDataObj) {
    Object.keys(bookDataObj).forEach(key => this[key] = bookDataObj[key]);
  }

  Book.prototype.toHtml = function () {
    Book.bookListTemplate = Book.bookListTemplate 
      || Handlebars.compile($('#book-list-template').text());
    return Book.bookListTemplate(this);
  }

  Book.all = [];

  Book.ENV = {
    isProduction: /^(?!localhost|127)/.test(window.location.hostname),
    cloudApiUrl: 'https://ta-booklist.herokuapp.com',
    localApiUrl: 'http://localhost:3000'
  }

  Book.ENV.apiUrl = Book.ENV.isProduction ? Book.ENV.cloudApiUrl : Book.ENV.localApiUrl;

  Book.fetchAll = (callBack) => {
    $.get(`${Book.ENV.apiUrl}/api/v1/books`)
      .then(results => {
        console.log(results);
        Book.loadAll(results);
        callBack();
      })
      .catch((err) => console.log(err))
  }

  Book.loadAll = (rows) => {
    Book.all = rows.sort(function(a, b) {
      let titleA = a.title.toUpperCase().replace(/^THE[ ]*(.*)/,'$1'); 
      let titleB = b.title.toUpperCase().replace(/^THE[ ]*(.*)/,'$1');
      if (titleA < titleB) { return -1; }
      if (titleA > titleB) { return 1; }
      return 0;
    }).map(book => new Book(book));
  }

  module.Book = Book;
})(app);