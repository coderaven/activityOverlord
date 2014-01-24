/**
 * SessionController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var bcrypt = require('bcryptjs');

module.exports = {
    
  'new': function(req, res){

//      // This code will make your cookies in session expire in 60s
//      // It will reset everytime you call the session#new controller however
//      var oldDateObj = new Date();
//      var newDateObj = new Date(oldDateObj.getTime() + 60000);
//      req.session.cookie.expires = newDateObj;

//      req.session.authenticated = true;
//      console.log(req.session);

      res.view('session/new');
  },

  create: function(req, res, next){
      if (!req.param('email') || !req.param('password')){
          var usernamePasswordRequiredError = [{name: 'usernamePasswordRequiredError', message: 'You must enter both username and password!'}];
          req.session.flash = {
              err: usernamePasswordRequiredError
          }

          res.redirect('/session/new');
          return;
      }

      User.findOneByEmail(req.param('email'), function foundUser(err, user){
          if (err) return next(err);

          if (!user){
              var noAccountError = [{name: 'noAccount', message: 'The email address ' + req.param('email' + ' not found.')}];
              req.session.flash = {
                  err: noAccountError
              }
              res.redirect('/session/new');
              return;
          }

          bcrypt.compare(req.param('password'), user.encryptedPassword, function(err, valid){
              if (err) return next(err);
              if (!valid){
                  var usernamePasswordMismatchError = [{name: 'usernamePasswordMismatchError', message: 'Invalid username and password combination.'}];
                  req.session.flash = {
                      err: usernamePasswordMismatchError
                  }
                  res.redirect('/session/new');
                  return;
              }

              // Log user in if valid
              req.session.authenticated = true;
              req.session.User = user;

              // Redirect to profile page
              res.redirect('/user/show/' + user.id);
          });
      });
  },

  destroy: function(req, res, next){
      // Wipe out all session variables (logout)
      req.session.destroy();
      res.redirect('/session/new');
  },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to SessionController)
   */
  _config: {}

  
};
