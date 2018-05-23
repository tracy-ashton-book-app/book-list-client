'use strict';

var app = app || {};

(function(module){

  var bookView = {};

  bookView.initIndexPage = () => {
    $('#book-list').empty();
    app.Book.all.forEach(b => app.Index.render(b.toHtml()));
    app.Index.showOnly('#book-list');
  }

  bookView.initBookDetail = (data) => {
    debugger
    let i = app.Book.all.findIndex(b => b.book_id === data[0].book_id);
    app.Book.all[i].description = data[0].description;
    app.Book.all[i].isbn = data[0].isbn;
    console.log(app.Book.all[i]);
    $('#book-list').empty();
    app.Index.render(app.Book.all[i].toDetailHtml());
    $(`article[data-book-id="${app.Book.all[i].book_id}}"]`).show();
  }

  module.bookView = bookView;
})(app);

$(document).ready(app.Book.fetchAll(app.bookView.initIndexPage));
