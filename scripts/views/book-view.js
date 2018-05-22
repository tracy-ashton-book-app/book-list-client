'use strict';

var app = app || {};

(function(module){

  var bookView = {};

  bookView.initIndexPage = () => {
    $('.container').hide();
    Book.all.map((b) => b.toHtml()).forEach((h) => $('#book-list').append(h));
    $('.book-view').fadeIn(500);
  }

  $(document).ready(module.Book.fetchAll(bookView.initIndexPage));

  module.bookView = bookView;
})(app);