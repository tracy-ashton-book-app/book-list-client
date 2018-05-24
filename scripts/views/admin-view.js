'use strict';

var app = app || {};

(function(module){

  var adminView = {};

  adminView.validAdmin = false;

  adminView.fetchAdminToken = (ctx, next) => {
    $.get(`${app.Book.ENV.apiUrl}/api/v1/admin`)
    .then (result => {
      ctx.adminToken = parseInt(result);
      next();
    })
    .catch (console.error);
  }

  adminView.validateAdminToken = (ctx, next) => {
    if (localStorage.TOKEN && parseInt(localStorage.TOKEN) === ctx.adminToken) {
      adminView.validAdmin = true;
    }
    else {
      adminView.validAdmin = false;
    }
    next();
  }

  adminView.initAdminPage = (ctx) => {
    if (adminView.validAdmin === false) {
      app.Index.showOnly('#admin-login');
      $('#login-form').on('submit', (e) => {
        e.preventDefault();
        let token = parseInt($('#admin-token').val());
        if (token === ctx.adminToken) {
          adminView.validAdmin = true;
          localStorage.TOKEN = token;
        } 
        document.getElementById('login-form').reset(); 
        page('/');
      })
    } else {
      app.Index.showOnly('#admin-validated');
    }
  }

  module.adminView = adminView;
})(app);