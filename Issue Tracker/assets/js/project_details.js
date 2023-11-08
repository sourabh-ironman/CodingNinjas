var createIssueButton = document.getElementById('create-issue-button');
var createIssueForm = document.getElementById('create-issue');
var filter = document.getElementsByClassName('fa-filter');
var filterForm = document.getElementById('filter-form');
var selectFilter = document.getElementById('select-filter');
var filterFormLabel = document.getElementById('filter-form-label');
var filterFormAuthor = document.getElementById('filter-form-author');
var fetchFilteredBugs = document.getElementById('fetch-filtered-bugs');


console.log('createIssueButton', createIssueButton);
window.addEventListener('click', function(e){
    if(e.target == createIssueButton){
        createIssueForm.classList.toggle('flex-disp');
    }else if(e.target == filter[0]){
        filterForm.classList.toggle('block-disp');
    }else if(e.target == fetchFilteredBugs){
        // e.preventDefault();
        console.log('fetching filtered bugs. e.target ', e.target);
    }
})

selectFilter.addEventListener('change', function(e){
    console.log('selecting filter - e.target.value ',e.target.value);
    if(e.target.value == 'Author'){
        filterFormAuthor.classList.remove('no-disp');
        // filterFormAuthor.classList.add('block-disp');
        filterFormLabel.classList.add('no-disp');
    }else if(e.target.value == 'Label'){
        filterFormLabel.classList.remove('no-disp');
        filterFormAuthor.classList.add('no-disp');

    }
})
