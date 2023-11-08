const Employee = require('../models/employee');
const PerformanceReview = require('../models/performance_review');
const Feedback = require('../models/feedback');
const FeedbackRequest = require('../models/feedback_request');

module.exports.home = function(req, res){
    // console.log('req.cookie is ',req.cookies);
    if(req.cookies.user_id){
        Employee.findOne({_id: req.cookies.user_id}).then(function(data){
            if(data.isAdmin){ //If the user is an admin then load the admin page
                Employee.find({})
                .populate({
                    path: 'performance_reviews',
                    model: 'PerformanceReview',
                    populate: {
                        path: 'feedback',
                        model: 'Feedback'
                    }
                }).exec()
                .then(function(data){
                    console.log('data from home is ',data);
                    return res.render('admin',{
                        title:"Admin Page",
                        employee_list: data,
                        user_name: req.cookies.user_name
                    });
                }).catch(function(err){
                    console.log('error in getting data from DB ',err);
                    return res.render('<h1>There was an error in fetching the requested data from the database</h1>')
                });
            }else{
                // code for rendering the employee page, not admin page.
                FeedbackRequest.find({requestedTo: data.name})
                .populate('performance_review')
                .then(function(feedbackReq){
                    console.log('feedbackReq ',feedbackReq);
                    return res.render('employee',{
                        title: "Employee Page",
                        user_name: req.cookies.user_name,
                        feedbackReq: feedbackReq
                    });
                }).catch(function(err){
                    console.log('error finding feedback request for user ', err);
                });
            }
        });

    }else{
        return res.redirect('/sign-in');
    }
}

module.exports.signIn = function(req, res){
    if(req.cookies.user_id){
        return res.redirect('/');
    }
    res.render('user_sign_in',{
        title: "Sign In"
    });
}

module.exports.signUp = function(req, res){
    res.render('user_sign_up', {
        title: "Sign Up"
    });
}

module.exports.signOut = function(req, res){
    // console.log('req.cookies from signout is ', req.cookies);
    res.cookie('user_id','');
    return res.redirect('/');
}

module.exports.createEmployee = function(req, res){
    if(req.body.password != req.body.confirm_password){
        console.log('passwords dont match!')
        return res.redirect('back');
    }

    console.log('req.body ', req.body);
    var employee = Employee.find({email:req.body.email}).then(function(data){
        console.log('data is ',data);
        if(data == ""){
            console.log('no employee found with this email. So creating the employee..');
            Employee.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                isAdmin: false
            });
            return res.redirect('/sign-in');
        }
        return res.redirect('back');
    }).catch(function(err){
        console.log('error searching Employee in database ',err);
        return res.redirect('/sign-in')
    })
}

module.exports.createSession = function(req, res){
    Employee.findOne({email: req.body.email}).then(function(data){
        console.log('data from create session is ',data);
        if(data == ""){
            console.log('no such user found in directory. ');
            return res.redirect('/sign-up');
        }else if(data.password != req.body.password){
            console.log('Invalid Username/Password');
            res.redirect('/sign-in'); //if employee record found in DB then redirect to home page
        }
        else{
            res.cookie('user_id',data.id);
            res.cookie('user_name', data.name);
            return res.redirect('/');
        }
    })
    .catch(function(err){
        console.log('error finding user in database ',err);
        return res.redirect('/sign-up');
    })
}

module.exports.deleteEmployee = function(req, res){
    let id = req.query.id;
    PerformanceReview.deleteMany({"user": id}).then(function(){
        console.log('Performance Reviews for user deleted');
    }).then(function(){
        Employee.findByIdAndDelete(id).then(function(){
            console.log('document deleted');
        }).catch(function(err){
            console.log('error deleting the document ',err);
        });
    })
    res.redirect('back');
}

module.exports.makeAdmin = function(req, res){
    console.log('clicked the makeAdmin button!');
    Employee.findByIdAndUpdate(req.query.id, {isAdmin: true})
    .then(function(data){
        console.log('updated user ',data)
        return res.redirect('back');
    })
    .catch(function(err){
        console.log('error in updating the user ',err);
        return res.redirect('back');
    })
}


//When admin creates a user, it is routed here
module.exports.adminCreateEmployee = function(req, res){
    console.log('inside admin create employee');
    Employee.findOne({email: req.body.email})
    .then(function(data){
        console.log('data is ',data);
        if(data == null){
            console.log('no employee found with this email. So creating the employee. req.body ',req.body);
            let adminUser = false;
            if(req.body.isAdmin){
                adminUser = true;
            }
            Employee.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                isAdmin: adminUser
            })
            .then(function(data){
                console.log('employee created--',data);
                return res.redirect('/');
            })
            .catch(function(err){
                console.log('error in creating employee ',err);
                return res.redirect('/');
            });
        }
    })
    .catch(function(err){
        console.log('error in finding user from DB ',err);
        return res.redirect('/');
    });
}


module.exports.userDetailsEdit = function(req, res){
    console.log('req.body ',req.body);
    Employee.findByIdAndUpdate(req.query.id, {
        name: req.body.name,
        email: req.body.email
    }).then(function(data){
        console.log('data updated successfully ');
        return res.redirect('/');
    }).catch(function(err){
        console.log('error updating user data ',err);
        return res.redirect('/');
    })
}

module.exports.createPerformanceReview = function(req, res){
    let employee = Employee.findById(req.body.employee).then(function(empData){
        // console.log('employee data is ', empData);        
        // console.log('creating performance review... req.body ', req.body);
        PerformanceReview.create({
            content: req.body.content,
            user: req.body.employee,
            createdBy: req.cookies.user_name
        }).then(function(data){
            empData.performance_reviews.push(data);
            empData.save();
            // console.log('employee data after creating PRs ',empData)
            // console.log('performance review has been created ', data);
            res.redirect('/');
        }).catch(function(err){
            console.log('error creating performance review ',err);
            res.end('<h1>Error Creating Performance Review</h1>')
        })
    })
}

module.exports.editPerformanceReview = function(req, res){
    console.log('edit performance review - req.body ',req.body);
    console.log('edit performance review - req.query ',req.query);
    PerformanceReview.findByIdAndUpdate(req.query.id, {
        content: req.body.content
    }).then(function(data){
        console.log('PR has been updated ',req.body.content);
        res.redirect('/');
    }).catch(function(err){
        console.log('error updating the PR ',err);
        res.render('<h1>Error updating the PR<h1/>');
    })
}

module.exports.createFeedbackRequest = function(req, res){
    console.log('req.body is ',req.body);
    let getFeedbackFrom = req.body.askFeedbackFrom;
    FeedbackRequest.create({
        isSubmitted: false,
        requestedBy: req.cookies.user_name,
        requestedTo: getFeedbackFrom,
        performance_review: req.body.performanceReviewId
    }).then(function(data){
        console.log('Feedback request created ',data);
        return res.redirect('/');
    }).catch(function(err){
        console.log('error creating feedback ',err);
        return res.redirect('/')
    })
}

module.exports.createFeedback = function(req, res){
    console.log('creating the feedback. req.body is  ', req.body);
    Feedback.create({
        content: req.body.feedbackContent,
        performance_review: req.body.performanceReviewId,
        createdBy: req.body.createdBy,
        feedback_Request_Id: req.body.feedbackRequestId
    }).then(function(data){
        console.log('feedback created! ',data);
        FeedbackRequest.findByIdAndUpdate(req.body.feedbackRequestId, {
            isSubmitted: true
        }).then(function(frUpdate){
            console.log('feedback request submitted made to true ',frUpdate);
            res.redirect('/')
        })
        // res.end('<h1>Created feedback</h1>');
    }).catch(function(err){
        console.log('error in creating feedback ',err);
        res.redirect('/');
    })
}
