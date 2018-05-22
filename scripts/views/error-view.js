'use strict';

var app = app || {};

(function(module){

  let errorView = {};

  errorView.initErrorPage = (err) => {
    $('.container').hide();
    $('#error-view').fadeIn(500);

    $('#error-message').empty();

    let errorTemplate = Handlebars.compile($('#error-template').text());
    $('error-message').show();
    $('#error-message').append(errorTemplate(err));

    errorView.errorCallback(err);
  }

  errorView.errorCallback = (err) => console.error(err);

  module.errorView = errorView;
})(app);