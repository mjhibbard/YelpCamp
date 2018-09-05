
var express		   			= require("express"),
    app						= express(),
    bodyParser  			= require("body-parser"),
    mongoose   				= require("mongoose"),
    flash					= require("connect-flash"),
    passport				= require("passport"),
    LocalStrategy			= require("passport-local"),
    // passportLocalMongoose	= require("passport-local-mongoose"),
    methodOverride			= require("method-override"),
    Campground				= require("./models/campground"),
    Comment					= require("./models/comment"),
    User					= require("./models/user"),
    seedDB					= require("./seeds");

//requiring routes
var commentRoutes			= require("./routes/comments"),
    campgroundRoutes		= require("./routes/campgrounds"),
    indexRoutes				= require("./routes/index");

// APP CONFIG
mongoose.connect("mongodb://localhost/27017");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();    //Seed the database

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again, Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false	
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(3000, function(){
    console.log("The YelpCamp Server has Started!");
});


//Start mongo instance:
//This starts the main MongoDB database process.
//  "C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe" --dbpath "C:\Users\Mike\Documents\Alpha-Code\web-dev-bootcamp\data"
//  To connect to MongoDB through the ~bin.mongo.exe shell, open another Command Prompt. Copy and paste the following into another terminal:
//  "C:\Program Files\MongoDB\Server\3.6\bin\mongo.exe"



//(not needed) MongoDB docs path: "C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe" --dbpath d:\test\mongodb\data