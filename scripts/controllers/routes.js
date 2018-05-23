'use strict';

page('/', ctx => app.Book.fetchAll(app.bookView.initIndexPage));
page('/book/detail/:book_id', ctx => { 
  console.log(`/book/detail/${ctx.params.book_id} route taken`);
  app.Book.fetchOne(ctx, app.bookView.initBookDetail)
});
page();