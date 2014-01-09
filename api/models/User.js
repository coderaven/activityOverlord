/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  // Since Javascript objects can have any
  // arbitrary properties, and thus will also
  // be saved in the database if created.. Then
  // We need to set the schema property into true
  // Para ang ma save sa database ky kato lang 
  // Jud kailangan sa ato application or kato
  // lang jud mga naka define danhi sa model
  schema: true,  

  attributes: {
  	
  	name: {
  		type: 'string',
  		required: true
  	},

  	title: {
  		type: 'string'
  	},

  	email: {
  		type: 'string',
  		email: true,
  		required: true,
  		unique: true
  	},

  	encryptedPassword: {
  		type: 'string',
  	},

    // Para dli makita sa api na json na gina return
    // ang parts nga private dapat or sensitive,
    // We need to override the toJSON function
    //
    // toJSON: function(){
    //   var obj = this.toObject();
    //   delete obj.password;
    //   delete obj.confirmation;
    //   delete obj.encryptedPassword;
    //   delete obj._csrf;
    //   return obj;
    // },
    
  }

};
