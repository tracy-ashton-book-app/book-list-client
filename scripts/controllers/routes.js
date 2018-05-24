'use strict';

page('/', ctx => {
  app.Index.toggleMenu();
  app.Book.fetchAll(app.bookView.initIndexPage)
});

page('/menu', ctx => {
  app.Index.toggleMenu();
});

page('/about', ctx => {
  app.Index.toggleMenu();
  app.Index.showOnly('#about')
});

page('/new-book', ctx => {
  app.bookView.initNewBookPage();
});

page('/book/detail/:book_id', ctx => {
  app.Book.fetchOne(ctx, app.bookView.initBookDetail);
});

page('/admin', (ctx, next) => {
  app.Index.toggleMenu();
  app.adminView.fetchAdminToken(ctx, next);
  // next();
}, (ctx, next) =>{
  
  app.adminView.validateAdminToken(ctx, next);
  // next();
}, (ctx) => {

  app.adminView.initAdminPage(ctx);
})

page('/update-book', 
  (ctx) => {
    ctx.book_id = $('article').data('book-id');
    app.bookView.initEditBookPage(ctx);
  }
);

page('/delete-book', 
(ctx) => {
  ctx.book_id = $('article').data('book-id');
  app.bookView.initDeleteConfirmation(ctx);
}
);

page('*', ctx => app.Index.showOnly('#book-list'))

page();
