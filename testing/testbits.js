
let newBook = new Book({
  title: 'This is a test Book Obj',
  author: 'Tracy Ashton',
  isbn: 'ISBN_13 000000000000',
  image_url: 'http://books.google.com/books/content?id=GXYH1C_esq0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
  description: 'This is the description of this test book. If this works I\'m going to be very happy.'
})

newBook.create()

app.Book.fetchAll(app.bookView.initIndexPage)

