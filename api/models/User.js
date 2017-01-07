/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var crypto = require('crypto'),
    algorithm = 'aes-256-cbc',
    password = 'XuG59Hghme';
  
module.exports = {

  attributes: {
	  username:{
        type:"string",
        required:true,
        minLength: 2
      }, 
      password:{
	      type:"string",
	      required:true,
	      minLength: 6
      },
      firstname:{
        type:"string",
        required:true,
        minLength: 2
      },
      lastname:{
          type:"string",
          required:true,
          minLength: 2
       },
      email:{
        type:"email",
        required:"true",
        unique: true
      },
      joinas:{
        type:"string",
	    required:true
	  },
	  profile:{
	        type:"string",
		    required:true
	  }
  },

  beforeCreate: function (values, cb){
	var cipher = crypto.createCipher(algorithm,password);
	var crypted = cipher.update(values.password,'utf8','hex');
	crypted += cipher.final('hex');
	values.password = crypted;
	
	cb();
  }
 
};

