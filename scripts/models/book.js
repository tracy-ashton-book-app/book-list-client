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
        Book.loadAll(results);
        callBack();
      })
      .catch(console.error)
  }

  Book.loadAll = (rows) => {
    rows.sort((a,b) => a.title > b.title);
    Book.all = rows.map(book => new Book(book));
  }

  module.Book = Book;
})(app);