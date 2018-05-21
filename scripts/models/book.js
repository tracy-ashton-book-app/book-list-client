'use strict';

var app = app || {};

(function(module) {

  function Book(bookDataObj) {
    Object.keys(bookDataObj).forEach(key => this[key] = bookDataObj[key]);
  }

  Book.template = Handlebars.compile($('#book-template').text());

  Book.prototype.toHtml = function () {
    return Book.template(this);
  }

  Book.ENV = {
    isProduction: /^(?!localhost|127)/.test(window.location.hostname),
    cloudApiUrl: 'https://ta-booklist.herokuapp.com',
    localApiUrl: 'http://localhost:3000',
    apiUrl: ''
  }

  Book.ENV.setAppUrl = function() {
    this.apiUrl = this.isProduction ? this.cloudApiUrl : this.localApiUrl;
  }

  Book.init = function(callback){
    Book.ENV.setAppUrl();
    $.get('/books')
    if (callback) callback();
  }

  module.Book = Book;
})(app);