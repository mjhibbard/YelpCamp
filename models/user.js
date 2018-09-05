
var mongoose				= require("mongoose"),
	passortLocalMongoose	= require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
	username: String,
	password: String
});

userSchema.plugin(passortLocalMongoose);

module.exports = mongoose.model("User", userSchema);