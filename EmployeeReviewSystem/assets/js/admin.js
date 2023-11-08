const createUser = document.getElementById('create-user');
const createuserForm = document.getElementById('create-user-form');

const updateEmployee = document.getElementsByClassName('update-employee');
const editPerformanceReview = document.getElementsByClassName('edit-performance-review');
const askForFeedback = document.getElementsByClassName('ask-for-feedback');
const performanceReviewsList = document.getElementById('performance-reviews-list');
const viewPerformanceReviewBtn = document.getElementsByClassName('view-performance-reviews-btn');


createUser.addEventListener('click', function(e){
    createuserForm.classList.toggle('block-disp');
});

// console.log('update employee - ',updateEmployee);
window.onload = function() {
    for(let upd of updateEmployee){
        // console.log('upd is - ',upd);
        upd.addEventListener('click', function(e){
            // console.log('e.target clicked ',e.target);
            // console.log('e.target nextSibling ',e.target.nextElementSibling);
            e.target.nextElementSibling.classList.toggle('block-disp');
        });
    }

    // console.log('editPerformanceReview ',editPerformanceReview);
    for(let pr of editPerformanceReview){
        pr.addEventListener('click', function(e){
            let formElement = e.target.parentElement.parentElement.nextElementSibling;
            formElement.classList.toggle('block-disp');
        })
    }

    for(let fdbk of askForFeedback){
        fdbk.addEventListener('click', function(e){
            let feedbackForm = e.target.nextElementSibling;
            feedbackForm.classList.toggle('block-disp');
        })
    }


    for(let viewPRBtn of viewPerformanceReviewBtn){
        viewPRBtn.addEventListener('click', function(e){
            let performanceReview = e.target.nextElementSibling;
            performanceReview.classList.toggle('block-disp');
        })
    }
}