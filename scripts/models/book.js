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

  Book.prototype.toDetailHtml = function () {
    app.Book.bookDetailTemplate = app.Book.bookDetailTemplate 
    || Handlebars.compile($('#book-detail-template').text());
    return Book.bookDetailTemplate(this);
  }

  Book.prototype.create = function(callback) {
    console.log('Book.create:',`${Book.ENV.apiUrl}/api/v1/books`);
    console.log('Book.create sending', JSON.parse(JSON.stringify(this)));
    $.post(`${Book.ENV.apiUrl}/api/v1/books`, 
      {
        author: this.author,
        title: this.title,
        isbn: this.isbn,
        image_url: this.image_url,
        description: this.description
      })
      // JSON.parse(JSON.stringify(this)))
      .then (results => {
        console.log('back from $.post call');
        if (callback) callback();
      }) 
      .catch (err => module.errorView.initErrorPage(err))
  }
  Book.all = [];

  Book.ENV = {
    isProduction: /^(?!localhost|127)/.test(window.location.hostname),
    cloudApiUrl: 'https://ta-booklist.herokuapp.com',
    localApiUrl: 'http://localhost:3000'
  }

  Book.ENV.apiUrl = Book.ENV.isProduction ? Book.ENV.cloudApiUrl : Book.ENV.localApiUrl;

  Book.fetchOne = (ctx, callback) => {
    $.get(`${Book.ENV.apiUrl}/api/v1/books/${ctx.params.book_id}`)
      .then(result => callback(result))
      .catch(err => console.log(err))
  }

  Book.fetchAll = (callBack) => {
    $.get(`${Book.ENV.apiUrl}/api/v1/books`)
      .then(results => {
        Book.loadAll(results);
        callBack();
      })
      .catch((err) => module.errorView.initErrorPage(err))
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