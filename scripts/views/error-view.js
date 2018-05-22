'use strict';

var app = app || {};

(function(module){

  let errorView = {};

  errorView.initErrorPage = (err) => {
    $('.container').hide();
    $('#error-message').empty();
    let errorTemplate = Handlebars.compile($('#error-template').text());
    $('#error-message').append(errorTemplate(err));
    $('#error-view').fadeIn(500);
  }

  errorView.errorCallback = (err) => {
    console.log('errorCallback',err);
  }

  module.errorView = errorView;
})(app);