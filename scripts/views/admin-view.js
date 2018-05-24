'use strict';

var app = app || {};

(function(module){

  var adminView = {};

  adminView.fetchAdminToken = (ctx, next) => {
    console.log('fetchAdminToken, , get db.token, add to ctx');
    $.get(`${app.Book.ENV.apiUrl}/api/v1/admin`)
    .then (result => {
      console.log('fetchtoken result', (result));
      ctx.adminToken = parseInt(result);
      next();
    })
    .catch (console.error);
  }

  adminView.validateAdminToken = (ctx, next) => {
    console.log('validateAdminToken');
    if (localStorage.TOKEN && parseInt(localStorage.TOKEN) === ctx.adminToken) {
      adminView.validAdmin = true;
      console.log('adminView.validAdmin is true');
    }
    else {
      adminView.validAdmin = false;
      console.log('adminView.validAdmin is false, calling next()');
    }
    next();
  }

  adminView.initAdminPage = (ctx) => {
    console.log('adminView.initAdminPage entered, flag', app.adminView.validAdmin);
    if (adminView.validAdmin === false) {
      console.log('get new token from admin, if = ctx.db.token set flag true and store ls.token,')
      app.Index.showOnly('#admin-login');
      $('#login-form').on('submit', (e) => {
        e.preventDefault();
        let token = parseInt($('#admin-token').val());
        console.log('init token from admin',token);
        if (token === ctx.adminToken) {
          adminView.validAdmin = true;
          localStorage.TOKEN = token;
          console.log('local storage set to ',localStorage.TOKEN);
        } 
        document.getElementById('new-form').reset(); 
        page('/');
      })
    } else {
      app.Index.showOnly('#admin-validated');
      // page('/');
    }
  }

  module.adminView = adminView;
})(app);