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

page('/admin', (ctx, next) => {
  console.log('admin path');
  app.adminView.fetchAdminToken(ctx, next);
  // next();
}, (ctx, next) =>{
  
  app.adminView.validateAdminToken(ctx, next);
  // next();
}, (ctx) => {

  app.adminView.initAdminPage(ctx);
})

page('*', ctx => app.Index.showOnly('#book-list'))

page();
