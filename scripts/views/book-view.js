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
    app.Index.toggleMenu();
    app.Index.showOnly('#new-book');
    document.getElementById('new-form').reset();
    $('#new-book h1').text('Add book');
    $('#new-book').on('submit', (e) => {
      e.preventDefault();
      $('#new-book').off('submit');
      let newBook = new app.Book({
        title: $('#book-title').val(),
        author: $('#book-author').val(),
        isbn: $('#book-isbn').val(),
        image_url: $('#book-image-url').val(),
        description: $('#book-description').val(),
      })
      newBook.create(()=>page(`/book/detail/${ctx.book_id}`));
    })
  }

  bookView.initEditBookPage = (ctx) => {
    let i = app.Book.all.findIndex(b => b.book_id === ctx.book_id);
    let {book_id, title, author, isbn, image_url, description} = app.Book.all[i];
    app.Index.showOnly('#new-book');
    $('#new-book h1').text('Edit book');
    $('#book-title').val(title);
    $('#book-author').val(author);
    $('#book-isbn').val(isbn);
    $('#book-image-url').val(image_url);
    $('#book-description').val(description);

    $('#new-book').on('submit', (e) => {
      $('#new-book').off('submit');
      e.preventDefault();
      let newBook = new app.Book({
        book_id: ctx.book_id,
        title: $('#book-title').val(),
        author: $('#book-author').val(),
        isbn: $('#book-isbn').val(),
        image_url: $('#book-image-url').val(),
        description: $('#book-description').val(),
      });
      document.getElementById('new-form').reset();
      newBook.update(()=>page(`/book/detail/${ctx.book_id}`));
    })
  }

  bookView.initDeleteConfirmation = (ctx) => {
    let i = app.Index.getBookIdx(ctx.book_id);
    app.Index.showOnly('#delete-confirmation');
    $('#delete-confirmation h2').text(app.Book.all[i].title);
    $('#delete-confirmation-form').off('click');
    $('#delete-confirmation-form').on('click',
      (e) => {
        e.preventDefault();
        if (e.target.id === 'delete-canceled') {
          page('/');
        } else {
          app.Book.all[i].destroy(()=>page('/'));
        }
      }
    );
  }

  module.bookView = bookView;
})(app);