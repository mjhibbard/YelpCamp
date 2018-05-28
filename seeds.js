
var mongoose	= require("mongoose"),
Campground	= require("./models/campground"),
Comment		= require("./models/comment");

var data = [
{
	name: "Cloud's Rest",
	image: "",
	description: "blah blah blah"
},
{
	name: "Desert Mesa",
	image: "",
	description: "blah blah blah"
},
{
	name: "Canyon Floor",
	image: "",
	description: "blah blah blah"
}
]

function seedDB(){
// Remove all campgrounds
Campground.remove({}, function(err){
	if(err){
		console.log(err);
	} else{
		console.log("Removed Campgrounds in DB");
		Comment.remove({}, function(err){
			if(err){
				console.log(err);
			} else{
				console.log("Removed Comment(s)!");
				// Add a few campgrounds
				data.forEach(function(seed){
					Campground.create(seed, function(err, campground){
						if(err){
							console.log(err);
						} else{
							console.log("Added a campground")
							// add a comment
							Comment.create(
								{
									text: "This place is great, but i wish there was internet",
									author: "Homer"
								}, function(err, comment){
									if(err){
										console.log(err);
									} else{
										campground.comments.push(comment);
										campground.save();
										console.log("Created new comment");
									}
								});
						}
					});
				});
			}
		});
		
	}
});
}

module.exports = seedDB;