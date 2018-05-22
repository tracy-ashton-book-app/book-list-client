'use strict';

var app = app || {};

(function(module){

  var bookView = {};

  bookView.initIndexPage = () => {
    $('.container').hide();
    module.Book.all.map(b => b.toHtml()).forEach(h => module.Index.render(h));
    $('.book-view').fadeIn(500);
  }

  $(document).ready(module.Book.fetchAll(bookView.initIndexPage));

  module.bookView = bookView;
})(app);