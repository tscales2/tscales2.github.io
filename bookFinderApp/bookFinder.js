function getBookDetails(isbn) {

    // Query the book database by ISBN code.
    var isbn = this.isbn;
  
    var url = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn;
  
    var response = UrlFetchApp.fetch(url);
    var results = JSON.parse(response);
  
    if (results.totalItems) {
  
      // There'll be only 1 book per ISBN
      var book = results.items[0];
  
      var title = (book["volumeInfo"]["title"]);
      var subtitle = (book["volumeInfo"]["subtitle"]);
      var authors = (book["volumeInfo"]["authors"]);
      var printType = (book["volumeInfo"]["printType"]);
      var pageCount = (book["volumeInfo"]["pageCount"]);
      var publisher = (book["volumeInfo"]["publisher"]);
      var publishedDate = (book["volumeInfo"]["publishedDate"]);
      var webReaderLink = (book["accessInfo"]["webReaderLink"]);
  
      // For debugging
      Logger.log(book);
  
    }
  
  }
  