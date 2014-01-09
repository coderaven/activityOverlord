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
  		res.json(user);

  		// Para dili mag balik2x ang flash message and
	  	// once lang mag show, we need to set the flash
	  	// message to be empty
	  	//req.session.flash = {}; // commented ky naa nay policy
  	});
  },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  _config: {}

  
};
