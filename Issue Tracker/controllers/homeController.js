const Project = require('../models/project');
const Issue = require('../models/issue');

module.exports.home = function(req, res){
    Project.find({})
    .then(function(data){
        // console.log('data from homeController.home ',data);
        //rendering the home page
        return res.render('home',{
            title: 'Home Page',
            project_list: data
        });
    }).catch(function(err){
        console.log('error in fetching data from home',err);
        res.redirect('/');
    })
}

//creating the project document
module.exports.createProject = function(req, res){
    console.log('req.body ',req.body);
    Project.create({
        name: req.body.name,
        description: req.body.description,
        author: req.body.author
    }).then(function(data){
        console.log('Project created successfully: ',data);
        res.redirect('/');
    }).catch(function(err){
        console.log('error creating Project: ',err);
        res.redirect('/');
    })
}

//routing to the project details page, which will show the list of bugs / issues related to the project.
module.exports.projectDetails = function(req, res){
    console.log('inside projectDetails');
    console.log('req.params', req.params);
    Project.findById(req.params.id)
    .populate({
        path: 'issues'
    })
    .then(function(data){
        console.log('project details data ',data);
        res.render('project_details',{
            title: 'Project Details page',
            project_details: data,
            filtering: false
        })
        // res.redirect('/');
    }).catch(function(err){
        console.log('error in fetching project details ',err);
        res.redirect('/');
    })
}

//creating an Issue document
module.exports.createIssue = function(req, res){
    console.log('create-issue req.params ',req.params);
    console.log('create-issue req.body', req.body);
    Issue.create({
        title: req.body.title,
        description: req.body.description,
        labels: req.body.labels,
        author: req.body.author,
        project: req.params.id
    }).then(function(data){
        console.log('issue created successfully: ',data);
        Project.findById(req.params.id)
        .then(function(projData){
            projData.issues.push(data);
            projData.save();
            console.log('issue pushed into project');
            res.redirect('back');
        })
    })
    .catch(function(err){
        console.log('error in creating issue ',err);
        res.redirect('back');
    })
}

//showing Issue data based upon filtered values
module.exports.filterIssue = function(req, res){
    console.log('inside filterIssues. req.body is ', req.body);
    console.log('req.params ',req.params);
    let selectedFilter;
    let i = 0;
    let filters = [];
    for(vals in req.body){
        if(i == 0){
            selectedFilter = vals.selectFilter;
            console.log('vals is ',vals);
        }else{
            filters.push(vals);
        }
        i++;
    }
    //If the selected filter is label, filter based upon Label, else filter based upon Author
    if(req.body.selectFilter == 'Label'){
        Issue.find({
            project: req.params.id,
            labels: {$in: filters}
        }).then(function(data){
            Project.findById(req.params.id)
            .then(function(projData){
                res.render('project_details', {
                    filtering: true,
                    project_details: projData,
                    filtered_issues: data,
                    title: 'Project Details Page'
                })
            })
            console.log('issuesList from filtering ',data);
        }).catch(function(err){
            console.log('error in fetching data ',err);
            res.redirect('/');
        })
    }else if(req.body.selectFilter == 'Author'){
        Issue.find({
            project: req.params.id,
            author: {$in: filters}
        }).then(function(data){
            Project.findById(req.params.id)
            .then(function(projData){
                res.render('project_details', {
                    filtering: true,
                    project_details: projData,
                    filtered_issues: data,
                    title: 'Project Details Page'
                })
            })
            console.log('issuesList from filtering ',data);
        }).catch(function(err){
            console.log('error in fetching data ',err);
            res.redirect('/');
        })
    }
    // console.log('filters is ',filters);
}

//For searching an issue and rendering data based upon the entered keywords in UI
module.exports.searchIssue = function(req, res){
    console.log('seaarchIssue -- req.body ',req.body);
    console.log('seaarchIssue -- req.params ',req.params);
    const regex = new RegExp(req.body.Search, 'i');
    if(req.body.selectToSearch == 'Title'){
        console.log('Searching by Title');
        Issue.find({
            project: req.params.id,
            title: {$regex: regex}
        }).then(function(data){
            console.log('searched data is ', data);
            Project.findById(req.params.id).then(function(projData){
                res.render('project_details', {
                    filtering: true,
                    project_details: projData,
                    filtered_issues: data,
                    title: 'Project Details Page'
                })
            })
        }).catch(function(err){
            console.log('error fetching data from search', err);
        })
    }else if(req.body.selectToSearch == 'Description')[
        Issue.find({
            project: req.params.id,
            description: {$regex: regex}
        }).then(function(data){
            console.log('searched data is ', data);
            Project.findById(req.params.id).then(function(projData){
                res.render('project_details', {
                    filtering: true,
                    project_details: projData,
                    filtered_issues: data,
                    title: 'Project Details Page'
                })
            })
        }).catch(function(err){
            console.log('error fetching data from search', err);
        })
    ]
    // res.redirect('back'); 
}
