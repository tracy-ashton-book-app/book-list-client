'use strict';

var app = app || {};

(function(module){

  var bookView = {};

  bookView.initIndexPage = () => {
    $('#book-list').empty();
    $('.container').hide();
    app.Book.all.forEach(b => app.Index.render(b.toHtml()));
    app.Index.showOnly('#book-list');
  }

  bookView.initBookDetail = (data) => {
    let i = app.Book.all.findIndex(b => b.book_id === data[0].book_id);
    app.Book.all[i].description = data[0].description;
    app.Book.all[i].isbn = data[0].isbn;
    $('#book-list').empty();
    $('.container').hide();
    app.Index.render(app.Book.all[i].toDetailHtml());
    $('#book-list').fadeIn(500);
  }

  module.bookView = bookView;
})(app);

$(document).ready(app.Book.fetchAll(app.bookView.initIndexPage));
