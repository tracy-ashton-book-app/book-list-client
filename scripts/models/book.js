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
    let ctx = {params: {book_id: null}}
    $.post(`${Book.ENV.apiUrl}/api/v1/books`,
      {
        author: this.author,
        title: this.title,
        isbn: this.isbn,
        image_url: this.image_url,
        description: this.description
      })
      .then (results => {
        ctx.params.book_id = results[0].book_id;
        app.Book.fetchAll(()=>page(`/book/detail/${ctx.params.book_id}`))})
      .catch (err => module.errorView.initErrorPage(err))
  }

  Book.prototype.destroy = function(callback) {
    $.ajax({
      url: `${Book.ENV.apiUrl}/api/v1/books/${this.book_id}`,
      method: 'DELETE'
    })
      .then(result => {
        if (callback) callback();
      })
      .catch(err => module.errorView.initErrorPage(err));
  };

  Book.prototype.update = function(callback) {
    $.ajax({
      url: `${Book.ENV.apiUrl}/api/v1/books/${this.book_id}`,
      method: 'PUT',
      data: {
        author: this.author,
        title: this.title,
        isbn: this.isbn,
        image_url: this.image_url,
        description: this.description
      }
    })
      .then(result => {
        if (callback) callback();
      })
      .catch(err => module.errorView.initErrorPage(err));
  };

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
      .catch(console.error)
  }

  Book.fetchAll = (callback) => {
    $.get(`${Book.ENV.apiUrl}/api/v1/books`)
      .then(results => {
        Book.loadAll(results);
        if (callback) callback();
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