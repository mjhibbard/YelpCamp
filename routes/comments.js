
var express     = require("express"),
    router      = express.Router({mergeParams: true}),
    campground  = require("../models/campground"),
    comment     = require("../models/comment"),
    middleware  = require("../middleware");

//Comments New
router.get("/new", middleware.isLoggedIn, function(req, res){
    //find campground by id
    Campgroung.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

//Comments Create
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup campground using id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds")
        } else{
            //create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "SOMETHING WENT WRONG");
                    console.log(err);
                } else{
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username
                    //save comment
                    comment.save();
                    //connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    //redirect to campground showpage
                    req.flash("success", "Successfully added comment");
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    })
});

//Comments Edit
router.get("/:comment_id/edit", middleware.checkCommentOwenership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else{
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
});

//Comments Update
router.put("/:comment_id", middleware.checkCommentOwenership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else{
            res.redirect("/campground/" + req.params.id);
        }
    });
});

//Comment Destroy
router.delete("/:comment_id", middleware.checkCommentOwenership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else{
            req.flash("success", "Comment Deleted");
            res.redirect("/campground/" + req.params.id);
        }
    });
});

module.exports = router;