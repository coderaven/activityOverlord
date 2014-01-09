/**
 * UserController
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

module.exports = {
    
  'new': function (req, res){
  	// res.locals.flash = _.clone(req.session.flash); // commented ky naa nay policy
  	res.view();

  	// Para dili mag balik2x ang flash message and
  	// once lang mag show, we need to set the flash
  	// message to be empty
  	// req.session.flash = {}; // Commented ky nagbutang naman tag policy para ani
  },

  create: function(req, res, next){
  	// Create a User with the params sent from
  	// the sign-up form -> new.ejs
  	User.create(req.params.all(), function userCreated(err, user){
  		// If there's an error
  		if (err) {
  			console.log(err);
  			req.session.flash = {
  				err: err
  			};

  			// Redirect to user/new on error
  			return res.redirect('/user/new');
  		}

  		// If successfully creating the user
  		// redirect to the show action
  		// res.json(user);

  		res.redirect('/user/show/' + user.id);

  		// Para dili mag balik2x ang flash message and
	  	// once lang mag show, we need to set the flash
	  	// message to be empty
	  	//req.session.flash = {}; // commented ky naa nay policy
  	});
  },

  // render the profile view (e.g. /views/show.ejs)
  show: function(req, res, next) {
  	User.findOne(req.param('id'), function foundUser(err, user){
  		if (err) return next(err);
  		if (!user) return next();
  		res.view({
  			user: user
  		});
  	});
  },

  index: function(req, res, next) {
  	// Get an array of all users in the User collection (e.g. table)
  	User.find(function foundUsers(err, users){
  		if (err) return next(err);
  		// pass the array down to the /views/index.ejs page
  		res.view({
  			users: users
  		});
  	});
  },

  edit: function(req, res, next) {
  	// Find the user from the id passed in via params
  	User.findOne(req.param('id'), function foundUser(err, user){
  		if (err) return next(err);
  		if (!user) return next("User doesn't exist.");

  		res.view({
  			user: user
  		});
  	});
  },

  update: function(req, res, next) {
  	User.update(req.param('id'), req.params.all(), function userUpdated(err){
  		if (err) return res.redirect('/user/edit/' + req.param('id'));

  		res.redirect('/user/show/' + req.param('id'));
  	});
  },

  destroy: function(req, res, next) {
  	User.findOne(req.param('id'), function foundUser(err,user){
  		if (err) return next(err);
  		if (!user) return next("User doesn't exist.");

  		User.destroy(req.param('id'), function userDestroyed(err){
  			if (err) return next(err);
  		});

  		res.redirect('/user');
  	});
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  _config: {}

  
};
