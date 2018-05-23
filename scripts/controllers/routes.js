'use strict';

page('/', ctx => {
  app.Book.fetchAll(app.bookView.initIndexPage)
});

page('/about', ctx => app.Index.showOnly('#about'));

page('/new-book', ctx => {
  app.Index.showOnly('#new-book');
  app.bookView.initNewBookPage();
});

page('/book/detail/:book_id', ctx => {
  app.Book.fetchOne(ctx, app.bookView.initBookDetail);
});

page('*', ctx => app.Index.showOnly('#book-list'))

page();
