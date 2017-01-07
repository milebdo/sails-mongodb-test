/**
 * CountriesController
 *
 * @description :: Server-side logic for managing countries
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
		getall: function (req, res){	
			var params = req.params.all();
			Countries.native(function(err, collection){
				if(err) return res.serverError(err);
						collection.find({email:params.email}, {username:true}).toArray( function(err, results){
							if(err) return res.serverError(err);
							else{
								if(results.length !== 0) return res.ok(results);
								else{
									var cipher = crypto.createCipher(algorithm,password);
									var crypted = cipher.update(params.password,'utf8','hex');
									crypted += cipher.final('hex');
									collection.insertOne({
										username : params.username,
										firstname : params.firstname,
										lastname : params.lastname,
										password : crypted,
										joinas : params.joinas,
										email : params.email
									}, function(err, r) {
										if(err) return res.serverError(err);
										var retval = {status:1, message:'success', userid:r.insertedId};
							        	res.json(retval);
									  });
								}
							}
						});
			});
		}
};

