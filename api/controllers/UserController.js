/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var crypto = require('crypto'),
    algorithm = 'aes-256-cbc',
    password = 'XuG59Hghme';
var gfiles;
module.exports = {
	
	register: function (req, res){	
		var params = req.params.all();
		User.native(function(err, collection){
			if(err) return res.serverError(err);
			collection.createIndex({email:1, username:1}
		      , {unique:true, background:true, w:1}, function(err, indexName) {
					collection.find({email:params.email}, {username:true}).toArray( function(err, results){
						if(err) return res.serverError(err);
						else{
							if(results.length !== 0) return res.ok(results);
							else{
//								var cipher = crypto.createCipher(algorithm,password);
//								var crypted = cipher.update(params.password,'utf8','hex');
//								crypted += cipher.final('hex');
								req.file('profile').upload({dirname : process.cwd() +'/assets/images/profile/'}, function (err, uploadedFiles) {
						              if (err) return res.send(500, err);
						              
						              if (uploadedFiles.length === 0){
						                  return res.badRequest('No file was uploaded');
						                }
						              	
						                var filename = uploadedFiles[0].fd.substring(uploadedFiles[0].fd.lastIndexOf('/')+1);
						                var getImageUrl = 'assets/images/profile/' + filename;	
						                gfiles = getImageUrl;
						            });
								console.log(gfiles);
//								res.json(upstream);
								/*collection.insertOne({
									username : params.username,
									firstname : params.firstname,
									lastname : params.lastname,
									password : params.password,
									joinas : params.joinas,
									email : params.email,
									profile : uploadLocation
								}, function(err, r) {
									if(err) return res.serverError(err);
									var retval = {status:1, message:'success', userid:r.insertedId};
						        	res.json(retval);
								});*/
							}
						}
					});
		      });
		});
	}

};

