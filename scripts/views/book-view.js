'use strict';

var app = app || {};

(function(module){

  var bookView = {};

  bookView.initIndexPage = () => {
    $('#book-list').empty();
    $('#top-nav-menu').hide();
    app.Index.showOnly('#book-list');
    app.Book.all.forEach(b => app.Index.render(b.toHtml()));
  }

  bookView.initBookDetail = (data) => {
    let {book_id, description, isbn} = data[0];
    let i = app.Book.all.findIndex(b => b.book_id === book_id);
    app.Book.all[i].description = description;
    app.Book.all[i].isbn = isbn;
    app.Index.showOnly('#book-list');
    $('#book-list').empty();
    app.Index.render(app.Book.all[i].toDetailHtml());
    $('.admin-view').hide();    if (localStorage.TOKEN && app.adminView.validAdmin) {
      $('.admin-view').show();
    }
  }

  bookView.initNewBookPage = () => {
    $('#new-book').on('submit', (e) => {
      e.preventDefault();
      let newBook = new app.Book({
        title: $('#book-title').val(),
        author: $('#book-author').val(),
        isbn: $('#book-isbn').val(),
        image_url: $('#book-image-url').val(),
        description: $('#book-description').val(),
      })
      document.getElementById('new-form').reset();
      newBook.create();
    })
  }

  module.bookView = bookView;
})(app);