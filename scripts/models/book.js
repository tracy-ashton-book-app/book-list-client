'use strict';

var app = app || {};

(function(module) {
  
  var book = {};

  book.ENV = {
    isProduction: /^(?!localhost|127)/.test(window.location.hostname),
    cloudApiUrl: 'https://ta-booklist.herokuapp.com',
    localApiUrl: 'http://localhost:3000',
    apiUrl: ''
  }

  book.ENV.setAppUrl = function() {
    this.apiUrl = this.isProduction ? this.cloudApiUrl : this.localApiUrl;
  }

  book.init = function(){
    book.ENV.setAppUrl();
    console.log('hello world', book.ENV);
  }

  module.book = book;
})(app);